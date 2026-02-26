export default {
  routes: [
    {
      method: 'POST',
      path: '/donation/create-intent',
      handler: 'integration.createDonationIntent',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/webhooks/:provider',
      handler: 'integration.receiveWebhook',
      config: {
        auth: false,
      },
    },
  ],
};
