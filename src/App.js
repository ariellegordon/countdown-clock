import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      rounds: 0,
      selectedValue: 0,
      active: true,
      buttonDisabled: false,
      roundsOn: "",
      fontColor: "black",
      popUp: "false"
    };
    this.timer = 0;
    this.handleChange = this.handleChange.bind(this);

    this.startTimer = this.startTimer.bind(this);
    this.startBreak = this.startBreak.bind(this);
  }

  handleChange(event) {
    this.setState({
      selectedValue: event.target.value,
      time: 5,
      rounds: 1
    });
  }

  timeChange() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    } else {
      clearInterval();
    }
  }
  startTimer() {
    this.setState({
      buttonDisabled: true,
      roundsOn: "none",
      fontColor: "black"
    });
    if (this.state.time === 0) {
      this.setState({ time: 5 });
    }
    let myTimer = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(myTimer);
        this.setState({ active: false });
        this.startBreak();
      } else if (this.state.rounds === this.state.selectedValue) {
        clearInterval(myTimer);
        this.setState({ popUp: "" });
        alert("Timer has finished");
      } else {
        this.setState({ time: this.state.time - 1 });
      }
    }, 1000);
  }

  startBreak() {
    if (this.state.rounds === Math.floor(+this.state.selectedValue / 2)) {
      this.setState({
        rounds: this.state.rounds + 1,
        time: 600,
        fontColor: "#AC1C1C"
      });
    } else {
      this.setState({
        rounds: this.state.rounds + 1,
        time: 5,
        fontColor: "#AC1C1C"
      });
    }
    let myTimer = setInterval(() => {
      if (this.state.rounds === +this.state.selectedValue + 1) {
        clearInterval(myTimer);
        alert("Timer is finished");
      } else if (this.state.time === 0) {
        clearInterval(myTimer);
        this.setState({ active: true });
        this.startTimer();
      } else {
        this.setState({ time: this.state.time - 1 });
      }
    }, 1000);
  }

  render() {
    const rounds = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ];
    let minutes =
      this.state.time / 60 < 10
        ? "0" + Math.floor(this.state.time / 60)
        : Math.floor(this.state.time / 60);
    let seconds =
      this.state.time % 60 < 10
        ? "0" + (this.state.time % 60)
        : this.state.time % 60;
    return (
      <div
        className="App"
        style={{
          backgroundColor: this.state.backgroundColor,
          color: this.state.fontColor
        }}
      >
        <div>
          <h1>Launch Day Clock</h1>
        </div>

        <div style={{ display: this.state.roundsOn }}>
          <h3>Number of Rounds</h3>
          <select
            id="rounds"
            value={this.state.selectedValue}
            onChange={this.handleChange}
          >
            {rounds.map(round => (
              <option key={round} value={round}>
                {round}
              </option>
            ))}
          </select>
        </div>
        <div>
          {this.state.active ? (
            <div>
              <h1>
                Round {this.state.rounds}{" "}
                <span style={{ fontSize: 20 }}>
                  / {this.state.selectedValue}
                </span>
              </h1>
              <h2>
                {minutes}:{seconds}
              </h2>
            </div>
          ) : (
            <h1>
              Round {this.state.rounds} starts in {minutes}:{seconds}
            </h1>
          )}
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={this.startTimer}
          disabled={this.state.buttonDisabled}
        >
          Start
        </button>
      </div>
    );
  }
}

export default App;
