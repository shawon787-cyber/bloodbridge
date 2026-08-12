import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI);

const db = client.db(
  process.env.AUTH_DB_NAME || "blood_bridge"
);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      bloodGroup: {
        type: "string",
        required: true,
        input: true,
        returned: true,
      },
      district: {
        type: "string",
        required: true,
        input: true,
        returned: true,
      },
      upazila: {
        type: "string",
        required: true,
        input: true,
        returned: true,
      },
      status: {
        type: "string",
        required: true,
        input: false,
        returned: true,
        defaultValue: "active",
      },
      role: {
        type: "string",
        required: true,
        input: false,
        returned: true,
        defaultValue: "donor",
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});