import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  contentName: {
    type: String,
    required: true,
  },
  categorize: {
    type: Array,
    required: true,
  },
  taskItems: {
    type: Array,
    required: true,
  },
  cloze: {
    type: Array,
    required: true,
  },
  clozeHeader: {
    type: String,
    required: true,
  },
  comprehension: {
    type: Array,
    required: true,
  },
  comprehensionHeader: {
    type: String,
    required: true,
  },
});

export const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);
