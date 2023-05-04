import { connect, connection, type Mongoose } from 'mongoose';

const { MONGODB_URI } = process.env;

let cachedConnection: Mongoose | null = null;

export async function dbConnect(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  const conn = await connect(MONGODB_URI);

  cachedConnection = conn;

  return conn;
}

connection.on('connected', () => console.log('Mongo is connected'));

connection.on('error', (error) => console.error({ error }));
