import { useState, useEffect } from "react";
import "../styles/ProfileImgModal.css";
export default function ProfileImgModal({ setIsOpen, data, }) {
    const [photoUrl, setPhotoUrl] = useState("");
    const getImg = () => {
        let maker = data.filter((el) => el.user_id === 2);
        setPhotoUrl((cur) => { var _a; return (_a = maker[0]) === null || _a === void 0 ? void 0 : _a.photo_url; });
    };
    useEffect(getImg, [data]);
    return (<>
      <div className="modal_container" onClick={() => setIsOpen((cur) => !cur)}>
        <img src={photoUrl} alt="주선자" className="modal_img"/>
      </div>
    </>);
}
