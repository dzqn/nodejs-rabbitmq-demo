import { connect } from "amqplib";
import { forEach } from "./data.json";

const queueName = process.argv[2] || "duzgunq";
const message = {
    description: ""
};

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);

        forEach(i => {
            message.description = i.id;
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Mesaj", i.id);
        })

    } catch (error) {
        console.log("Error", error);
    }
}