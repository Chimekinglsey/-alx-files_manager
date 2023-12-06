const sha1 = require('sha1');
const dbClient = require('../utils/db');

const usersController = {
  postNew: async (req, resp) => {
    const { email, password } = req.body;
    if (!email) {
      resp.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      resp.status(400).json({ error: 'Missing password' });
    }
    try {
      const query = { email };
      const emailPresent = await dbClient.connection.collection('user').findOne(query);
      if (emailPresent) {
        resp.status(400).json({ error: 'Already exist' });
      }
      const hashedPassword = sha1(password);
      const newUser = await dbClient.connection.collection('user').insertOne({ email, password: hashedPassword });
      resp.status(201).json({ id: newUser.insertedId, email });
    } catch (error) {
      resp.status(500).json({ error: 'Error while trying to add users' });
    }
  },
};

module.exports = usersController;
