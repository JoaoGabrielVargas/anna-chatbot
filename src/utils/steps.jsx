import GoodbyeComponent from "../components/GoodbyeComponent";
import ApplyLoan from "../components/ApplyLoan";
import LoanConditions from "../components/LoanConditions";
import HelpComponent from "../components/HelpComponent";

const waitForTrigger = ({ previousValue }) => {
  const message = (previousValue || "").toLowerCase();
  if (message.includes("hello")) {
    return "Hello! What is your name?";
  }
  if (message.includes("goodbye")) {
    return "Ok! Bye then. =(";
  }

  if (message.includes("good")) {
    return "I am well too! First, tell me your name.";
  }

  if (message.includes("i want")) {
    return "Everyone wants something! But first, tell me your name.";
  }

  return "I can't understand what you saying. Tip: I like to start conversations with 'hello', 'good', 'I want' or if you wanna leave, just say 'goodbye'";
};

const setTrigger = ({ steps }) => {
  const { message } = steps["wait for trigger"];
  if (message.includes("I can't understand what you saying.")) {
    return "wait trigger";
  }

  if (message.includes("Bye then")) {
    return "goodbye trigger";
  }

  return "setName";
};

const setAnswerTrigger = ({ value }) => {
  const message = (value || "").toLowerCase();
  if (message.includes("loan")) {
    return "loan trigger";
  }
  if (message.includes("goodbye")) {
    return "goodbye trigger";
  }
  return "unknown answer trigger";
};

const steps = [
  {
    id: "Greet",
    message: "Hello! I'm Anna.",
    trigger: "wait trigger",
  },
  { id: "wait trigger", user: true, trigger: "wait for trigger" },
  { id: "wait for trigger", message: waitForTrigger, trigger: setTrigger },
  { id: "setName", user: true, trigger: "pre set password" },
  {
    id: "pre set password",
    message: "Beautiful name, {previousValue}. Now, enter a password.",
    trigger: "set password",
  },

  // ANNA ASKING STEPS

  { id: "set password", user: true, trigger: "anna ask" },
  {
    id: "anna ask",
    message:
      "It's great talking to you! What you wanna know? I can talk about loan",
    trigger: "user ask",
  },

  // USER ASK
  { id: "user ask", user: true, trigger: setAnswerTrigger },

  // UNKNOWN ANSWER

  {
    id: "unknown answer trigger",
    message:
      "I don't know what you're talking about, can you say it again? Is it about loan?",
    trigger: "anna ask",
  },

  // LOAN ANSWERS
  {
    id: "loan trigger",
    options: [
      {
        value: "Do you want to apply for a loan?",
        label: "Do you want to apply for a loan?",
        trigger: "apply loan",
      },
      {
        value: "Loan conditions",
        label: "Loan conditions",
        trigger: "loan conditions",
      },
      {
        value: "Help",
        label: "Help",
        trigger: "help",
      },
    ],
  },
  {
    id: "apply loan",
    component: <ApplyLoan />,
    trigger: "anna talk after ask",
  },
  {
    id: "anna talk after ask",
    message:
      "Do you want to say goodbye, ask again or go back to Loan Options?",
    trigger: "after select option loan",
  },
  {
    id: "after select option loan",
    options: [
      {
        value: "Ask again",
        label: "Ask again",
        trigger: "anna ask",
      },
      {
        value: "Go back to Loan Options",
        label: "Go back to Loan Options",
        trigger: "loan trigger",
      },
      {
        value: "Say goodbye.",
        label: "Say goodbye.",
        trigger: "goodbye trigger",
      },
    ],
  },
  {
    id: "loan conditions",
    component: <LoanConditions />,
    trigger: "anna talk after ask",
  },
  {
    id: "help",
    component: <HelpComponent />,
    trigger: "anna talk after ask",
  },

  // END CONVERSATION TRIGGER
  {
    id: "goodbye trigger",
    asMessage: true,
    component: <GoodbyeComponent />,
    end: true,
  },
];

export default steps;
