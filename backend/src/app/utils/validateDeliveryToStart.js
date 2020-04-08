export default function validateDelivery(delivery, deliveryman_id) {
  let message = '';

  if (!delivery) {
    message = 'Delivery not found';
  }

  if (delivery.deliveryman_id !== deliveryman_id) {
    message = 'Deliveryman not authorized';
  }

  if (delivery.start_date !== null) {
    message = 'Delivery already started';
  }

  if (delivery.canceled_at !== null) {
    message = 'Delivery canceled';
  }

  if (delivery.end_date !== null) {
    message = 'Delivery already finished';
  }

  return message;
}
