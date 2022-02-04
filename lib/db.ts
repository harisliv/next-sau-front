const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://haris:PmVt7rGkmisYIWvZ@cluster0.qodkm.mongodb.net/NewsPortalUsers?retryWrites=true&w=majority";

export async function connectToDatabase() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}
