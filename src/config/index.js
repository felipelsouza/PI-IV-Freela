const storage = './src/database/database.sqlite';

module.exports = {
  "dialect": 'sqlite',
  "storage": storage,
  "define": {
    "timestamps": true,
    "underscored": true
  }
};