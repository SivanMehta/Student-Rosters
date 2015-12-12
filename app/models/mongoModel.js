// load the module
var mongoClient = require('mongodb').MongoClient;

// connect to the database
var connection_string = 'localhost:27017/facebookUsers';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD)
{
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
// Global variable of the connected database
var mongoDB; 
var doError = function(e)
{
    console.error("ERROR: " + e);
    throw new Error(e);
}

// Use connect method to connect to the MongoDB server
mongoClient.connect('mongodb://' + connection_string, function(err, db)
{
  if (err) doError(err);
  console.log("Connected to MongoDB server at: " + connection_string);
  mongoDB = db; // Make reference to db globally available.
});

exports.create = function(collection, data, callback)
{
    // do an asynchronous insert into the given collection
    mongoDB.collection(collection).insertOne(
        data,
        function(err, status)
        {
            // use callback function supplied by the controller to pass
            // back status
            if(err) doError(err);
            var success = (status.result.n == 1);
            callback(success);
        }
        );
}

exports.retrieve = function(collection, query, callback)
{
  mongoDB.collection(collection).find(query).toArray(function(err, docs)
  {
    if (err) doError(err);
    callback(docs);
  });
}

exports.update = function(collection, filter, update, callback)
{
  mongoDB
    .collection(collection)     // The collection to update
    .updateMany(                // Use updateOne to only update 1 document
      filter,                   // Filter selects which documents to update
      update,                   // The update operation
      {upsert:true},            // If document not found, insert one with this update
                                // Set upsert false (default) to not do insert
      function(err, status) {   // Callback upon error or success
        if (err) doError(err);
        callback('Modified '+ status.modifiedCount 
                 +' and added '+ status.upsertedCount+" documents");
        });
}

exports.delete = function(collection, query, callback)
{
    mongoDB.collection(collection).deleteMany(
        query,
        function(err, status)
        {
            if(err) doError(err);
            callback("Deleted some stuff");
        }
        )
}
