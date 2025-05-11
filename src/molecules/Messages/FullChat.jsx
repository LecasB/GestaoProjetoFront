import { useEffect, useState } from "react";
import "./FullChat.scss";
import { IoIosSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";

const FullChat = ({ user, otherUser }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (otherUser) {
      getMessages();
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
      setMessage(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      setMessage([]);
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

    await fetch("https://xuoapi.vercel.app/api/v1/newMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setNewMessage(""); // Limpa input
        getMessages(); // Atualiza mensagens
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="chat-container">
        {!otherUser && <p>Select a user to show the messages</p>}
        {otherUser && loading && <div className="loader"></div>}
        {otherUser && !loading && (
          <>
            <div className="messages">
              {message.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.idsender === user ? "me" : "other"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
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
                Enviar <IoIosSend />{" "}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FullChat;
