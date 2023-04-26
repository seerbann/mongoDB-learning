const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://demo:demo@cluster0.zqxt72o.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await createListings(client, [
      {
        summary: "First",
        bathrooms: 1,
        bedrooms: 1,
        age: 23,
      },
      {
        summary: "Second",
        bathrooms: 1,
        bedrooms: 1,
      },
    ]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//list all dbs
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
//insert one
async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .insertOne(newListing);

  console.log(
    `New listing created with the folowing id : ${result.insertedId}`
  );
}
//insert many
async function createListings(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .insertMany(newListings);

  console.log(`${result.insertedCount}`);
  console.log(result.insertedIds);
}
