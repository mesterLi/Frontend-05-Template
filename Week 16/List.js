import { Component, createElement } from "./toy-react";

export default class List extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this);
    return (
      <div>{this.children.forEach(child => {
        console.log(child)
      })}</div>
    )
  }
}