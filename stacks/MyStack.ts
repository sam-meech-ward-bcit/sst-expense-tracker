import { StackContext, Api, StaticSite, Bucket } from "sst/constructs";

export function API({ stack }: StackContext) {

  const audience = `api-ExpensesApp-${stack.stage}`

  const assetsBucket = new Bucket(stack, "assets");

  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://expensesappagainb.kinde.com",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/lambda.handler",
        }
      },
      "GET /expenses/total-amount": "packages/functions/src/expenses.handler",
      "GET /expenses": "packages/functions/src/expenses.handler",
      "POST /expenses": "packages/functions/src/expenses.handler",
      "POST /signed-url": {
        function: {
          environment: {
            ASSETS_BUCKET_NAME: assetsBucket.bucketName,
          },
          handler: "packages/functions/src/s3.handler",
        }
      }
    },
  });

  api.attachPermissionsToRoute("POST /signed-url", [assetsBucket, "grantPut"])

  const web = new StaticSite(stack, "web", {
    customDomain: stack.stage === "prod" ? {
      domainName: "expensesappagainb.smw.wtf",
      hostedZone: "smw.wtf",
    } : undefined,
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
