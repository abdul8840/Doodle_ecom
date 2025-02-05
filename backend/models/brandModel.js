import mongoose from 'mongoose'

const brandSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model('Brand', brandSchema)
export default Brand;