import react from "react";
import { useState } from "react";

const FileUpload = () => {
  const [photo, setPhoto] = useState("");

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setPhoto(reader.result.split(",")[1]);
    };
  };

  const handleUpload = async () => {
    fetch(
      `https://api.imgbb.com/1/upload?key=4bfa5b7a1289f21e23d4e44c2c8e68c9`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          image: photo,
          name: `${sessionStorage.getItem("id")}_avatar`,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPhoto("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="file-upload">
      <input type="file" id="file" onChange={handlePhoto} />
      <label htmlFor="file">Upload File</label>
      <button onClick={handleUpload}>Save</button>
    </div>

    //
  );
};

export default FileUpload;
