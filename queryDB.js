const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:0CDaSGftXMDNTNhT@test-cluster0.hl4lu.mongodb.net/idenify_poc?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // await createJob(client,
        //     {
        //         title: "Cloud Engineer",
        //         description: "Works with AWS, Terraform, Jenkins, and Bitbucket"
        //     }
        // );

        await findJob(client, "Cloud Engineer")

        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views",
        //         summary: "Modern home with infinite views from the infinity pool",
        //         property_type: "House",
        //         bedrooms: 5,
        //         bathrooms: 4.5,
        //         beds: 5
        //     },
        //     {
        //         name: "Private room in London",
        //         property_type: "Apartment",
        //         bedrooms: 1,
        //         bathroom: 1
        //     },
        //     {
        //         name: "Beautiful Beach House",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         bedrooms: 4,
        //         bathrooms: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     }
        // ]);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function createJob(client, newListing){
  const result = await client.db("idenify_poc").collection("jobTitlesAndDescriptions").insertOne(newListing);
  console.log(`New job created with the following id: ${result.insertedId}`);
}

async function findJob(client, jobTitle) {
  const result = await client.db("idenify_poc").collection("jobTitlesAndDescriptions").findOne( {title: jobTitle} )

  if (result) {
    console.log(`Found a job in the collection with the title '${jobTitle}':`);
    console.log(result);
  } else {
      console.log(`No jobs found with the title '${jobTitle}'`);
  }
}

// async function createMultipleListings(client, newListings){
//   // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
//   const result = await client.db("idenify_poc").collection("jobTitlesAndDescriptions").insertMany(newListings);

//   console.log(`${result.insertedCount} new job(s) created with the following id(s):`);
//   console.log(result.insertedIds);
// }


main().catch(console.error);