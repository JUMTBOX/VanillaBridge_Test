import { useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/ChatLog.css";
export default function ChatLog({ data, setIsOpen, url, }) {
    const containerRef = useRef(null);
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
            return (<div className="day_box">
          <div className="day">{`${year}년 ${month}월 ${day}일`}</div>
        </div>);
    };
    useEffect(() => {
        handleScroll();
    }, [data]);
    return (<>
      <div className="chatLog_container" ref={containerRef}>
        {data.map((item, idx) => {
            var _a, _b;
            return (<div key={idx}>
              {makePrevDay(item)}
              {chatDay(item, prevDay[prevDay.length - 2])}
              {item.user_id === 1 ? (<div className="user_chat_container">
                  <span className="user_chat_time">{chatTime(item)}</span>
                  <div className="user_chat">{(_a = item === null || item === void 0 ? void 0 : item.msg) === null || _a === void 0 ? void 0 : _a.content}</div>
                </div>) : (<div className="maker_chat_wrapper">
                  <div className="maker_img_container">
                    <span className="maker_img_box" onClick={() => setIsOpen((cur) => !cur)}>
                      <img src={url} alt="" loading="eager"/>
                    </span>
                    <span className="maker_name_box">{item.user_name}</span>
                  </div>
                  <div className="maker_chat_container">
                    <div className="maker_chat">
                      {((_b = item === null || item === void 0 ? void 0 : item.msg) === null || _b === void 0 ? void 0 : _b.content) || "사진"}
                    </div>
                    <span className="maker_chat_time">{chatTime(item)}</span>
                  </div>
                </div>)}
            </div>);
        })}
        <div className="scrollTop_btn" onClick={handleScrollTop}>
          <ArrowBackIcon />
        </div>
      </div>
    </>);
}
