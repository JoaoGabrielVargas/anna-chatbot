/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import ChatBot from "react-simple-chatbot";
// import { saveAs } from "file-saver"; //

function ApplyLoan() {
  return (
  <div> 
    <a href="https://www.moneysupermarket.com/loans/">Click here for loan options</a> 
  </div>
  )
}

function Chatbot() {
  const waitForTrigger = ({previousValue}) => {
    if (previousValue === "Hello" || previousValue === "hello"){
      return "Hello! Whats your name?";
    }

    if (previousValue === "Good" || previousValue === "good"){
      return "I'm good too! First, tell me your name.";
    }

    if (previousValue === "I want" || previousValue === "i want"){
      return "Very good! Now, tell me your name.";
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
    
    return "set name"
  }

  const setAnswerTrigger = ({value}) => {
   const message = (value || '').toLowerCase();;
    if (message.includes("loan")) {
      return "loan trigger"
    }

    if (message.includes("i want")) {
      return "want trigger"
    }

    if (message.includes("good")) {
      return "good trigger"
    }
    if (message.includes("goodbye")) {
      return "goodbye trigger"
    }
    return "unknown answer trigger";
  }

 
  const steps = [
    {
      id: "Greet",
      message: "Hello! I'm Anna.",
      trigger: "wait trigger"
    },
    { id: "wait trigger", user: true, trigger: "wait for trigger" },
    { id: "wait for trigger", message: waitForTrigger, trigger: setTrigger },
    { id: "set name", user: true, trigger: "pre set password" },
    { id: "pre set password", message: "Beautiful name, {previousValue}. Now, set a password.", trigger: "set password" },
    
    // ANNA ASKING STEPS
  
    { id: "set password", user: true, trigger: "anna ask" },
    { id: "anna ask", message: "And what do you want?", trigger: "user ask" },

    // USER ASK
    { id: "user ask", user: true, trigger: setAnswerTrigger },

    // UNKNOWN ANSWER

    { id: "unknown answer trigger", message: "I don't know what you're saying, so goodbye.", end: true },

     // LOAN ANSWERS
    { id: "loan trigger", 
        options: [ 
          { 
            value: "Do you want to apply for a loan?", 
            label: "Do you want to apply for a loan?",
            trigger: "apply loan"
          },
          { 
            value: "Loan conditions", 
            label: "Loan conditions",
            trigger: "loan conditions"
          },
          { 
            value: "Help", 
            label: "Help",
            trigger: "help"
          },
        ]
    },
    {id : "apply loan", component: <ApplyLoan />, end: true},
    {id : "loan conditions", message: "loan conditions!!!", end: true},
    {id : "help", message: "somebody help meee please!", end: true},

    // WANT ANSWERS

    { id: "want trigger", message: "ráa what do you want now????", end: true },
    { id: "good trigger", message: "goood, very goooooood", end: true },
    { id: "goodbye trigger", message: "Bye bye then", end: true },
  ];

  return (
    <div>
      <ChatBot steps={steps} headerTitle="Chat with Anna" speechSynthesis={{ enable: true, lang: 'en' }} recognitionEnable />
    </div>
  );
}

export default Chatbot;
