import { App, Stack, StackProps } from "@aws-cdk/core";
import { PickleToVizService } from "./services/pickleToVizService";
import * as apigateway from "@aws-cdk/aws-apigateway";

class HelloCdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "pickle-to-viz-api", {
      restApiName: "Pickle to Viz Service",
      description: "This service transforms pickle files to JSON objects."
    });

    new PickleToVizService(this, "pickle-to-viz-service", {api});
  }
}

const app = new App();
new HelloCdkStack(app, "HelloCdkStack");
