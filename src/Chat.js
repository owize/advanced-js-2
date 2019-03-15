import React, { Component } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Emojify from "react-emojione";
import Message from "./Message";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageToSend: ""
    };

    this.changeMessage = this.changeMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
  }

  changeMessage(e) {
    this.setState({
      messageToSend: e.target.value
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.props.sendmessage(this.state.messageToSend);
    this.setState({
      messageToSend: ""
    });
  }

  addEmoji(e) {
    this.setState({
      messageToSend: this.state.messageToSend + e.target.title
    });
  }

  render() {
    return (
      <div className="chat-page-container">
        <div className="app-header">
          <div />
          <h1>{this.props.username} is Onlinex  </h1>
          <button className="log-out" onClick={this.props.logout}>
            Log Out
          </button>
        </div>
        <ScrollToBottom className="main__messages">
          {this.props.messages.map(obj => {
            return (
              <Message
                key={obj.id}
                message={obj}
                username={this.props.username}
              />
            );
          })}
        </ScrollToBottom>
        <form className="new-message-container" onSubmit={this.sendMessage}>
          <input
            id="new-message__content"
            minLength={1}
            maxLength={100}
            value={this.state.messageToSend}
            onChange={this.changeMessage}
          />
          <div className="emoji">
            <Emojify style={{ height: 20, width: 20 }} onClick={this.addEmoji}>
              :heart::thinking::fire:
            </Emojify>
          </div>
          <input type="submit" className="new-message__send" value="Send" />
        </form>
      </div>
    );
  }
}

export default Chat;