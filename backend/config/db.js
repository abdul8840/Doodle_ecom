import mongoose from 'mongoose'

export const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'Doodle',
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};