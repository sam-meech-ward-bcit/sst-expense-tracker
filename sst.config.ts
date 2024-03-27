import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import dotenv from 'dotenv'
dotenv.config()

export default {
  config(_input) {
    return {
      name: "my-expenses-app",
      region: "us-west-2",
      profile: "meech-ward"
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
