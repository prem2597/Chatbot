import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; 
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './config';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://pngimage.net/wp-content/uploads/2018/05/bots-png-9.png'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

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
       
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    
    this.sendBotResponse(text, payload);
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

  sendBotResponse(text, payload) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    }

    if (payload && payload.is_image) {
      msg.text = text;
      msg.image = payload.url;
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <View style={styles.container}>
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
