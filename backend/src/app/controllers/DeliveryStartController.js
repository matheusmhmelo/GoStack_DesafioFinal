import { isBefore, setHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import validateDeliveryToStart from '../utils/validateDeliveryToStart';

class DeliveryStartController {
  async update(req, res) {
    // const date = parseISO(req.body.date);
    const date = new Date();

    const { deliveryman_id } = req.body;

    /**
     * Validate if hour is after 8:00 or before 18:00
     */
    if (
      isBefore(date, setHours(new Date(), 0)) ||
      isBefore(setHours(new Date(), 18), date)
    ) {
      return res
        .status(400)
        .json({ error: 'You can start a delivery after 8:00 or before 18:00' });
    }

    const deliveriesOnDay = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.lt]: endOfDay(new Date()),
          [Op.gt]: startOfDay(new Date())
        }
      }
    });

    if (deliveriesOnDay.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You can start only 5 deliveries in a day' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const message = validateDeliveryToStart(delivery, deliveryman_id);

    if (message !== '') {
      return res.status(400).json({ error: message });
    }

    const deliveryUpdated = await delivery.update({
      start_date: date
    });

    return res.json(deliveryUpdated);
  }

  async index(req, res) {
    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.deliveryman_id,
        canceled_at: null,
        end_date: null
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

export default new DeliveryStartController();
