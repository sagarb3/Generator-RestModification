/* eslint-disable no-unused-vars */
import path from "path";
import merge from "lodash/merge";

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.load({
    path: path.join(__dirname, "../.env"),
    sample: path.join(__dirname, "../.env.example")
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    masterKey: requireProcessEnv("MASTER_KEY"),
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    emailHost: requireProcessEnv("emailHost"),
    emailPort: requireProcessEnv("emailPort"),
    fromEmailId: requireProcessEnv("fromEmailId"),
    emailUser: requireProcessEnv("emailUser"),
    emailPassword: requireProcessEnv("emailPassword"),
    domainName: "http://google.com",
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {},
  development: {
    mongo: {
      uri: "mongodb://localhost/gemini-boiler-dev",
      options: {
        debug: true
      }
    },
    jwtExpiryInterval: {
      expiryTime: "5h"
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/gemini-boiler"
    }
  }
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
