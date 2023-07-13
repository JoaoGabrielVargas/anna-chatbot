/* eslint-disable react/react-in-jsx-scope */

import React, { useState } from "react";
// import { saveAs } from "file-saver"; //

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNewMessage = (text) => {
    setNewMessage({ text, date: "19-06-2019" });
  };

  const handleSendMessage = () => {
    setMessages([...messages, newMessage]);
    if (newMessage.text === "Goodbye") {
      // TODO: Store the conversation in the database
      return;
    }

    if (!username || !password) {
      // Ask for username and password if not provided
      setMessages([
        ...messages,
        {
          text: "Please provide your username and password.",
          date: "19-06-2019"
        }
      ]);
      setUsername("joão");
      setPassword("oi");
      return;
    }

    if (newMessage.text === "I want a loan") {
      // Display options for the loan
      setMessages([
        ...messages,
        { text: "Do you want to apply for a loan?", options: ["Yes", "No"] }
      ]);
    }

    // Handle other terms and respond accordingly
  };

  // const exportConversation = () => {
  //   const csvData = messages
  //    .map((message) => `${message.text} - ${message.date.toLocaleString()}`)
  //    .join("\n");
  //  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //  saveAs(blob, "conversation.csv");
  //

  return (
    <div>
      <h2>Hi, I'm Anna. I gonna help you. Talk to me!</h2>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={(e) => handleNewMessage(e.target.value)}
      />
      <button type="button" onClick={handleSendMessage}>
        Enviar
      </button>
      <div>
        {messages.map((message) => (
          <div key={message.text}>
            <span>{message.text}</span>
            <span>{message.date}</span>
            <div>
              {message.options &&
                message.options.map((option) => (
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatbot;
