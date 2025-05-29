import "./UserList.scss";
import { IoIosArrowBack } from "react-icons/io";

const UserList = ({ list, handleClick }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="list">
      <div className="back-button" onClick={goBack}>
        <IoIosArrowBack size={20} />
        <span>Voltar</span>
      </div>

      {list.map((user, index) => (
        <div key={index} className="user" onClick={() => handleClick(user._id)}>
          <img src={user.image} alt="" />
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
