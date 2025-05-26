import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import CardsList from "../../molecules/CardsList/CardsList";
import { useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userDetails, setUserDetails] = useState("");
  const [numberItems, setNumberItems] = useState(0);

  const handleNumberItems = async (id) => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/items/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNumberItems(data.length);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  const getUserInfo = async (id = sessionStorage.getItem("id")) => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
        handleNumberItems(data._id);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  useEffect(() => {
    id ? getUserInfo(id) : getUserInfo();
  }, []);

  return (
    <div>
      <div className="cmp-profile-page">
        <div className="cmp-profile-page__avatar">
          <img
            className="cmp-profile-page__avatar--image"
            src={userDetails.image}
          />
        </div>
        <div className="cmp-profile-page__info">
          <div className="cmp-profile-page__info__top">
            <div className="cmp-profile-page__info__top__userNstars">
              <h1>@{userDetails.username}</h1>
              <p>Stars</p>
            </div>

            <div>
              <span>
                Edit &nbsp;
                <FaPencilAlt />
              </span>
            </div>
          </div>

          <div className="cmp-profile-page__info__middle">
            <p>Followers: 5</p>
            <p>Following: 4</p>
            <p>Items: {numberItems}</p>
          </div>

          <p className="cmp-profile-page__info__description">
            Description: {userDetails.descricao}
          </p>
        </div>
      </div>
      <hr />
      <div className="cmp-profile-page__items">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            padding: "0px 20px",
            maxWidth: "1278px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ padding: "0px 0px 0px 20px" }}>Items</h1>
          <p>Heres button Filter</p>
        </div>
        <CardsList id={userDetails._id} />
      </div>
    </div>
  );
};

export default ProfilePage;
