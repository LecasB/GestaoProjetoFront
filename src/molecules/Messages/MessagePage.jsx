import { useEffect, useState } from "react";
import FullChat from "./FullChat";
import UserList from "./UserList";

const MessagePage = () => {
  const user = sessionStorage.getItem("id");

  const [userList, setUserList] = useState([]);
  const [selectUser, setSelectUser] = useState(null);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    try {
      const res = await fetch(
        "https://xuoapi.azurewebsites.net/api/v1/getUserConversations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user }),
        }
      );

      const data = await res.json();
      setUserList(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (id) => {
    setSelectUser(id);
  };

  return (
    <div className="messagePage" style={{ display: "flex", height: "100vh" }}>
      <UserList list={userList} handleClick={handleClick} />

      {selectUser ? (
        <FullChat user={user} otherUser={selectUser} />
      ) : (
        <div
          style={{
            flex: 1,
            backgroundColor: "#232323",
            color: "#A59C9C",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <img
            src="/imgs/xuo.png"
            alt="XUO Logo"
            style={{ width: "150px", marginBottom: "2rem" }}
          />
          <h2 style={{ color: "white" }}>Bem-vindo ao chat</h2>
          <p>Clique num utilizador à esquerda para começar a conversa.</p>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
