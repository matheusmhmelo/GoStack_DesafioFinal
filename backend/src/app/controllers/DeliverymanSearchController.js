import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    let where = {};
    let limit = null;
    let offset = null;

    if (req.query.q) {
      where = {
        name: {
          [Op.like]: `%${req.query.q}%`
        }
      };
    }

    if (req.query.page) {
      limit = 5;
      offset = limit * (req.query.page - 1);
    }

    const deliverymans = await Deliveryman.findAll({
      where,
      limit,
      offset,
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
}

export default new DeliverymanController();
