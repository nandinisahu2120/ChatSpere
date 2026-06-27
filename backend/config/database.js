import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(
        `💗💗💗congratulations🎉👏🎊 database connected ꧁𓊈𒆜𝓟𝓻𝓸𒆜𓊉꧂💗💗💗`,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
