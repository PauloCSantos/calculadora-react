import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  op_press: false,
  next_n: false
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.op_press === true) {
      return;
    }
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      let aux;
      const values = [...this.state.values];

      switch (currentOperation) {
        case "+":
          aux = values[0] + values[1];
          break;
        case "-":
          aux = values[0] - values[1];
          break;
        case "/":
          aux = values[0] / values[1];
          break;
        case "*":
          aux = values[0] * values[1];
          break;
        case "=":
          aux = values[0];
          break;
        default:
          break;
      }

      if (isNaN(aux) || !isFinite(aux)) {
        this.clearMemory();
        return;
      }
      let fixedValue = aux.toFixed(2)
      let realValue = parseFloat(fixedValue);

      values[0] = realValue;
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: operation,
        current: 1,
        clearDisplay: !equals,
        values,
        op_press: equals ? false : true,
        next_n: equals ? true : false
        
      });
    }
  }

  addDigit(n) {

    if(this.state.next_n === true) {
      return;
    }
    
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValuee = currentValue
    let displayValue
    if(n === "." && displayValuee.includes(".")) {
      displayValue = displayValuee;
    } else {
      displayValue = displayValuee + n
    }
   
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values, op_press: false });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
