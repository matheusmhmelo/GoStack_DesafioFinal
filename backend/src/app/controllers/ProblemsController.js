import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import DeliveryProblems from '../models/DeliveryProblems';

import DeliveryCanceled from '../jobs/DeliveryCanceled';
import Queue from '../../lib/Queue';

class DeliveryController {
  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman'
        },
        {
          model: Recipient,
          as: 'recipient'
        }
      ]
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    await delivery.update({
      canceled_at: new Date()
    });

    await Queue.add(DeliveryCanceled.key, {
      delivery
    });

    return res.json(delivery);
  }

  async index(req, res) {
    let where = {};
    let limit = null;
    let offset = null;

    if (req.query.page) {
      limit = 5;
      offset = limit * (req.query.page - 1);
    }

    const problems = await DeliveryProblems.findAll({
      attributes: ['delivery_id']
    }).map(u => u.get('delivery_id'));

    if (req.query.q) {
      where = {
        id: problems,
        product: {
          [Op.like]: `%${req.query.q}%`
        }
      };
    } else {
      where = { id: problems };
    }

    const deliveryWithProblems = await Delivery.findAll({
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

    return res.json(deliveryWithProblems);
  }
}

export default new DeliveryController();
