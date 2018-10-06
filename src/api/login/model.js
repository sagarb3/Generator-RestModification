import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { env } from "../../config";
const loginSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
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

loginSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  /* istanbul ignore next */
  const rounds = env === "test" ? 1 : 9;
  bcrypt
    .hash(this.password, rounds)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

loginSchema.methods = {
  view(full) {
    let view = {};
    let fields = ["id"];
    if (full) {
      fields = [...fields, "createdAt"];
    }

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  },
  authenticate(password) {
    return bcrypt
      .compare(password, this.password)
      .then(valid => (valid ? this : false));
  }
};

const model = mongoose.model("Login", loginSchema);
export const schema = model.schema;
export default model;
