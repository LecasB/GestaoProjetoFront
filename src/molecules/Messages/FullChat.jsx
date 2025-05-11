import { useEffect, useState } from "react";
import "./FullChat.scss";

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
      {!otherUser && <p>Mete o caralho do user</p>}
      {otherUser && loading && <p>Loading...</p>}
      {otherUser && !loading && (
        <div className="chat-container">
          <div className="messages">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.idsender === user ? "me" : "other"}`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FullChat;
