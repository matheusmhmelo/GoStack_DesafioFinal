import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
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

    const recipients = await Recipient.findAll({
      where,
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    return res.json(recipients);
  }
}

export default new RecipientController();
