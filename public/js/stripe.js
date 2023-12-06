/* eslint-disable */
import Stripe from 'stripe';
import axios from 'axios';
import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51OJ0r7LuxLjQeo3yDFwqXa18iXo2dmUrf6FD8eAGkgWnJMeNHl2bCPTk7Sf7yS4vrFIVD3RCu6T2ntLBMcdq95hI00YYYwgkSX'
);

export const bookTour = async (tourId) => {
  try {
    // 1) get checkout session from API
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    });
    console.log(res);
    // 2) create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: res.data.session.id
    // });
  } catch (err) {
    console.log(err);
    // showAlert('error', err);
  }
};
