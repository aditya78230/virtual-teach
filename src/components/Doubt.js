//import React from 'react';
import { useNavigate } from "react-router-dom";
import "carbon-components/css/carbon-components.css";
import "./Doubt.css";

import React, { useState, useEffect } from "react";
//import './Doubt.css';

const Doubt = () => {
  const navigate = useNavigate();

  const returnToHandTrack = () => {
    // Navigate back to the original page
    navigate("/");
  };

  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Setup Speech Recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        speakThis(transcript.toLowerCase());
      };
      setRecognition(recognition);

      // Greet the user on load
      speak("Hi..");
      speak("I'm your virtual Teacher");
      wishMe();
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  }, []);

  const speak = (sentence) => {
    const textSpeak = new SpeechSynthesisUtterance(sentence);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
  };

  const wishMe = () => {
    const day = new Date();
    const hr = day.getHours();

    if (hr >= 0 && hr < 12) {
      speak("Good Morning");
    } else if (hr === 12) {
      speak("Good Noon");
    } else if (hr > 12 && hr <= 17) {
      speak("Good Afternoon");
    } else {
      speak("Good Evening");
    }
    speak("How can I help?");
  };

  const speakThis = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I did not understand what you said, please try again";

    if (message.includes("hi") || message.includes("hello".toLowerCase())) {
      speech.text = "Hello. How can I help";
    } else if (message.includes("how are you".toLowerCase())) {
      speech.text = "I am fine. I think, you also fine";
    } else if (message.includes("introduce yourself".toLowerCase())) {
      speech.text =
        "I'm a virtual assistant. My name is Shocave. I'm developed by Md Shohanur Rahman. I can help you that you want. Still, I'm under developing. I think, I'll be more powerful with Md shohanur rahman. Thank You";
    } else if (message.includes("how old are you".toLowerCase())) {
      speech.text =
        "As I'm a virtual assistant, I've no age. But, I can say that I've started my journey from 14th April, 2022";
    } else if (
      message.includes("what are you doing now") ||
      message.includes("what are you doing") ||
      message.includes("what are you doing right now")
    ) {
      speech.text = "Oh. It's pretty cool. I'm talking with you";
    } else if (message.includes("what is your name".toLowerCase())) {
      speech.text = "My name is Shocave";
    } else if (message.includes("can you help me".toLowerCase())) {
      speech.text =
        "Why not? Ask me. If possible, then I will try with my best";
    } else if (message.includes("who are you".toLowerCase())) {
      speech.text = "Hey!! I'm Shocave. I'm your personal virtual assistant.";
    } else if (message.includes("how can you help me".toLowerCase())) {
      speech.text = "It's cool. I can help you in many ways.";
    } else if (message.includes("what is react".toLowerCase())) {
      speech.text =
        "react is a front-end JavaScript library developed by Facebook in 2011 and it follows the component based approach which helps in building reusable UI components.it is used for developing complex and interactive web and mobile UI.";
    } else if (message.includes("what are the features of react".toLowerCase())) {
      speech.text =
        "It uses the virtual DOM instead of the real DOM.It uses server-side rendering.It follows uni-directional data flow or data binding";
    } else if (message.includes("list some of the major advantages of React".toLocaleLowerCase())) {
      speech.text =
        "Some of the major advantages of React are:It increases the application’s performanceIt can be conveniently used on the client as well as server sideBecause of JSX, code’s readability increasesReact is easy to integrate with other frameworks like Meteor, Angular, etcUsing React, writing UI test cases become extremely easy";
    } else if (message.includes("what are the limitations of React".toLowerCase())) {
      speech.text =
        "React is just a library, not a full-blown framework Its library is very large and takes time to understand It can be little difficult for the novice programmers to understand Coding gets complex as it uses inline templating and JSX";
    } else if (message.includes("what is the purpose of render() in React".toLowerCase())) {
      speech.text =
        "Each React component must have a render() mandatorily. It returns a single React element which is the representation of the native DOM component. If more than one HTML element needs to be rendered, then they must be grouped together inside one enclosing tag such as <form>, <group>,<div> etc. This function must be kept pure i.e., it must return the same result each time it is invoked.";
    } else if (message.includes("in React, everything is a component".toLowerCase())) {
      speech.text =
        "Components are the building blocks of a React application’s UI. These components split up the entire UI into small independent and reusable pieces. Then it renders each of these components independent of each other without affecting the rest of the UI.";
    } else if (
      message.includes("what is arrow function in React How is it used")
    ) {
      speech.text =
        "Arrow functions are more of brief syntax for writing the function expression. They are also called ‘fat arrow‘ (=>) the functions. These functions allow to bind the context of the components properly since in ES6 auto binding is not available by default. Arrow functions are mostly useful while working with the higher order functions.";
    } else if (message.includes("what is an event in React".toLowerCase())) {
      speech.text =
        "In React, events are the triggered reactions to specific actions like mouse hover, mouse click, key press, etc. Handling these events are similar to handling events in DOM elements. But there are some syntactical differences like:Events are named using camel case instead of just using the lowercase.Events are passed as functions instead of strings.The event argument contains a set of properties, which are specific to an event. Each event type contains its own properties and behavior which can be accessed via its event handler only.";
    } else if (message.includes("how are forms created in React".toLowerCase())) {
      speech.text =
        "React forms are similar to HTML forms. But in React, the state is contained in the state property of the component and is only updated via setState(). Thus the elements can’t directly update their state and their submission is handled by a JavaScript function. This function has full access to the data that is entered by the user into a form.";
    } else if (message.includes("what are Higher Order Components(HOC)".toLowerCase())) {
      speech.text =
        "Higher Order Component is an advanced way of reusing the component logic. Basically, it’s a pattern that is derived from React’s compositional nature. HOC are custom components which wrap another component within it. They can accept any dynamically provided child component but they won’t modify or copy any behavior from their input components. You can say that HOC are ‘pure’ components.";
    } else if (message.includes("what are pure components".toLocaleLowerCase())) {
      speech.text =
        "Pure components are the simplest and fastest components which can be written. They can replace any component which only has a render(). These components enhance the simplicity of the code and performance of the application.";
    } else if (message.includes("explain Flux".toLocaleLowerCase())) {
      speech.text =
        "Flux is an architectural pattern which enforces the uni-directional data flow. It controls derived data and enables communication between multiple components using a central Store which has authority for all data. Any update in data throughout the application must occur here only. Flux provides stability to the application and reduces run-time errors.";
    } else if (message.includes("what is Redux".toLowerCase())) {
      speech.text =
        "Redux is one of the most trending libraries for front-end development in today’s marketplace. It is a predictable state container for JavaScript applications and is used for the entire applications state management. Applications developed with Redux are easy to test and can run in different environments showing consistent behavior.";
    } else if (message.includes("what is React Router".toLowerCase())) {
      speech.text =
        "React Router is a powerful routing library built on top of React, which helps in adding new screens and flows to the application. This keeps the URL in sync with data that’s being displayed on the web page. It maintains a standardized structure and behavior and is used for developing single page web applications. React Router has a simple API.";
    } else if (message.includes("what is higher-order component in React".toLowerCase())) {
      speech.text =
        "Higher-order components or HOC is the advanced method of reusing the component functionality logic. It simply takes the original component and returns the enhanced component. HOC are beneficial as they are easy to code and read. Also, helps to get rid of copying the same logic in every component";
    } else if (message.includes("explain one way data binding in React".toLowerCase())) {
      speech.text =
        "ReactJS uses one-way data binding which can be Component to View or View to Component. It is also known as one-way data flow, which means the data has one, and only one way to be transferred to other parts of the application. In essence, this means child components are not able to update the data that is coming from the parent component. It is easy to debug and less prone to errors.";
    } else if (
      message.includes(
        " Explain the methods used in mounting phase of components"
      )
    ) {
      speech.text =
        "Mounting is the phase of the component lifecycle when the initialization of the component is completed and the component is mounted on the DOM and rendered for the first time on the webpage. he mounting phase consists of two such predefined functions as described below componentWillMount() Function: This function is invoked right before the component is mounted on the DOM.componentDidMount() Function: This function is invoked right after the component is mounted on the DOM.";
    } else if (message.includes("what is the use of ref in React".toLowerCase())) {
      speech.text =
        "Refs are a function provided by React to access the DOM element and the React element that you might have created on your own. They are used in cases where we want to change the value of a child component, without making use of props and all. They have wide functionality as we can use callbacks with them.";
    } else if (message.includes("what are hooks in React".toLowerCase())) {
      speech.text =
        " Hooks are a new addition in React 16.8. They let developers use state and other React features without writing a class. Hooks doesn’t violate any existing React concepts. Instead, Hooks provide a direct API to react concepts such as props, state, context, refs and life-cycle";
    } else if (message.includes("explain the useState hook in React".toLowerCase())) {
      speech.text =
        "The most used hook in React is the useState() hook. It allows functional components to manipulate DOM elements before each render. Using this hook we can declare a state variable inside a function but only one state variable can be declared using a single useState() hook. Whenever the useState() hook is used, the value of the state variable is changed and the new variable is stored in a new cell in the stack.";
    } else if (message.includes("explain the useEffect hook in react".toLowerCase())) {
      speech.text =
        "The useEffect hook in React eliminates the side effect of using class based components. It is used as an alternative to componentDidUpdate() method. The useEffect hook accepts two arguments where second argument is optional.useEffect(function, dependency)";
    } else if (message.includes("what is React Fragments".toLowerCase())) {
      speech.text =
        "when we are trying to render more than one root element we have to put the entire content inside the ‘div’ tag which is not loved by many developers. So since React 16.2 version, Fragments were introduced, and we use them instead of the extraneous ‘div’ tag. The following syntax is used to create fragment in react.<React.Fragment>  <h2>Child-1</h2><p> Child-2</p></React.Fragment>";
    } else if (message.includes("what is a react developer tool".toLowerCase())) {
      speech.text =
        "React Developer Tools is a Chrome DevTools extension for the React JavaScript library. A very useful tool, if you are working on React.js applications. This extension adds React debugging tools to the Chrome Developer Tools. It helps you to inspect and edit the React component tree that builds the page, and for each component, one can check the props, the state, hooks, etc. ";
    } else if (message.includes("what is prop drilling and its disadvantages".toLowerCase())) {
      speech.text =
        "Prop drilling is basically a situation when the same data is being sent at almost every level due to requirements in the final level. The problem with Prop Drilling is that whenever data from the Parent component will be needed, it would have to come from each level, Regardless of the fact that it is not needed there and simply needed in last.";
    } else if (message.includes("how to optimize a React code".toLowerCase())) {
      speech.text = "We can improve our react code by following these practices:Using binding functions in constructorsEliminating the use of inline attributes as they slow the process of loading Avoiding extra tags by using React fragments Lazy loading";
    }  else if (message.includes("explain provider and consumer in ContextAPI".toLowerCase())) {
      speech.text = "A provider is used to provide context to the whole application whereas a consumer consume the context provided by nearest provider. In other words The Provider acts as a parent it passes the state to its children whereas the Consumer uses the state that has been passed. ";
    } else if (message.includes("what is axios and how to use it in React".toLowerCase())) {
      speech.text = "Axios, which is a popular library is mainly used to send asynchronous HTTP requests to REST endpoints. This library is very useful to perform CRUD operations.This popular library is used to communicate with the backend. Axios supports the Promise API, native to JS ES6.Using Axios we make API requests in our application. Once the request is made we get the data in Return, and then we use this data in our project.To install aixos package in react use the following command.npm i axios";
    } else if (message.includes("what is React-Material UI".toLowerCase())) {
      speech.text = "React Material UI is a framework leveraging React library, offering prebuilt components for creating React applications. Developed by Google in 2014, it’s compatible with JavaScript frameworks like Angular.js and Vue.js. Renowned for its quality designs and easy customization, it’s favored by developers for rapid development.";
    } else if (message.includes("what are the two types of React components".toLowerCase())) {
      speech.text = "The two types of React components are class components and functional components.Class components: These are ES6 classes that extend the React.Component class. They have a render() method where you define what should be rendered to the DOM. Class components can manage their own state using setState() and have access to lifecycle methods such as componentDidMount() and componentDidUpdate().2.Functional components: These are simple JavaScript functions that return JSX (a syntax extension for JavaScript used with React). They are also known as stateless functional components or just functional components.";
    } else if (message.includes("what is the purpose of the setState() method".toLowerCase())) {
      speech.text = "The setState() method in React is used to update the state of a component, triggering a re-render with the updated state. It manages state changes asynchronously that allows React to batch multiple updates for performance optimization. When calling setState(), React merges the provided state updates with the current state, updating only the specified properties.";
    } else if (message.includes("open google".toLowerCase())) {
      window.open("https://google.com", "_blank");
      speech.text = "Opening Google";
    }else {
      
      speech.text = "Your Doubt is not related to topic please ask another doubt";
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  };

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    } else {
      alert("SpeechRecognition is not supported in this browser.");
    }
  };

  return (
    <section className="main">
      <h1 style={{ color: "antiquewhite" }}>Doubt session by Team Berserk</h1>
      <div className="image-container">
        <div className="image">
          <img src="/gg.gif" alt="Virtual Teacher" />
        </div>
        <h1>Virtual Teacher</h1>
        <p>I'm Your Virtual Teacher.</p>
      </div>
      <div className="input">
        <button className="talk" onClick={startRecognition}>
          <img src="8725978_microphone_icon.png"></img>
        </button>
      </div>
      <div className="back">
        <button
          onClick={returnToHandTrack}
          className="bx--btn bx--btn--primary m-3"
          type="button"
        >
          Return to Session
        </button>
      </div>
    </section>
  );
};

export default Doubt;
