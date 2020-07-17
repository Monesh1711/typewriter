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
    let errorWords = this.compareWords(this.state.text, value);
    this.setState({
      userInput: value,
      symbols: this.countCorrectSymbols(value),
    });
  };

  compareWords = (userInput, originalText) => {
    let word1 = originalText.split(" ");
    let word2 = userInput.split(" ");
    let count = 0;
    word1.forEach(function (item, index) {
      if (item == word2[index]) {
        console.log(count);
        console.log(item);
        console.log(word2[index]);
        count++;
      }
    });
    let errorWords = word1.length - count - 1;
    console.log(errorWords);
    return errorWords;
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
          readOnly={this.state.finished || this.state.sec > 60}
          placeholder="Start Typing"
        ></textarea>
        <span>{this.state.sec}</span>
        <Speed symbols={this.state.symbols} sec={this.state.sec} />
        <button onClick={this.onRestart}>Restart</button>
      </div>
    );
  }
}

export default App;
