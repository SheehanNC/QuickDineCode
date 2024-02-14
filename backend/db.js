const mongoose = require('mongoose');
const Orders = require('./models/Orders');
const mongoURI = 'mongodb://QuickDine:Database_123@ac-dwernik-shard-00-00.w4ayjyc.mongodb.net:27017,ac-dwernik-shard-00-01.w4ayjyc.mongodb.net:27017,ac-dwernik-shard-00-02.w4ayjyc.mongodb.net:27017/QuickDine?ssl=true&replicaSet=atlas-yzzhni-shard-0&authSource=admin&retryWrites=true&w=majority' 
const mongoDb = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
      const fetched_food_items = mongoose.connection.db.collection("food_items");
      const food_items = await fetched_food_items.find({}).toArray();
      const fetched_food_Cat = mongoose.connection.db.collection("food_Category");
      const food_Cat = await fetched_food_Cat.find({}).toArray();
      global.food_items = food_items;
      global.food_Cat = food_Cat;
      console.log() 
    } catch (error) {
      console.error('Something went wrong', error.message);
      process.exit(1); // Exit the application on connection error
    }
  };

module.exports = mongoDb;