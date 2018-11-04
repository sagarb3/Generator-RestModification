import mongoose, { Schema } from "mongoose";
const passwordResetSchema = new Schema(
  {
    uuid: {
      type: String
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Login"
    },
    expiryDate: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);
passwordResetSchema.methods = {
  view(full) {
    let view = {};
    let fields = ["id", "uuid", "userId", "expiryDate"];
    if (full) {
      fields = [...fields, "createdAt"];
    }

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  }
};
const model = mongoose.model("PasswordReset", passwordResetSchema);
export const schema = model.schema;
export default model;
