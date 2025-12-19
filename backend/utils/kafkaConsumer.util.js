// listening to the request-ride topic at certain interval with the help of socket.io
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "ride-sharing-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "producer-updates-group" });

export const connectConsumer = async (io) => {
  try {
    await consumer.connect();
    console.log("Consumer connected successfully!");

    await consumer.subscribe({ topic: "request-ride", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const rideData = message.value.toString();

        console.log(`Recieved Ride Request succesfully : ${rideData}`);

        // data is emitted through websocket to all avaiable channels/drivers
        io.emit("new-ride-available", JSON.parse(rideData));
        console.log("Broadcasted to all drivers nearby successfully!");
      },
    });
  } catch (error) {
    console.log("Error in connecting the consumer!", error.stack);
  }
};
