import React, { useState } from "react";
import { useChatbotLogic } from "./useChatbotLogic";
import "./chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    showAuthorization,
    currentQuestionIndex,
    showTextInput,
    questions,
    messagesEndRef,
    startChatbot,
    handleAuthorization,
    sendMessage,
  } = useChatbotLogic();

  const toggleChatbot = () => {
    setIsOpen((prev) => {
      if (!prev) {
        startChatbot();
      }
      return !prev;
    });
  };

  return (
    <div>
      {!isOpen && (
        <button id="chatbot-btn" onClick={toggleChatbot}>
          <img src="/icono_chat.png" alt="Chatbot Icon" />
        </button>
      )}

      <div id="chatbot" className={isOpen ? "visible" : ""}>
        <div id="chatbot-header">
          <h4>Chat</h4>
          <button className="close-btn" onClick={toggleChatbot}>
            x
          </button>
        </div>

        <div id="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}-message`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showAuthorization && (
          <div id="options">
            <button onClick={() => handleAuthorization("Sí")}>Sí</button>
            <button onClick={() => handleAuthorization("No")}>No</button>
          </div>
        )}

        {currentQuestionIndex !== null &&
          !showTextInput &&
          questions[currentQuestionIndex].options && (
            <div id="options">
              {questions[currentQuestionIndex].options.map((option) => (
                <button key={option} onClick={() => sendMessage(option)}>
                  {option}
                </button>
              ))}
            </div>
          )}

        {showTextInput && (
          <input
            id="input-box"
            type="number"
            placeholder="Escribe aquí..."
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMessage(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Chatbot;
