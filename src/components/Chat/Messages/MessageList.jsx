import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './message-list.css';
import Message from './Message';

// LOAD MESSAGES IN THIS COMPONENT
const DUMMY_MESSAGES = [
  {
    id: 1,
    sender: 'Dr. Om Lata',
    title: 'MD',
    timestamp: '12:30pm',
    message: 'Welcome to Leo. If you have any questions or comments you can reach us at anytime.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg'
  },
  {
    id: 2,
    sender: 'Amy',
    title: 'Self',
    timestamp: '2:49pm',
    message: 'Hi Dr. Lata, I was wondering if you could tell me more about the process for our first visit with Emily.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/eomerx/128.jpg'
  },
  {
    id: 3,
    sender: 'Mark',
    title: 'Guardian',
    timestamp: '2:50pm',
    message: 'Emily has had a bad cough recently. Should we schedule a sick visit as well.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/eomerx/128.jpg'
  },
  {
    id: 4,
    sender: 'Dr. Om Lata',
    title: 'MD',
    timestamp: '12:30pm',
    message: 'Hello Mark, no need for a separate visit. We can take a look at Emily\'s cough when you schedule your first visit.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg'
  }
];

const MessageList = React.createClass({
  getInitialState: function(){
    return{
      messages: DUMMY_MESSAGES
    }
  },

  generateMessages: function(){
    var messages = this.state.messages;
    return (
      messages.map(function(message, i) {
          return <Message key={i} data={message}/>;
        })
    )

  },

  render: function() {
    return (
      <div>
        {this.generateMessages()}
      </div>
    );
  }
});

export default CSSModules(MessageList, styles);
