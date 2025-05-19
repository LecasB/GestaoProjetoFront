import "./ProfilePage.scss";

const ProfilePage = () => {
  return (
    <div className="cmp-profile-page">
      <img
        src="https://cdn.discordapp.com/attachments/1097462881773174814/1369794292217811055/image.png?ex=682aff98&is=6829ae18&hm=d919e03fc5041e397b07c539e5f877663c102f6ea3968608f7e3969e48d0165f&"
        className="cmp-profile-page__avatar"
      />
      <div className="cmp-profile-page__info">
        <div className="cmp-profile-page__info__top">
          <div className="cmp-profile-page__info__top__userNstars">
            <h1>@User Name</h1>
            <p>Stars</p>
          </div>
          <p>Edit</p>
        </div>

        <div className="cmp-profile-page__info__middle">
          <p>Followers:</p>
          <p>Following:</p>
          <p>Items:</p>
        </div>

        <p className="cmp-profile-page__info__description">Description:</p>
      </div>
    </div>
  );
};

export default ProfilePage;
