import { MongoClient, MongoClientOptions } from "mongodb";
import { config } from "dotenv";
import { MyContext } from "../types";
import greeting from "../controller/home/greeting";

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

export async function recordUserProposal(ctx: MyContext) {
  let document = {
    id: ctx.session.data.from.id,
    first_name: ctx.session.data.from.first_name,
    username: ctx.session.data.from.username,
    plan: ctx.session.plan,
    payment: ctx.session.payment,
    subscriber: false,
    message: ctx.session.data
  }

  try {
    await client.connect()
    await client
      .db("xpremium")
      .collection("proposals")
      .insertOne(document)
      .then(async (data) => {
        let chat_id = ctx.update["callback_query"]["from"].id
        let message_id = ctx.update["callback_query"].message.message_id
        console.log(message_id)
        if (data) {
          ctx.answerCbQuery(data.insertedId.toString())
          await ctx.telegram.deleteMessage(chat_id, message_id)
          greeting(ctx, true)
        }
      })
  } catch (err) {
    console.log(err)
  }

}

export async function checkUserInProposals(ctx) {
  try {
    await client.connect()
    return await client
      .db("xpremium")
      .collection("proposals")
      .findOne({ id: ctx.from.id, plan: ctx.session.plan })
    
  } catch (err) {
    console.log(err)
  }
}

export async function recordUserProposal2(ctx) {
  // confirm prop
  let filter = {
    id: +ctx.match[1],
    plan: ctx.session.plan
  }
  const currentDate = new Date()
  try {
    await client.connect()
    await client.db("xpremium")
      .collection('proposals')
      .findOneAndUpdate(filter, {
        $set: {
          subscriber: true,
          lastModified: currentDate.getTime()
        }
      }, {
        upsert: true
      })
  } catch (err) {
    console.log(err)
  }
  // await client.db("xpremium").collection('subscribers').insertOne()
}

export async function newChannelPost (ctx) {
  let sender = ctx.update.channel_post

  if (sender.chat.title == 'Forex Signals') {
    sender.plan = 'forex'
  } else if (sender.chat.title == 'Crypto Signals') {
    sender.plan = 'crypto'
  }

  console.log(sender)
  try {
    await client.connect()
    await client.db("xpremium")
      .collection("channels")
      .insertOne(sender)
    await sendMessage(ctx, sender.plan)
  } catch (err) {
    console.log(err)
  }
}

async function sendMessage(ctx, plan) {
  try {
    let subs = await client.db("xpremium").collection("proposals").find({ plan: plan }).toArray()
    await client.db("xpremium").collection("channels").findOne({ plan: plan }).then(document => {
      subs.forEach(element => {
        ctx.telegram.copyMessage(element.id, ctx.update.channel_post.sender_chat.id, ctx.update.channel_post.message_id)
      })
    })  
  } catch(err) {
    console.log(err)
  }
}
/*
export async function chanellPostEdited(ctx) {
  let sender = ctx.update.channel_post

  if (sender.chat.title == 'Forex Signals') {
    sender.plan = 'forex'
  } else if (sender.chat.title == 'Crypto Signals') {
    sender.plan = 'crypto'
  }

  try {
    await client.connect()
    await client.db("xpremium")
      .collection("channels")
      .findOneAndUpdate({sender})
    await sendMessage(ctx, sender.plan)
  } catch (err) {
    console.log(err)
  }
}


async function editMessage(ctx, plan) {
  try {
    let subs = await client.db("xpremium").collection("proposals").find({ plan: plan }).toArray()
    await client.db("xpremium").collection("channels").findOne({ plan: plan }).then(document => {
      subs.forEach(element => {
        ctx.telegram.copyMessage(element.id, ctx.update.channel_post.sender_chat.id, ctx.update.channel_post.message_id)
      })
    })
  } catch (err) {
    console.log(err)
  }
}
*/