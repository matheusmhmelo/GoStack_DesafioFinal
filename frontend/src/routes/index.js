import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';
import Delivery from '../pages/Deliveries/Delivery';

import Deliverymen from '../pages/Deliverymen';
import Deliveryman from '../pages/Deliverymen/Deliveryman';

import Recipients from '../pages/Recipients';
import Recipient from '../pages/Recipients/Recipient';

import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path="/deliveries/delivery/:delivery_id"
        component={Delivery}
        isPrivate
      />
      <Route path="/deliveries/delivery" component={Delivery} isPrivate />
      <Route path="/deliveries" component={Deliveries} isPrivate />

      <Route
        path="/deliverymen/deliveryman/:deliveryman_id"
        component={Deliveryman}
        isPrivate
      />
      <Route
        path="/deliverymen/deliveryman"
        component={Deliveryman}
        isPrivate
      />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />

      <Route
        path="/recipients/recipient/:recipient_id"
        component={Recipient}
        isPrivate
      />
      <Route path="/recipients/recipient" component={Recipient} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
