"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ArrowBack_1 = __importDefault(require("@mui/icons-material/ArrowBack"));
require("../styles/ChatLog.css");
function ChatLog({ data, setIsOpen, url, }) {
    const containerRef = (0, react_1.useRef)(null);
    let prevDay = [];
    const handleScroll = () => {
        var _a;
        if (containerRef.current !== null) {
            containerRef.current.scrollTop = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollHeight;
        }
    };
    const handleScrollTop = () => {
        if (containerRef.current !== null) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };
    const chatTime = (item) => {
        let hours = item.created_at.getHours();
        let minutes = item.created_at.getMinutes();
        if (hours > 12 && hours < 24) {
            if (minutes >= 10) {
                return `오후 ${hours - 12} : ${minutes}`;
            }
            else {
                return `오후 ${hours - 12} : 0${minutes}`;
            }
        }
        else {
            if (minutes >= 10) {
                return `오전 ${hours} : ${minutes}`;
            }
            else {
                return `오전 ${hours} : 0${minutes}`;
            }
        }
    };
    const makePrevDay = (item) => {
        prevDay.push(item.created_at.getDate());
        return null;
    };
    const chatDay = (item, prevDay) => {
        let year = item.created_at.getFullYear();
        let month = item.created_at.getMonth() + 1;
        let day = item.created_at.getDate();
        if (prevDay !== day)
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "day_box" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "day" }, { children: `${year}년 ${month}월 ${day}일` })) })));
    };
    (0, react_1.useEffect)(() => {
        handleScroll();
    }, [data]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chatLog_container", ref: containerRef }, { children: [data.map((item, idx) => {
                    var _a, _b;
                    return ((0, jsx_runtime_1.jsxs)("div", { children: [makePrevDay(item), chatDay(item, prevDay[prevDay.length - 2]), item.user_id === 1 ? ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "user_chat_container" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "user_chat_time" }, { children: chatTime(item) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "user_chat" }, { children: (_a = item === null || item === void 0 ? void 0 : item.msg) === null || _a === void 0 ? void 0 : _a.content }))] }))) : ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "maker_chat_wrapper" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "maker_img_container" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "maker_img_box", onClick: () => setIsOpen((cur) => !cur) }, { children: (0, jsx_runtime_1.jsx)("img", { src: url, alt: "", loading: "eager" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "maker_name_box" }, { children: item.user_name }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "maker_chat_container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "maker_chat" }, { children: ((_b = item === null || item === void 0 ? void 0 : item.msg) === null || _b === void 0 ? void 0 : _b.content) || "사진" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "maker_chat_time" }, { children: chatTime(item) }))] }))] })))] }, idx));
                }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "scrollTop_btn", onClick: handleScrollTop }, { children: (0, jsx_runtime_1.jsx)(ArrowBack_1.default, {}) }))] })) }));
}
exports.default = ChatLog;
