import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: {
        email: req.body.email
      }
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists!' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanEmail = req.body.email;

    const deliveryman = await Deliveryman.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found!' });
    }

    if (deliverymanEmail && deliverymanEmail !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: {
          email: req.body.email
        }
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists!' });
      }
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ name, email, avatar_id });
  }

  async index(req, res) {
    let where = {};

    if (req.params.deliveryman_id) {
      where = { id: req.params.deliveryman_id };
    }

    const deliverymans = await Deliveryman.findAll({
      where,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url']
        }
      ],
      order: [['id', 'ASC']]
    });

    return res.json(deliverymans);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (deliveryman) {
      await deliveryman.destroy();
      return res.json({ message: 'Deliveryman deleted succefully' });
    }

    return res.json({ message: 'Deliveryman not found' });
  }
}

export default new DeliverymanController();
