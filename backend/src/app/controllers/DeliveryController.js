import { Op } from 'sequelize';
import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const deliveryExists = await Delivery.findOne({
      where: {
        product,
        recipient_id,
        deliveryman_id,
        end_date: null,
        canceled_at: null
      }
    });

    if (deliveryExists) {
      return res.status(400).json({ error: 'Delivery already exists!' });
    }

    const delivery = await Delivery.create(req.body);

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    await Queue.add(NewDeliveryMail.key, {
      delivery,
      deliveryman,
      recipient
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found!' });
    }

    // Validate if the changes will duplicate some delivery
    if (
      (product && product !== delivery.product) ||
      (recipient_id && recipient_id !== delivery.recipient_id) ||
      (deliveryman_id && deliveryman_id !== delivery.deliveryman_id)
    ) {
      const deliveryExists = await Delivery.findOne({
        where: {
          product: product || delivery.product,
          recipient_id: recipient_id || delivery.recipient_id,
          deliveryman_id: deliveryman_id || delivery.deliveryman_id
        }
      });

      if (deliveryExists) {
        return res.status(400).json({ error: 'Delivery already exists!' });
      }
    }

    const deliveryAdd = await delivery.update(req.body);

    return res.json(deliveryAdd);
  }

  async index(req, res) {
    let where = {};
    let limit = null;
    let offset = null;

    if (req.params.delivery_id) {
      where = { id: req.params.delivery_id };
    }

    if (req.query.q) {
      where = {
        product: {
          [Op.like]: `%${req.query.q}%`
        }
      };
    }

    if (req.query.page) {
      limit = 5;
      offset = limit * (req.query.page - 1);
    }

    const delivery = await Delivery.findAll({
      where,
      limit,
      offset,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar'
            }
          ]
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'number',
            'complement',
            'state',
            'city',
            'zipcode'
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url']
        }
      ],
      order: [['id', 'ASC']]
    });

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (delivery) {
      await delivery.destroy();
      return res.json({ message: 'Delivery deleted succefully' });
    }

    return res.json({ message: 'Delivery not found' });
  }
}

export default new DeliveryController();
