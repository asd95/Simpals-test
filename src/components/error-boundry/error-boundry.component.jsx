import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

export class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    const errorBoundry = error ? ErrorIndicator : children;

    return <div>{errorBoundry}</div>;
  }
}

export default ErrorBoundry;
