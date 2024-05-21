const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});



// const  allSessionObject={}
// const client = new Client({
//   puppeteer:{
//     headless: false,
//   },
//   authStrategy: new LocalAuth({
//     clientId: "YOUR_CLIENT_ID"
//   })
// });

const client = new client();
console.log('==================Client check==================|');
client.on('ready', () => {
 console.log('Client is ready!');
});
console.log('===============Generate QR First=====================');
client.on('qr', (qr) => {
  // Generate and scan this code with your phone
 qrcode.generate(qr, { small: true });
});
console.log('===============Test Ping=====================');
client.on('message', msg => {
   if (msg.body == '!ping') {
       msg.reply('pong');
   }
});
client.initialize();



// app.js
