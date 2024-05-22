import axiosInstance from './axiosInstance.js';
import respondBuilderText from './respondBuilder.js';
import dotenv from 'dotenv';

dotenv.config();

const { WEBHOOK_VERIFY_TOKEN } = process.env;

export const x = async (req, res) => {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message?.type === 'text') {
        const businessPhoneNumberId = req.body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;
        const respondMessage = respondBuilderText(message.text.body);

        try {
            await axiosInstance.post(`${businessPhoneNumberId}/messages`, {
                messaging_product: 'whatsapp',
                to: message.from,
                text: { body: 'Reply: ' + respondMessage },
                context: { message_id: message.id },
            });

            await axiosInstance.post(`${businessPhoneNumberId}/messages`, {
                messaging_product: 'whatsapp',
                status: 'read',
                message_id: message.id,
            });

            res.sendStatus(200);
        } catch (error) {
            console.error('Error sending message:', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(200);
    }
};

export const handleWebhookGet = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
        res.status(200).send(challenge);
        console.log('Webhook verified successfully!');
    } else {
        res.sendStatus(403);
    }
};

export const handleRootGet = (req, res) => {
    res.send(`<pre>Nothing to see here.\nCheckout README.md to start.</pre>`);
};
