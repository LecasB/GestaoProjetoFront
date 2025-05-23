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
    <div className="messagePage" style={{ display: "flex" }}>
      <UserList list={userList} handleClick={handleClick} />
      <FullChat user={user} otherUser={selectUser} />
    </div>
  );
};

export default MessagePage;
