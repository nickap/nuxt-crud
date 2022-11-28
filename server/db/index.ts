import mongoose from 'mongoose';
import { Nitro } from 'nitropack';

export default (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  mongoose.connect(config.MONGO_URI).then(() => console.log('Connected to DB'));
};
