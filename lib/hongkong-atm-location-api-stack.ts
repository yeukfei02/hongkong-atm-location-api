import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as _lambda from "aws-cdk-lib/aws-lambda";
import * as _apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ManagedPolicy } from "aws-cdk-lib/aws-iam";

export class HongkongAtmLocationApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // create infra
    this.createInfra();
  }

  createInfra() {
    // create lambda
    const lambdaFunc = this.createLambda();

    // create apigateway
    this.createApigateway(lambdaFunc);
  }

  createLambda() {
    const lambdaFunc = new _lambda.Function(
      this,
      "HongkongAtmLocationApiLambda",
      {
        functionName: "hongkong-atm-location-api",
        runtime: _lambda.Runtime.NODEJS_18_X,
        memorySize: 1000,
        code: _lambda.Code.fromAsset("lambda"),
        handler: "atm-location.handler",
        architecture: _lambda.Architecture.ARM_64,
        timeout: Duration.minutes(5),
        tracing: _lambda.Tracing.ACTIVE,
        environment: {
          NODE_ENV: "production",
        },
      },
    );

    lambdaFunc.role?.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );

    return lambdaFunc;
  }

  createApigateway(lambdaFunc: _lambda.Function) {
    const apigateway = new _apigateway.LambdaRestApi(
      this,
      "hongkong-atm-location-api",
      {
        handler: lambdaFunc,
        defaultCorsPreflightOptions: {
          allowOrigins: _apigateway.Cors.ALL_ORIGINS,
          allowMethods: _apigateway.Cors.ALL_METHODS,
        },
        proxy: false,
      },
    );

    const api = apigateway.root.addResource("atm-location");
    api.addMethod("GET");
  }
}
