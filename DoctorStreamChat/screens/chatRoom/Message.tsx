import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const Messages({ socket })  {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <Text>{message.id}</Text>
        ))
      }
  );
}

export default Messages;