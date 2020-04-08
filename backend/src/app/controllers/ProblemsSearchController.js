import DeliveryProblems from '../models/DeliveryProblems';

class DeliveryController {
  async index(req, res) {
    let where = {};
    let limit = null;
    let offset = null;

    if (req.query.page) {
      limit = 5;
      offset = limit * (req.query.page - 1);
    }

    if (req.query.q) {
      where = {
        delivery_id: req.query.q
      };
    }

    const problems = await DeliveryProblems.findAll({
      where,
      limit,
      offset
    });

    return res.json(problems);
  }
}

export default new DeliveryController();
