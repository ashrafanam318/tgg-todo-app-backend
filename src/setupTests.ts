import mongoose from 'mongoose';

process.env.NODE_ENV = 'test';

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, key)) {
      await collections[key].deleteMany({});
    }
  }
  console.log(
    'closing connection with db ' + mongoose.connection.db?.databaseName
  );
  await mongoose.connection.close();
});
