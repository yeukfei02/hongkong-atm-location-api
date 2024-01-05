# hongkong-atm-location-api

Hong Kong atm location api in aws cdk

documentation: <https://documenter.getpostman.com/view/3827865/2s9YsGitMi>

api url: <https://kxi6p1o415.execute-api.ap-southeast-1.amazonaws.com/prod/>

## Requirement

- install nodejs (v18)
- install cdk-cli

The cdk.json file tells the CDK Toolkit how to execute your app.

## Testing and run

```zsh
// install dependencies
$ pnpm install

// install lambda layer dependencies
$ cd lambda/layer/nodejs
$ pnpm install

// compile typescript to js
$ pnpm run build

// watch for changes and compile
$ pnpm run watch

// run test case
$ pnpm run test

// lint files
$ pnpm run lint

// format files
$ pnpm run format
```

```zsh
// copy .env file
$ cp .env.sample .env

// list all stacks in the app
$ cdk ls

// deploys the CDK toolkit stack into an AWS environment
$ cdk bootstrap

// compare deployed stack with current state
$ cdk diff

// synthesize the CloudFormation template
$ cdk synth

// deploy specific stack to your default AWS account/region
$ cdk deploy <stackName>

// deploy all stack
$ cdk deploy --all

// destroy specific stack
$ cdk destroy <stackName>

// destroy all stack
$ cdk destroy --all

// check more command
$ cdk --help
```
