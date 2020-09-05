import { connect } from "amqplib";
const data = require("./data.json")

const queueName = process.argv[2] || "duzgunq";

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);

        // Mesajın Alınması...
        console.log("Mesaj bekleniyor...");
        channel.consume(queueName, message => {
            const messageInfo = JSON.parse(message.content.toString());

            const userInfo = data.find(u => u.id == messageInfo.description);
            if (userInfo) {
                console.log("İşlenen Kayıt", userInfo);
                channel.ack(message);
            }
        });
    } catch (error) {
        console.log("Error", error);
    }
}