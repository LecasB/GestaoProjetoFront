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
  const [otherUserData, setOtherUserData] = useState(null);
  const messagesEndRef = useRef(null);

  // Conexão com Socket.IO
  useEffect(() => {
    const socketInstance = io("https://xuosocket-production.up.railway.app/");
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

  useEffect(() => {
    if (otherUser) {
      getMessages();
      getUserInfo(otherUser);
    }
  }, [otherUser]);

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

  const getUserInfo = async (id) => {
    try {
      const res = await fetch(`https://xuoapi.azurewebsites.net/api/v1/user/${id}`);
      const data = await res.json();
      setOtherUserData(data);
    } catch (err) {
      console.error("Erro ao buscar dados do utilizador:", err);
      setOtherUserData(null);
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

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div
      className="chat-container"
      style={{ backgroundColor: loading ? "#232323" : "" }}
    >
      {!otherUser && <p>Select a user to show the messages</p>}
      {otherUser && loading && <div className="loader"></div>}
      {otherUser && !loading && (
        <>
          {otherUserData && (
            <div className="chat-header">
              <img
                src={otherUserData.image || "/default-user.png"}
                alt={otherUserData.username}
              />
              <span>{otherUserData.username || "Unknown User"}</span>
            </div>
          )}
  
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.idsender === user ? "me" : "other"}`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-area">
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              cleanOnEnter
              onEnter={handleSend}
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
