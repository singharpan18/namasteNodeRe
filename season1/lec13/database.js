// NOTES
// Go to mongodb website
// Create a free M0 cluster
// Create a user
// Get the connection string
// Install Mongo DB compass
// Create a database
// INstall mongodb package
// Create a connection from code
// Documents CRUD - CReate, REad, Update, Delete

const { MongoClient } = require("mongodb");

const url = 
    "mongodb+srv://singharpan9748:FOzGAqlAsmk7gR5u@namastenode.zncny.mongodb.net/";

    const client = new MongoClient(url);

    // Database Name
    const dbName = 'myProject';
    
    async function main() {
      // Use connect method to connect to the server
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('user');
    
      //reading from database
      const findResult = await collection.find({}).toArray();
      console.log('Found documents =>', findResult);

      //inserting into the database
      const data = {
        firstNmae: "Arpana",
        lastName: "Singh"
      };

      const insertResult = await collection.insertMany([data]);
      console.log('Inserted documents =>', insertResult);
    
      //count
      const countResult = await collection.estimatedDocumentCount({});
      console.log("Count of documents in the User collection =>", countResult);
    
      // Find all documents with a filter of firstname: Deepika
    
      const result = await collection.find({ firstname: "Deepika" }).collection.estimatedDocumentCount();
      console.log("result => ", result);
    
      return 'done.';
    }
    
    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
    
//https://mongodb.github.io/node-mongodb-native/6.9/
