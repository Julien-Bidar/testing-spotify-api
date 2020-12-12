const { MongoClient } = require("mongodb");
const assert = require("assert");
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

const addQueueItem = async (req, res) => {
  const item = req.body;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final_project");
    const addTrack = await db.collection("queue").insertOne(item);
    // assert.strictEqual(1, addTrack.instertedCount);
    res.status(201).json({ status: 201, data: item });
  } catch (err) {
    res.status(400).json({ status: 400, message: err });
  }
};

//not used
const getUpdatedQueue = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final_project");
    const update = await db.collection("queue").find().toArray();
    res.status(200).json({ status: 200, data: update });
  } catch (err) {
    res.status(400).json({ status: 400, message: err });
  }
};

const dropPlaylist = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final_project");
    const drop = await db.collection("queue").drop();
    res.status(200).json({ status: 200, data: drop });
  } catch (err) {
    res.status(400).json({ status: 400, message: err });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  addQueueItem,
  getUpdatedQueue,
  dropPlaylist,
};
