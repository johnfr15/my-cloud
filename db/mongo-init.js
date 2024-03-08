print("Started Adding the Users.");

// Switch to the "authentication" database
// db = db.getSiblingDB('admin').auth(
//     process.env.MONGO_INITDB_ROOT_USERNAME,
//     process.env.MONGO_INITDB_ROOT_PASSWORD
// );

// Perform operations on the "admin" database
db.createUser({
  user: "authAdmin",
  pwd: "password",
  roles: ["readWrite", "dbAdmin"]
});