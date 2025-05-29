import "./ProfilePage.scss";
import { useEffect, useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import CardsList from "../../molecules/CardsList/CardsList";
import { useSearchParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import FilterButton from "../../atoms/FilterButton/FilterButton";
import { Button } from "primereact/button";
import PopupUserInfo from "../../molecules/PopupUserInfo/PopupUserInfo";

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userDetails, setUserDetails] = useState("");
  const [numberItems, setNumberItems] = useState(0);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userRate, setUserRate] = useState(0);
  const [filterValue, setFilterValue] = useState("All Items");
  const [info, setInfo] = useState("followers");
  const [showPopupUser, setShowPopupUser] = useState(false);
  const [follow, setFollow] = useState("");
  const [following, setFollowing] = useState("");
  const [isFollowing, setIsFollowing] = useState("");

  const fileUploadRef = useRef(null);

  const updateProfile = async () => {
    try {
      if (username != userDetails.username) {
        const checkResponse = await fetch(
          `https://xuoapi.azurewebsites.net/api/v1/user/usernameAvailable`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
            }),
          }
        );
        const checkData = await checkResponse.json();

        if (!checkData.available) {
          alert("O nome de utilizador já está em uso.");
          return;
        }
      }

      const updateResponse = await fetch(
        `https://xuoapi.azurewebsites.net/api/v1/user/updateInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: sessionStorage.getItem("id"),
            username: username,
            descricao: description,
          }),
        }
      );

      const updateData = await updateResponse.json();
      console.log("Dados atualizados:", updateData);

      if (imageSrc) {
        const formData = new FormData();
        formData.append("id", sessionStorage.getItem("id"));
        formData.append("photo", imageFile);

        const imageResponse = await fetch(
          `https://xuoapi.azurewebsites.net/api/v1/user/updateImage`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await imageResponse.json();
        console.log("Imagem atualizada:", imageData);
      }

      setVisible(false);
      getUserInfo();
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Erro ao atualizar o perfil.");
    }
  };

  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    setImageFile(file);
    const reader = new FileReader();

    const blob = await fetch(file.objectURL).then((r) => r.blob());
    reader.readAsDataURL(blob);
    console.log("FileReader started");

    reader.onloadend = function () {
      const base64data = reader.result;
      setImageSrc(base64data);
      setImageName(file.name);
      fileUploadRef.current.clear();
    };
  };
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

  const getFollowInfo = async (id = sessionStorage.getItem("id")) => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/follow/status/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFollow(data.followers);
        setFollowing(data.following);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  const handleVerifyFollow = async (id) => {
    try {
      const response = await fetch(
        `https://xuoapi.azurewebsites.net/api/v1/follow/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idfollower: sessionStorage.getItem("id"),
            idfollowed: id,
          }),
        }
      );

      const data = await response.json();

      setIsFollowing(data.isFollowing);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const getUserInfo = async (id = sessionStorage.getItem("id")) => {
    await fetch(`https://xuoapi.azurewebsites.net/api/v1/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
        setUsername(data.username);
        setDescription(data.descricao);
        setImageSrc(data.image);
        handleNumberItems(data._id);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  const getUserRate = () => {
    fetch(
      `https://xuoapi.azurewebsites.net/api/v1/review/${userDetails._id}/rate`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User rate data:", data);
        setUserRate(data);
      })
      .catch((error) => {
        console.error("Error fetching user rate:", error);
      });
  };

  const handleClose = () => {
    setShowPopupUser(false);
  };

  const changeFollowState = async (state) => {
    const endpoint =
      state === "follow"
        ? "https://xuoapi.azurewebsites.net/api/v1/follow/new"
        : "https://xuoapi.azurewebsites.net/api/v1/follow/delete";

    // Define o método conforme o estado
    const method = state === "follow" ? "POST" : "DELETE";

    try {
      const response = await fetch(endpoint, {
        method: method, // ou apenas `method,` ES6 shorthand
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idfollower: sessionStorage.getItem("id"),
          idfollowed: userDetails._id,
        }),
      });

      const data = await response.json();
      console.log("Follow response:", data);

      // Atualizar estado com base na ação
      setIsFollowing(state === "follow");
    } catch (error) {
      console.error("Erro ao alterar o estado de follow:", error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (userRate.averageRate >= i + 1) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "20px" }}
            src="https://xuobucket.blob.core.windows.net/utils/estrelita.png"
          />
        );
      } else if (userRate.averageRate > i) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "12px" }}
            src="https://xuobucket.blob.core.windows.net/utils/meia-estrelita.png"
          />
        );
      } else {
        <img
          key={i}
          style={{ height: "20px", width: "12px" }}
          src="https://xuobucket.blob.core.windows.net/utils/meia-estrelita.png"
        />;
      }
    }
    return stars;
  };

  useEffect(() => {
    id ? getUserInfo(id) : getUserInfo();
    id ? getFollowInfo(id) : getFollowInfo();
    handleVerifyFollow(id);
  }, []);

  useEffect(() => {
    getUserRate();
  }, [userDetails]);

  return (
    <div>
      {showPopupUser && (
        <PopupUserInfo info={info} id={userDetails._id} close={handleClose} />
      )}
      <Dialog
        ola="aaa"
        header="Editar Perfil"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <InputText
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputTextarea
          maxLength={100}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          cols={30}
        />

        <FileUpload
          ref={fileUploadRef}
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          chooseLabel="Select Image"
          auto
          customUpload
          uploadHandler={customBase64Uploader}
        />
        <img
          src={imageSrc}
          alt="Uploaded Preview"
          style={{ maxWidth: "150px", marginTop: "20px" }}
        />
        <p>{imageName}</p>
        <button onClick={() => updateProfile()}>Save Changes</button>
      </Dialog>
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
              <p
                style={{
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {`(${userRate.averageRate})`}
                <span style={{ paddingLeft: "5px" }}>{renderStars()}</span>
                <span
                  onClick={() => {
                    setInfo("reviews");
                    setShowPopupUser(!showPopupUser);
                  }}
                  style={{ fontSize: "14px" }}
                >
                  ({userRate.totalReviews}) Reviews
                </span>
              </p>
            </div>
            {userDetails._id === sessionStorage.getItem("id") ? (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setVisible(true)}
              >
                <span>
                  Edit &nbsp;
                  <FaPencilAlt />
                </span>
              </div>
            ) : (
              <div>
                {isFollowing ? (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid #06b6d4",
                      color: "#06b6d4",
                    }}
                    onClick={() => {
                      changeFollowState("unfollow");
                    }}
                    label="Unfollow"
                  ></Button>
                ) : (
                  <Button
                    onClick={() => {
                      changeFollowState("follow");
                    }}
                    label="Follow"
                  ></Button>
                )}
              </div>
            )}
          </div>

          <div className="cmp-profile-page__info__middle">
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setInfo("following"), setShowPopupUser(!showPopupUser);
              }}
            >
              Following: {following.length}
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setInfo("followers"), setShowPopupUser(!showPopupUser);
              }}
            >
              Followers: {follow.length}
            </p>
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
          {userDetails._id == sessionStorage.getItem("id") && (
            <FilterButton onSelect={setFilterValue} />
          )}
        </div>
        <CardsList id={userDetails._id} itemType={filterValue} />
      </div>
    </div>
  );
};

export default ProfilePage;
