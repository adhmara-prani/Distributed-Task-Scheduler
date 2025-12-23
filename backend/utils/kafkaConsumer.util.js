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

    await consumer.subscribe({
      topics: ["request-ride", "ride-accepted"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const rideData = JSON.parse(message.value.toString());

        if (topic === "request-ride") {
          io.emit("new-ride-available", rideData);
          console.log("Broadcast new ride");
        } else if (topic === "ride-accepted") {
          io.emit("ride-taken", rideData);
          console.log(
            `Broadcast ride #${rideData.rideId} taken by driver #${rideData.driverId}`
          );
        }
      },
    });
  } catch (error) {
    console.log("Error in connecting the consumer!", error.stack);
  }
};
