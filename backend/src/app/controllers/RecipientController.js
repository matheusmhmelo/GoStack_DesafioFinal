import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!req.userId) {
      return res
        .status(400)
        .json({ error: 'Only administrator can create recipients' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    if (!req.userId) {
      return res
        .status(400)
        .json({ error: 'Only administrator can update recipients' });
    }

    const recipientUpdated = await recipient.update(req.body);

    return res.json({ recipientUpdated });
  }

  async index(req, res) {
    const recipient = await Recipient.findByPk(req.params.recipient_id);
    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (recipient) {
      await recipient.destroy();
      return res.json({ message: 'Recipient deleted succefully' });
    }

    return res.json({ message: 'Recipient not found' });
  }
}

export default new RecipientController();
