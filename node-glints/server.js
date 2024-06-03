/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;
const port = PORT|| 3000;


const RespondBuilderText=(body)=>{
  let result;
  if(body==="1"||body===1){
    result = "*1. Dimana lokasi Absensi seharusnya?*\n\n\
      Lokasi mengambil absen yang dibenarkan sekolah adalah  :\n\
      \t -Di depan Kelas \n\
      \t -Di Gerbang Sekolah\n\
      \t -Dan Dilapangan upacara\n\
    ";
  }
  else if (body === "2" || body === 2) {
    result = "*2. Sudah berapa kali pelanggaran kamu?*\n\n\
      pelanggaran kamu baru 3 kali nih  :\n\
      \t -Terlambat masuk pada pukul 08:20 Kamis 24 April 2024\n\
      \t -Terlalu cepat pulang pada pukul 12:20 Senin 27 April 2024\n\
      \t -Terlambat masuk pada pukul 07:20 Sabtu 1 mei 2024\n\
    ";
  }
  else if (body === "3" || body === 3) {
    result = "*3. Jadwal mata pelajaran hari ini.*\n\n\
      jadwal hari ini adalah:\n\
      \t -Matematika 08:20\n\
      \t -Bahasa Indonesia\n\
      \t -Terlambat masuk pada pukul 07:20 Sabtu 1 mei 2024\n\
    ";
  }
  else if (body === "4" || body === 4) {
    result = "*4. Hukuman apa saja yang kamu terima jika telat mengambil absen?*\n\n\
      Hukuman yang akan kamu terima jika telat adalah hukuman PANCUNG wkwkwk\n\
    ";
  }
  else{
    result = "Undified respond!"
  }

  return result;
}



app.post("/webhook", async (req, res) => {
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  
  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    const respondMessge = RespondBuilderText(message.text.body);
    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Reply: " + respondMessge },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  console.log("webhook dialling");
  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
