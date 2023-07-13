/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import ChatBot from "react-simple-chatbot";
// import { saveAs } from "file-saver"; //

function ApplyLoan() {
  return (
  <div> 
    <a href="https://www.moneysupermarket.com/loans/"
      target="_blank"
      rel="noreferrer"
    >
      Click here for loan options</a> 
  </div>
  )
}

function LoanConditions() {
  return (
  <div> 
    <a href="https://www.moneysupermarket.com/loans/eligibility-search/" 
      target="_blank"
      rel="noreferrer"  
    >
      Click here to see loan conditions
    </a> 
  </div>
  )
}

function HelpComponent() {
  return (
  <div> 
    <a href="https://www.moneysupermarket.com/how-moneysupermarket-works/"
    target="_blank"
    rel="noreferrer"   
    >
      Click here to get help and understand about the website</a> 
  </div>
  )
}

function Chatbot() {
  const waitForTrigger = ({previousValue}) => {
    const message = (previousValue || '').toLowerCase();
    if (message.includes("hello")){
      return "Hello! Whats your name?";
    }

    if (message.includes("good")){
      return "I'm good too! First, tell me your name.";
    }

    if (message.includes("i want")){
      return "Everyone want something! But first, tell me your name.";
    }

    if (message.includes("goodbye")){
      return "Ok! Bye then. =(";
    }

    return "I can't understand what you saying. Tip: I like to start conversations with 'hello', 'good', 'I want' or if you wanna leave, just say 'goodbye'"
  }

  const setTrigger = ({steps}) => {
    const { message } = steps["wait for trigger"]
    if (message.includes("I can't understand what you saying.")) {
      return "wait trigger"
    }
    
    return "set name"
  }

  const setAnswerTrigger = ({value}) => {
   const message = (value || '').toLowerCase();
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
    { id: "anna ask", message: "What you wanna know?", trigger: "user ask" },

    // USER ASK
    { id: "user ask", user: true, trigger: setAnswerTrigger },

    // UNKNOWN ANSWER

    { id: "unknown answer trigger", message: "I don't know what you're saying, can you say again?.", trigger: "wait trigger" },

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
    {id : "apply loan", component: <ApplyLoan />, trigger: "anna talk after ask"},
    {id : "anna talk after ask", message: "You want to say goodbye, ask again or go back to Loan Options?", trigger: "after select option loan" },
    { id: "after select option loan", 
        options: [ 
          { 
            value: "Ask again", 
            label: "Ask again",
            trigger: "anna ask"
          },
          { 
            value: "Go back to Loan Options", 
            label: "Go back to Loan Options",
            trigger: "loan trigger"
          },
          { 
            value: "Say goodbye.", 
            label: "Say goodbye.",
            trigger: "goodbye trigger"
          },
        ]
    },
    {id : "loan conditions", component: <LoanConditions />, trigger: "anna talk after ask"},
    {id : "help", component: <HelpComponent />, trigger: "anna talk after ask"},

    // WANT ANSWERS

    { id: "want trigger", message: "ráa what do you want now????", end: true },
    { id: "good trigger", message: "goood, very goooooood", end: true },
    { id: "goodbye trigger", message: "Farewell then", end: true },
  ];

  return (
    <div>
      <ChatBot steps={steps} headerTitle="Chat with Anna" speechSynthesis={{ enable: true, lang: 'en' }} recognitionEnable />
    </div>
  );
}

export default Chatbot;
