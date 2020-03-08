import React from "react";
import { TestConsumer } from "../test-service-context";

const withTestService = () => Wrapper => {
  return props => {
    return (
      <TestConsumer>
        {testService => {
          return <Wrapper {...props} testService={testService} />;
        }}
      </TestConsumer>
    );
  };
};

export default withTestService;
