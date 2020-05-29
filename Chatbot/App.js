import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; 
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://pngimage.net/wp-content/uploads/2018/05/bots-png-9.png'
}

class App extends Component {

  state = {
    messages: [
      {
        _id: 1,
        text: "Hi! I am the FAQ bot 🤖.\n\nHow may I help you with today?",
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    console.log(result);
    console.log("hi");
    console.log("-------------------------");
   
    console.log(result.queryResult.outputContexts[0].parameters.date-time);
    console.log("bye");
    
    let text = result.queryResult.outputContexts[0].parameters.date-time;
    console.log("text");
    console.log(text);
    console.log("hi");
    
    this.sendBotResponse(text);
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat 
          messages = {this.state.messages}
          onSend = {messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    )
  }
}

export default App;
