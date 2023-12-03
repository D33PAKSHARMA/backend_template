import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connected!`))
    .catch((err) => console.log(err));
};
