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
  ],
};
