"use client";
import React, { useEffect, useState } from "react";
import scss from "./WebSocketComponent.module.scss";

interface Message {
  event: string;
  username: string;
  photo: string;
  message: string;
}

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const initializeWebSocket = () => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_API_URL!);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      try {
        const receivedMessage: Message[] = JSON.parse(event.data);
        setMessages(receivedMessage);
      } catch (error) {
        console.error("Failed to parse message: ", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed, retrying...");
      setTimeout(initializeWebSocket, 500);
    };

    setSocket(ws);
  };

  useEffect(() => {
    initializeWebSocket();
  }, []);

  const sendMessage = () => {
    if (!inputMessage) return alert("Поле ввода пустой!");
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message: Message = {
        event: "message",
        username: "Elcho911", // Ваше имя пользователя
        photo:
          "https://elcho.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Felcho911.eabc74a3.png&w=640&q=75",
        message: inputMessage,
      };
      socket.send(JSON.stringify(message));
      setInputMessage("");
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return (
    <div className={scss.WebSocketComponent}>
      <div className="container">
        <div className={scss.content}>
          <h1>WebSocket Chat Elkhan</h1>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter your message"
            className={scss.inputField}
          />
          <button onClick={sendMessage} className={scss.sendButton}>
            Send
          </button>

          <div className={scss.messagesContainer}>
            {messages
              .slice()
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.username === "Elcho911"
                      ? scss.myMessage
                      : scss.otherMessage
                  }
                >
                  <div className={scss.messageContent}>
                    <img
                      src={msg.photo}
                      alt="User"
                      className={scss.userPhoto}
                    />
                    <div>
                      <strong>{msg.username}: </strong>
                      <span>{msg.message}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
