import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    if (deliveryman && recipient) {
      await Mail.sendMail({
        to: `${deliveryman.name} <${deliveryman.email}>`,
        subject: 'Nova entrega registrada',
        template: 'delivery',
        context: {
          deliveryman: deliveryman.name,
          product: delivery.product,
          recipient: recipient.name,
          address: recipient.address,
          number: recipient.number,
          complement: recipient.complement,
          zipcode: recipient.zipcode,
          city: recipient.city,
          state: recipient.state
        }
      });
    } else {
      console.log(`E-mail not sent: FAILED`);
    }
  }
}

export default new NewDeliveryMail();
