#!/usr/bin/env node
import "dotenv/config";
import * as cdk from "aws-cdk-lib";
import { HongkongAtmLocationApiStack } from "../lib/hongkong-atm-location-api-stack";

const app = new cdk.App();

new HongkongAtmLocationApiStack(app, "HongkongAtmLocationApiStack", {
  stackName: `hongkong-atm-location-api-stack`,
  env: {
    region: "ap-southeast-1",
    ...(process.env.ACCOUNT_ID && {
      account: process.env.ACCOUNT_ID,
    }),
  },
});
