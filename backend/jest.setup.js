const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
});

afterAll(async () => {
  await mongoose.connection.close();
}); 