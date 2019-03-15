import io from "socket.io-client";
import React, { Component } from "react";
import "./App.css";

import Login from "./Login";
import Chat from "./Chat";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedin: false,
      username: "",
      messages: []
    };

    this.signIn = this.signIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.listener = io(
      "http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000"
    );

    this.listener.on("messages", data => {
      for (let message of data) {
        this.addMessage(message);
      }
    });

    this.listener.on("new_message", data => {
      this.addMessage(data);
    });

    this.writer = io(
      "http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000"
    );
  }

  signIn(username) {
    this.setState({
      signedin: true,
      username: username
    });
  }

  logOut() {
    this.setState({
      signedin: false,
      username: ""
    });
  }

  addMessage(obj) {
    this.setState({
      messages: [...this.state.messages, obj]
    });
  }

  sendMessage(text) {
    const message = {
      username: this.state.username,
      content: text
    };
    this.writer.emit("message", message);
  }

  render() {
    return (
      <div className="app">
        {!this.state.signedin ? (
          <Login login={this.signIn} />
        ) : (
          <Chat
            username={this.state.username}
            messages={this.state.messages}
            logout={this.logOut}
            sendmessage={this.sendMessage}
          />
        )}
      </div>
    );
  }
}

export default App;