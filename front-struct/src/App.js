import './App.css';
import React, { Component } from 'react';

class App extends Component {
  state = {
    a: 0,
    b: 0,
    sum: 0,
    backconn: '',
    modelconn: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        a: this.state.a,
        b: this.state.b
      })
    };

    fetch('https://api.minddetector.me/predict', requestOptions)
      .then(res => res.json())
      .then(data => {
        this.setState({
          sum: data.value,
          backconn: data.backid,
          modelconn: data.modelid
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>a: </label>
          <input type="number" name="a" value={this.state.a} onChange={this.handleChange}></input>
          <br></br>

          <label>b: </label>
          <input type="number" name="b" value={this.state.b} onChange={this.handleChange}></input>
          <br></br>

          <input type="submit"></input>
        </form>

        <h1> {this.state.sum} </h1>
        <h3> Backend: {this.state.backconn} </h3>
        <h3> Model: {this.state.modelconn} </h3>
      </div>
    );
  }
}

export default App;
