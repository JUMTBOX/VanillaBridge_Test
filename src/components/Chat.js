"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const ArrowBack_1 = __importDefault(require("@mui/icons-material/ArrowBack"));
const ChatLog_1 = __importDefault(require("./ChatLog"));
require("../styles/Chat.css");
const ProfileImgModal_1 = __importDefault(require("./ProfileImgModal"));
function Chat() {
    const [chatData, setChatData] = (0, react_1.useState)([]);
    const [inputVal, setInputVal] = (0, react_1.useState)("");
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [url, setUrl] = (0, react_1.useState)("");
    const inputRef = (0, react_1.useRef)(null);
    const getImg = () => {
        let maker = chatData.filter((el) => el.user_id === 2);
        setUrl((cur) => { var _a; return (_a = maker[0]) === null || _a === void 0 ? void 0 : _a.photo_url; });
    };
    const dateSorting = (data1, data2) => {
        if (data1.created_at.getTime() === data2.created_at.getTime()) {
            return data1.id - data2.id;
        }
        else {
            return data1.created_at.getTime() - data2.created_at.getTime();
        }
    };
    const servetest = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get("http://test.vanillabridge.com/test_data");
            if (res.status === 200) {
                let rawData = res.data;
                for (let el of rawData) {
                    if (el.msg.mtype === "text") {
                        let msg = el.msg.content;
                        if (msg.includes("\\n"))
                            el.msg.content = msg.split("\\n").toString().replaceAll(",", "");
                    }
                    if (el.user_id === 2)
                        el.id = Number(String(el.id).slice(1, 3));
                    el.created_at = new Date(el.created_at);
                }
                rawData.sort(dateSorting);
                setChatData((cur) => [...cur, ...rawData]);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    const handleAddText = () => {
        var _a;
        let temp = {
            user_id: 1,
            user_name: "소개녀",
            photo_url: "",
            created_at: new Date(),
            msg: { mtype: "text", content: (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value },
        };
        if (inputRef.current !== null) {
            setChatData((cur) => [...cur, temp]);
            inputRef.current.value = "";
            setInputVal(inputRef.current.value);
        }
    };
    const handleOnChangeInPut = () => {
        if (inputRef.current !== null) {
            setInputVal(inputRef.current.value);
        }
    };
    const onKeyDown = (e) => {
        if (e.key === "Enter")
            handleAddText();
    };
    (0, react_1.useEffect)(() => {
        servetest();
    }, []);
    (0, react_1.useEffect)(getImg, [chatData]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat_container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat_topbar" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "chat_topbar_backarrow" }, { children: (0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {}) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat_topbar_matchmaker" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "chat_topbar_matchmaker_img", onClick: () => setIsOpen((cur) => !cur) }, { children: (0, jsx_runtime_1.jsx)("img", { src: url, alt: "\uC8FC\uC120\uC790" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "chat_topbar_matchmaker_name" }, { children: "주선자" }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "chat_content_box" }, { children: (0, jsx_runtime_1.jsx)(ChatLog_1.default, { data: chatData, setIsOpen: setIsOpen, url: url }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chat_inputbar" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "chat_inputbar_addfile" }, { children: "+" })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", ref: inputRef, onChange: handleOnChangeInPut, onKeyDown: onKeyDown }), inputVal.length > 0 ? ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: "chat_inputbar_addchat", onClick: handleAddText }, { children: (0, jsx_runtime_1.jsx)(ArrowBack_1.default, {}) }))) : null] })), isOpen ? ((0, jsx_runtime_1.jsx)(ProfileImgModal_1.default, { data: chatData, setIsOpen: setIsOpen })) : null] })));
}
exports.default = Chat;
