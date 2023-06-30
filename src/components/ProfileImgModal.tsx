import { useState, useEffect } from "react";
import { ChatForm } from "../models/chatform";
import "../styles/ProfileImgModal.css";

export default function ProfileImgModal({
  setIsOpen,
  data,
}: {
  setIsOpen: any;
  data: ChatForm[];
}) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const getImg = () => {
    let maker = data.filter((el) => el.user_id === 2);
    setPhotoUrl((cur: string) => maker[0]?.photo_url);
  };

  useEffect(getImg, [data]);

  return (
    <>
      <div
        className="modal_container"
        onClick={() => setIsOpen((cur: boolean) => !cur)}
      >
        <img src={photoUrl} alt="주선자" className="modal_img" />
      </div>
    </>
  );
}
