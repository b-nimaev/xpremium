import { MongoClient } from "mongodb";
import { config } from "dotenv";
import context from "../types/types";

config();
const dbname = process.env.DB_NAME;

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to db!");
  } catch (error) {
    console.log(error);
  }
}
run();

export async function getSubscribers(ctx: context) {
  let message = "Секция: Подписчики \n";
  let cursor = await client
    .db(dbname)
    .collection("proposals")
    .find({ subscription: true })
    .toArray();
  let keys = {
    back: { text: "« Назад", callback_data: "back" },
    inbox: { text: `Входящие`, callback_data: "inbox" },
    stats: { text: "Статистика", callback_data: "stats" },
  };

  let keyboard = {
    reply_markup: {
      inline_keyboard: [[keys.stats], [keys.back, keys.inbox]],
    },
  };

  if (cursor.length > 0) {
    for (let index = 0; index < cursor.length; index++) {
      keyboard.reply_markup.inline_keyboard.push([
        {
          text: cursor[index].first_name,
          callback_data: "user" + cursor[index].id,
        },
      ]);
    }
  }

  try {
    await ctx.editMessageText(message, keyboard);
  } catch {
    await ctx.reply(message, keyboard);
  }
}

// "@" + ctx.update["callback_query"]["data"].replace(/link/g, "")

async function inbox(ctx: context) {
  let documents = client
    .db(dbname)
    .collection("proposals")
    .find({ trust: false });
  let cursor = await documents.toArray();
  let count = await documents.count();

  let table: string;
  let keyboard: any = {
    reply_markup: {
      inline_keyboard: [],
    },
  };

  if (count) {
    for (let index = 0; index < cursor.length; index++) {
      let user = cursor[index];
      table = `${table}${index + 1}) <b>ID ${user.id}</b>`;
      if (user.username) {
        table += ` / <b> @${user.username}</b>`;
      }
      if (user.first_name) {
        table += `\n<b>Имя: ${user.first_name}</b>`;
      }
      if (user.last_name) {
        table += ` <b>${user.last_name}</b>`;
      }
      if (user.phone) {
        table += ` / <b>phone ${user.phone}</b> \n`;
      }
      let data = {
        text: cursor[index].first_name,
        callback_data: "link" + cursor[index].id,
      };
      keyboard.reply_markup.inline_keyboard.push([data]);
    }

    console.log(table);
  }

  let keys = [
    { text: "« Назад", callback_data: "back" },
    { text: "Пригласить", callback_data: "invite" },
  ];

  keyboard.reply_markup.inline_keyboard.push([keys[0], keys[1]]);
  return keyboard;
}

export async function getUsers(user?: number) {
  if (user) {
    try {
      return await client.db(dbname).collection("users").findOne({ id: user });
    } catch (err) {
      console.log(err);
    }
  }

  let users = await client.db(dbname).collection("users").find().toArray();
  return users;
}

export async function sendInvoice(data) {
  try {
    let document = await client
      .db(dbname)
      .collection("proposals")
      .insertOne(data);
    /*
    if (document) {
      data.plan.forEach(async (element) => {
        if (document.plan.indexOf(element) == -1) {
          let array = document.plan;
          array.push(element);

          await client
            .db(dbname)
            .collection("proposals")
            .updateOne(
              {
                id: data.id,
              },
              {
                $set: {
                  plan: array,
                },
              },
              {
                upsert: true,
              }
            );
        }
      });
    } else {
      await client.db(dbname).collection("proposals").insertOne(data);
    }
    */
  } catch (err) {
    console.log(err);
  }
}

export async function getProposals() {
  try {
    let props = client.db(dbname).collection("proposals");
    let count = await props.countDocuments();
    let array = await props.find({ subscription: false }).toArray();

    return {
      count: count,
      array: array,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function checkUser(ctx) {
  try {
    let collection = client.db(dbname).collection("users");
    let document = await collection.findOne({ id: ctx.from.id });
    if (document) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function checkPropsOnExist(ctx) {
  try {
    let collection = client.db(dbname).collection("proposals");
    let document = await collection.findOne({ id: ctx.from.id });

    if (document) {
      if (document.plan.indexOf(ctx.session.single) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getSubscriptions() {
  try {
    let result = await client
      .db(dbname)
      .collection("proposals")
      .find({ subscription: true })
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  }
}
