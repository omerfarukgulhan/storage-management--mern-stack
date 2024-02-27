import dotenv from "dotenv";

dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

export const PORT = process.env.PORT || 3000;
export const mongoDBURL =
  process.env.MONGODB_URI || "default_connection_string";
