import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryEndController {
  async update(req, res) {
    const { signature_id } = req.body;

    const delivery = await Delivery.findByPk(req.params.id);

    if (delivery.end_date !== null || delivery.canceled_at !== null) {
      return res.status(400).json({ error: 'Delivery can not be finished' });
    }

    const deliveryUpdated = await delivery.update({
      end_date: new Date(),
      signature_id
    });

    return res.json(deliveryUpdated);
  }

  async index(req, res) {
    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.deliveryman_id,
        end_date: { [Op.ne]: null }
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'createdAt'
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email']
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
      ]
    });

    return res.json(delivery);
  }
}

export default new DeliveryEndController();
