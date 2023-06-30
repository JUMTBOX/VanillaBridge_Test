import { useEffect, useRef } from "react";
import { ChatForm } from "../models/chatform";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/ChatLog.css";

export default function ChatLog({
  data,
  setIsOpen,
  url,
}: {
  data: ChatForm[];
  setIsOpen: any;
  url: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  let prevDay: number[] = [];

  //채팅 추가시 스크롤 자동 다운
  const handleScroll = () => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
  };
  //스크롤 탑
  const handleScrollTop = () => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //채팅 시간
  const chatTime = (item: ChatForm) => {
    let hours = item.created_at.getHours();
    let minutes = item.created_at.getMinutes();
    if (hours > 12 && hours < 24) {
      if (minutes >= 10) {
        return `오후 ${hours - 12} : ${minutes}`;
      } else {
        return `오후 ${hours - 12} : 0${minutes}`;
      }
    } else {
      if (minutes >= 10) {
        return `오전 ${hours} : ${minutes}`;
      } else {
        return `오전 ${hours} : 0${minutes}`;
      }
    }
  };
  const makePrevDay = (item: ChatForm) => {
    prevDay.push(item.created_at.getDate());
    return null;
  };

  const chatDay = (item: ChatForm, prevDay: number) => {
    let year = item.created_at.getFullYear();
    let month = item.created_at.getMonth() + 1;
    let day = item.created_at.getDate();
    if (prevDay !== day)
      return (
        <div className="day_box">
          <div className="day">{`${year}년 ${month}월 ${day}일`}</div>
        </div>
      );
  };

  useEffect(() => {
    handleScroll();
  }, [data]);

  return (
    <>
      <div className="chatLog_container" ref={containerRef}>
        {data.map((item, idx) => {
          return (
            <div key={idx}>
              {makePrevDay(item)}
              {chatDay(item, prevDay[prevDay.length - 2])}
              {item.user_id === 1 ? (
                <div className="user_chat_container">
                  <span className="user_chat_time">{chatTime(item)}</span>
                  <div className="user_chat">{item?.msg?.content}</div>
                </div>
              ) : (
                <div className="maker_chat_wrapper">
                  <div className="maker_img_container">
                    <span
                      className="maker_img_box"
                      onClick={() => setIsOpen((cur: boolean) => !cur)}
                    >
                      <img src={url} alt="" loading="eager" />
                    </span>
                    <span className="maker_name_box">{item.user_name}</span>
                  </div>
                  <div className="maker_chat_container">
                    <div className="maker_chat">
                      {item?.msg?.content || "사진"}
                    </div>
                    <span className="maker_chat_time">{chatTime(item)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="scrollTop_btn" onClick={handleScrollTop}>
          <ArrowBackIcon />
        </div>
      </div>
    </>
  );
}
