/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import ChatBot from "react-simple-chatbot";
// import { saveAs } from "file-saver"; //

function Chatbot() {
  const waitForTrigger = ({previousValue}) => {
    if (previousValue === "Hello" || previousValue === "hello"){
      return "Hello! Whats your name?";
    }

    if (previousValue === "Good" || previousValue === "good"){
      return "I'm good too! What you want?";
    }

    if (previousValue === "I want" || previousValue === "i want"){
      return "Very good! What you want?";
    }

    if (previousValue === "Goodbye" || previousValue === "goodbye"){
      return "Ok! Bye then. =(";
    }

    return "I can't understand what you saying."
  }

  const setTrigger = ({steps}) => {
    const { message } = steps["wait for trigger"]
    if (message === "I can't understand what you saying.") {
      return "wait trigger"
    }
    
    return "next"
  }

  const steps = [
    {
      id: "Greet",
      message: "Hello! I'm Anna.",
      trigger: "wait trigger"
    },
    { id: "wait trigger", user: true, trigger: "wait for trigger" },
    { id: "wait for trigger", message: waitForTrigger, trigger: setTrigger },
    { id: "next", message: "PRóXIMO PASSO CARAI", end: true },
    // { id: "Ask Name", message: "How is your name?", trigger: "waiting name" },
    // { id: "waiting name", user: true, trigger: "Name"},
    // {
    //   id: "Name",
    //   message: "Hi {previousValue}, please enter a password. We want privacy :)",
    //   trigger: "waiting password"
    // },
    // { id: "waiting password", user: true, trigger: "anna write issue" },
    // { id: "anna write issue", message: "Now, tell me what you want.", trigger: "write issue"},
    // { id: "write issue", user: true, trigger: "next"},
    // { id: "next", message: "{previousValue}"},
    // {
    //   id: "issues",
    //   options: [
    //     { value: "React", label: "React", trigger: "React" },
    //     { value: "Node", label: "Node", trigger: "Node" }
    //   ]
    // },
    // { id: "React", message: "Thanks for telling your react issue", end: true },
    // { id: "Node", message: "Thanks for telling your node issue", end: true }
  ];

  return (
    <div>
      <ChatBot steps={steps} headerTitle="Conversar com Anna" speechSynthesis={{ enable: true, lang: 'en' }} recognitionEnable />
    </div>
  );
}

export default Chatbot;
