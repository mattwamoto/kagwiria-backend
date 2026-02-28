export default {
  routes: [
    {
      method: 'POST',
      path: '/lead',
      handler: 'lead-event.submit',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'lead-event.subscribeNewsletter',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/newsletter/send',
      handler: 'lead-event.sendNewsletter',
      config: {
        auth: false,
      },
    },
  ],
};
