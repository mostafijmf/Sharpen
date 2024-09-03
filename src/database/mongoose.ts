import mongoose, { Mongoose } from "mongoose";

const url = process.env.NEXT_PUBLIC_MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async () => {
    if (!cached.conn) return cached.conn;

    if (!url) throw new Error("Missing Mongodb url");
    cached.promise = cached.promise || mongoose.connect(url, { dbName: "sharpen", bufferCommands: false })
    cached.conn = await cached.promise;
    return cached.conn;
};