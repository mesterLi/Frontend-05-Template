import { Component, createElement } from "./toy-react";

export default class Button extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>{this.children}</div>
    )
  }
}