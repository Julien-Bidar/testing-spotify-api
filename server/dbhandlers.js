const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const uri = req.body.data.uri;
  //console.log(req.body.data.uri);
  try {
    await client.connect();
    const db = client.db("final_project");

    const check = await db.collection("users").findOne({ "data.uri": uri });
    console.log(check);

    if (!check) {
      const add = await db.collection("users").insertOne(req.body);
      res
        .status(201)
        .json({ status: 201, message: "user created", data: req.body });
    } else {
      console.log("user already in db");
      res.status(204).json({ status: 204, message: "user is already in db" });
    }
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getAllUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final_project");
    const users = await db.collection("users").find().toArray();

    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: 400, message: "error while fetching users from db" });
  }
};

module.exports = { addUser, getAllUsers };
