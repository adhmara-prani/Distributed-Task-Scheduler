import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "ride-sharing-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const admin = kafka.admin();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected successfully!");

    await admin.connect();
    const topics = await admin.listTopics();
    const topicsToCreate = ["request-ride", "ride-accepted"];
    const newTopics = topicsToCreate.filter((t) => !topics.includes(t));

    if (newTopics.length > 0) {
      await admin.createTopics({
        topics: newTopics.map((topic) => ({ topic })),
      });
      console.log(`Created topics: ${newTopics.join(", ")}`);
    }
    await admin.disconnect();
  } catch (error) {
    console.log("Error in connecting producer!", error.stack);
  }
};

export const publishRideRequest = async (rideData) => {
  try {
    const key = rideData.userId
      ? String(rideData.userId)
      : String(rideData.user_id);

    const producerMessage = await producer.send({
      topic: "request-ride",
      messages: [
        {
          key: key,
          value: JSON.stringify(rideData),
        },
      ],
    });
    console.log("Ride Request published to Kafka!", producerMessage);
  } catch (error) {
    console.log("Error in requesting process through Kafka!", error.stack);
  }
};

export const publishRideAccepted = async (rideId, driverId) => {
  try {
    const producerMessage = await producer.send({
      topic: "ride-accepted",
      messages: [
        {
          key: String(rideId),
          value: JSON.stringify({ rideId, driverId }),
        },
      ],
    });
    console.log(`Ride ${rideId} accepted message published!`);
  } catch (error) {
    console.log("Error in publishing process through Kafka!", error.stack);
  }
};
