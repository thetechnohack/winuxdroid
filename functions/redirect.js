const { MongoClient } = require("mongodb");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 2, // Set the maximum number of connections in the pool
};

exports.handler = async function(event, context) {
  const { path } = event;
  const shortlinkId = path.split("/")[2];

  if (!shortlinkId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid shortlink" }),
    };
  }

  try {
    const uri = process.env.MONGODB_CONNECTION_STRING;
    const client = new MongoClient(uri, mongoOptions);

    await client.connect();

    const database = client.db("linkdb");
    const collection = database.collection("linkdict");

    const result = await collection.findOne({ shortlink_id: shortlinkId });

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Shortlink not found" }),
      };
    }

    client.close();

    return {
      statusCode: 301,
      headers: {
        Location: result.original_link,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
