import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryProblems from '../models/DeliveryProblems';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const deliveryProblems = await DeliveryProblems.create({
      description: req.body.description,
      delivery_id: req.params.id
    });

    return res.json(deliveryProblems);
  }

  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      where: {
        delivery_id: req.params.id
      }
    });

    return res.json(deliveryProblems);
  }
}

export default new DeliveryController();
