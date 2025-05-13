import "./UserList.scss";

const UserList = ({ list, handleClick }) => {
  return (
    <div className="list">
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
