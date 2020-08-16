export default {
  jwt: {
    secret: process.env.APP_SECRET || 'test',
    expiresIn: '1d',
  },
};
