import mongoose from "mongoose";

const url = process.env.NEXT_PUBLIC_MONGODB_URL;

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export const connectToDatabase = async (): Promise<void> => {
    if (connection.isConnected) { 
        console.log('Already connected to the database');
        return;
    }

    try {
        // Attempt to connect to the database
        const db = await mongoose.connect(url || '', {});

        connection.isConnected = db.connections[0].readyState;

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        // Graceful exit in case of a connection error
        process.exit(1);
    }
};