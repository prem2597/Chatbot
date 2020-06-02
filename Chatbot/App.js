import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; 
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './config';
import Header from './components/header';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://pngimage.net/wp-content/uploads/2018/05/bots-png-9.png'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headers: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: "👋 Hi! I am the FAQ bot 🤖.\n\nHow may I help you with today?",
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

  async sendBotResponse(text, payload) {
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

    if (msg.text === "I didn't get that. Can you say it again?" || msg.text === "I missed what you said. What was that?" || msg.text === "Sorry, could you say that again?" || msg.text === "Sorry, can you say that again?" || msg.text === "Can you say that again?" || msg.text === "Sorry, I didn't get that. Can you rephrase?" || msg.text === "Sorry, what was that?" || msg.text === "One more time?" || msg.text === "What was that?" || msg.text === "Say that one more time?" || msg.text === "I didn't get that. Can you repeat?" || msg.text === "I missed that, say that again?") {
      console.log("hi");
      var uri = "what";
      this.text = encodeURIComponent(uri);
      this.url = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q='+this.text+'&accepted=True&site=stackoverflow'
      await fetch(this.url)
      .then((response) => response.json())
      .then((responseJson) =>
      {
        if (responseJson.items[1].link) {
          msg.text = "The query you are searching for is not updated in my database. I will intimate my master to update my data.\n\n But, refer to these two link where you may find a solution for your problem \n\n"+responseJson.items[0].link+"\n\n"+responseJson.items[1].link
        } else {
          msg.text = "The query you are searching for is not updated in my database. I will intimate my master to update my data.\n\n But, refer to this link where you may find a solution for your problem \n\n"+responseJson.items[0].link
        }
      })
      .catch(() => {
      });
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
        <View style={styles.headers}>
          <Header />
          <View style={styles.container}>
            <GiftedChat 
              messages = {this.state.messages}
              onSend = {messages => this.onSend(messages)}
              user={{
                _id: 1
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default App;
