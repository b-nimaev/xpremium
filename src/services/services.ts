import { MongoClient, MongoClientOptions } from "mongodb";
import { config } from "dotenv";
import { context, proposal } from "../types/types";

config();
const dbname = process.env.DB_NAME;

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);


export async function getProposals() {
  try {
    await client.connect()
    return await client.db(dbname).collection("proposals").find().toArray();

  } catch (err) {
    console.log(err);
  } finally {
    await client.close()
  }
}

export async function checkUser(id: number) {
  console.log('checking user...')
  try {
    await client.connect()
    return await client.db(dbname).collection("users").findOne({ id: id })
  } catch (err) {
    console.log(err);
  } finally {
    await client.close()
    console.log('closed')
  }
}

export async function getUsers() {
  try {
    await client.connect()
    return await client.db(dbname).collection("users").find().toArray()
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

export async function setProposal(proposal) {
  try {
    await client.connect()
    return await client.db(dbname).collection("proposals").insertOne(proposal)
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}