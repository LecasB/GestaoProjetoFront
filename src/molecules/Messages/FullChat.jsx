import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./FullChat.scss";
import { IoIosSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import io from "socket.io-client";

const FullChat = ({ user, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null); // 🔽 referência para scroll

  // 🔌 Conexão com Socket.IO
  useEffect(() => {
    const socketInstance = io("http://localhost:3002");
    setSocket(socketInstance);

    socketInstance.on("newMessage", (incomingMessage) => {
      const isRelevant =
        (incomingMessage.idsender === otherUser &&
          incomingMessage.idreceiver === user) ||
        (incomingMessage.idsender === user &&
          incomingMessage.idreceiver === otherUser);

      if (isRelevant) {
        setMessages((prev) => [...prev, incomingMessage]);
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user, otherUser]);

  // 🔁 Atualiza mensagens ao mudar o destinatário
  useEffect(() => {
    if (otherUser) {
      getMessages();
    }
  }, [otherUser]);

  // 🧼 Faz scroll automático após mensagens serem renderizadas
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://xuoapi.vercel.app/api/v1/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idsender: otherUser,
          idreceiver: user,
        }),
      });

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const payload = {
      idsender: user,
      idreceiver: otherUser,
      date: new Date().toISOString(),
      message: newMessage,
    };

    try {
      await fetch("https://xuoapi.vercel.app/api/v1/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (socket) {
        socket.emit("sendMessage", payload);
      }

      setNewMessage("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <div className="chat-container">
      {!otherUser && <p>Select a user to show the messages</p>}
      {otherUser && loading && <div className="loader"></div>}
      {otherUser && !loading && (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.idsender === user ? "me" : "other"}`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* 🔚 Scroll target */}
          </div>

          <div className="input-area">
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              cleanOnEnter
              onEnter={() => {}}
              placeholder="Type a message"
            />
            <button className="btn-submit" onClick={handleSend}>
              Enviar <IoIosSend />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FullChat;
