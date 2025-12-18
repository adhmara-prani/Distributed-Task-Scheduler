import { Kafka } from "kafkajs";

// intializing kafka client and atleast one broker
const kafka = new Kafka({
  clientId: "ride-sharing-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected successfully!");
  } catch (error) {
    console.log("Error in connecting producer!", error.stack);
  }
};

export const publishRideRequest = async (rideData) => {
  try {
    const producerMessage = await producer.send({
      topic: "request-ride",
      messages: [
        {
          key: String(rideData.userId),
          value: JSON.stringify(rideData),
        },
      ],
    });
    console.log("Ride Request published to Kafka!", producerMessage);
  } catch (error) {
    console.log("Error in requesting process through Kafka!", error.stack);
  }
};

/* const producerMessage = await producer.send({
      topic: "request-ride",
      messages: [
        { value: "Hello driver! A user near you has requested a ride!" },
      ],
    }); */
