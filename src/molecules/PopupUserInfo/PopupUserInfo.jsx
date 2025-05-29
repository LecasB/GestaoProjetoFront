import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

const PopupUserInfo = ({ info, id, close }) => {
  const [data, setData] = useState(null);
  const [infor, setInfor] = useState(info);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      try {
        let url = "";

        if (infor === "followers" || infor === "following") {
          url = `https://xuoapi.azurewebsites.net/api/v1/follow/status/${id}`;
        } else if (infor === "reviews") {
          url = `https://xuoapi.azurewebsites.net/api/v1/review/${id}`;
        } else {
          url = `https://xuoapi.azurewebsites.net/api/v1/user/${id}/followers`;
        }

        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);

        const items = responseData[infor] || [];
        const details = {};

        for (const item of items) {
          const userId = typeof item === "string" ? item : item.idUser;

          const res = await fetch(
            `https://xuoapi.azurewebsites.net/api/v1/user/${userId}`
          );
          const userData = await res.json();
          details[userId] = userData;
        }

        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getInfo();
  }, [id, infor]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "20px" }}
            src="https://xuobucket.blob.core.windows.net/utils/estrelita.png"
            alt="full-star"
          />
        );
      } else if (rating > i) {
        stars.push(
          <img
            key={i}
            style={{ height: "20px", width: "12px" }}
            src="https://xuobucket.blob.core.windows.net/utils/meia-estrelita.png"
            alt="half-star"
          />
        );
      }
    }
    return stars;
  };

  return (
    <Dialog
      visible={true}
      modal={true}
      onHide={close}
      style={{ width: "50vw" }}
      header={infor}
      className="popup-user-info-dialog"
      closeOnEscape={true}
      dismissableMask={true}
    >
      <div className="popup-user-info">
        {(infor === "following" || infor === "followers") && (
          <div
            style={{ display: "flex", gap: "10px" }}
            className="pop-user-info__tabs"
          >
            <p
              className={infor === "followers" ? "active" : ""}
              onClick={() => setInfor("followers")}
            >
              Followers
            </p>
            <p
              className={infor === "following" ? "active" : ""}
              onClick={() => setInfor("following")}
            >
              Following
            </p>
          </div>
        )}

        <div className="pop-user-info__content">
          {data && data[infor]
            ? data[infor].map((item, index) => {
                const userId = typeof item === "string" ? item : item.idUser;
                const user = userDetails[userId];
                return (
                  <div key={index} className="pop-user-info__item">
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                        src={user?.image || "default-profile.png"}
                        alt="Profile"
                      />
                      <strong>{user?.username || "Unknown User"}</strong>
                    </div>
                    {infor === "reviews" && (
                      <>
                        <p>{renderStars(item.rate)}</p>
                        <p>{item.descricao}</p>
                      </>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </Dialog>
  );
};

export default PopupUserInfo;
