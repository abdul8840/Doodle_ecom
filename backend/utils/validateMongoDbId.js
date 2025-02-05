import mongoose from 'mongoose';

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error('Invalid MongoDB ID');
  }
};

export default validateMongoDbId;
