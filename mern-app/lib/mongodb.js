import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://priyaamrita5:minu123@cluster0.ln7es.mongodb.net/mydatabase?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
    cached.conn = await cached.promise;

    return cached.conn;
  }
}
export default connectToDatabase;
