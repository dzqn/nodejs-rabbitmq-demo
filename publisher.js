const amqp = require("amqplib");
const data = require("./data.json");

const message = {
    description: ""
};
const queueName = process.argv[2] || "duzgunq";

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);

        /*
        data.forEach(i => {
            message.description = i.id;
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Mesaj", i.id);
        });*/

        setInterval(() => {
            message.description = new Date();
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Tarih", message.description);
        }, 1000);

    } catch (error) {
        console.log("Error", error);
    }
}