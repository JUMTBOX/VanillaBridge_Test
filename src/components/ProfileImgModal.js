"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/ProfileImgModal.css");
function ProfileImgModal({ setIsOpen, data, }) {
    const [photoUrl, setPhotoUrl] = (0, react_1.useState)("");
    const getImg = () => {
        let maker = data.filter((el) => el.user_id === 2);
        setPhotoUrl((cur) => { var _a; return (_a = maker[0]) === null || _a === void 0 ? void 0 : _a.photo_url; });
    };
    (0, react_1.useEffect)(getImg, [data]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal_container", onClick: () => setIsOpen((cur) => !cur) }, { children: (0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "\uC8FC\uC120\uC790", className: "modal_img" }) })) }));
}
exports.default = ProfileImgModal;
