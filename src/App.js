import "./App.css";
import Preview from "./Preview";
import Speed from "./Speed";
import React, { Component } from "react";
import getText from "./getText";
const initialState = {
  text: getText(),
  userInput: "",
  symbols: 0,
  sec: 0,
  started: false,
  finished: false,
};
export class App extends Component {
  state = initialState;

  onRestart = () => {
    this.setState(initialState);
  };

  onUserInputChange = (e) => {
    const value = e.target.value;
    this.setTimer();
    this.onFinish(value);
    this.setState({
      userInput: value,
      symbols: this.countCorrectSymbols(value),
    });
  };

  setTimer = () => {
    if (!this.state.started) {
      this.setState({ started: true });
      this.interval = setInterval(() => {
        this.setState((prevProps) => {
          return { sec: prevProps.sec + 1 }; //check
        });
      }, 1000);
    }
  };

  onFinish = (userInput) => {
    if (userInput === this.state.text) {
      clearInterval(this.interval);
      this.setState({ finished: true });
    }
  };

  countCorrectSymbols = (userInput) => {
    const text = this.state.text.replace(" ", "");
    return userInput
      .replace(" ", "")
      .split("")
      .filter((s, i) => s === text[i]).length;
  };

  render() {
    return (
      <div>
        <Preview text={this.state.text} userInput={this.state.userInput} />
        <textarea
          value={this.state.userInput}
          onChange={this.onUserInputChange}
          readOnly={this.state.finished}
          placeholder="Start Typing"
        ></textarea>
        <Speed symbols={this.state.symbols} sec={this.state.sec} />
        <button onClick={this.onRestart}>Restart</button>
      </div>
    );
  }
}

export default App;
