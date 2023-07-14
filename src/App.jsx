/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import ChatBot from "react-simple-chatbot";
import steps from "./utils/steps";

function Chatbot() {
  return (
    <div>
      <ChatBot
        steps={steps}
        headerTitle="Chat with Anna"
        speechSynthesis={{ enable: true, lang: "en" }}
        recognitionEnable
      />
    </div>
  );
}

export default Chatbot;
