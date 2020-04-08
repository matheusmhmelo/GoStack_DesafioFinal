import Mail from '../../lib/Mail';

class DeliveryCanceled {
  get key() {
    return 'DeliveryCanceled';
  }

  async handle({ data }) {
    const { delivery } = data;

    if (delivery.deliveryman && delivery.recipient) {
      await Mail.sendMail({
        to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
        subject: 'Entrega cancelada',
        template: 'canceled',
        context: {
          deliveryId: delivery.id,
          deliveryman: delivery.deliveryman.name,
          product: delivery.product,
          recipient: delivery.recipient.name,
          address: delivery.recipient.address,
          number: delivery.recipient.number,
          complement: delivery.recipient.complement,
          zipcode: delivery.recipient.zipcode,
          city: delivery.recipient.city,
          state: delivery.recipient.state
        }
      });
    } else {
      console.log(`E-mail not sent: FAILED`);
    }
  }
}

export default new DeliveryCanceled();
