import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ChatForm } from "../models/chatform";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatLog from "./ChatLog";
import "../styles/Chat.css";
import ProfileImgModal from "./ProfileImgModal";

export default function Chat() {
  const [chatData, setChatData] = useState<ChatForm[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  //상대방 프로필 사진 경로 가져오기..
  const getImg = () => {
    let maker = chatData.filter((el) => el.user_id === 2);
    setUrl((cur: string) => maker[0]?.photo_url);
  };

  //대화 순서 정렬 함수
  const dateSorting = (data1: any, data2: any) => {
    if (data1.created_at.getTime() === data2.created_at.getTime()) {
      return data1.id - data2.id;
    } else {
      return data1.created_at.getTime() - data2.created_at.getTime();
    }
  };

  //대화 데이터 가공
  const servetest = async () => {
    try {
      const res = await axios.get("http://test.vanillabridge.com/test_data");
      if (res.status === 200) {
        let rawData = res.data;

        for (let el of rawData) {
          if (el.msg.mtype === "text") {
            let msg = el.msg.content;
            if (msg.includes("\\n"))
              el.msg.content = msg.split("\\n").toString().replaceAll(",", "");
          }

          if (el.user_id === 2) el.id = Number(String(el.id).slice(1, 3));
          el.created_at = new Date(el.created_at);
        }
        rawData.sort(dateSorting);

        setChatData((cur: ChatForm[]) => [...rawData]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //대화 텍스트 추가 함수
  const handleAddText = () => {
    let temp: ChatForm = {
      user_id: 1,
      user_name: "소개녀",
      photo_url: "",
      created_at: new Date(),
      msg: { mtype: "text", content: inputRef.current?.value },
    };
    if (inputRef.current !== null) {
      setChatData((cur: ChatForm[]) => [...cur, temp]);
      inputRef.current.value = "";
      setInputVal(inputRef.current.value);
    }
  };

  // 전송 버튼은 메시지의 length > 0일 때만 보이도록 구현
  const handleOnChangeInPut = () => {
    if (inputRef.current !== null) {
      setInputVal(inputRef.current.value);
    }
  };
  // 엔터 키 눌러서도  전송 가능
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddText();
  };

  useEffect(() => {
    servetest();
  }, []);
  useEffect(getImg, [chatData]);
  return (
    <div className="chat_container">
      <div className="chat_topbar">
        <span className="chat_topbar_backarrow">
          <ChevronLeftIcon />
        </span>
        <div className="chat_topbar_matchmaker">
          <span
            className="chat_topbar_matchmaker_img"
            onClick={() => setIsOpen((cur) => !cur)}
          >
            <img src={url} alt="주선자" />
          </span>
          <span className="chat_topbar_matchmaker_name">{"주선자"}</span>
        </div>
      </div>
      <div className="chat_content_box">
        <ChatLog data={chatData} setIsOpen={setIsOpen} url={url} />
      </div>
      <div className="chat_inputbar">
        <button className="chat_inputbar_addfile">+</button>
        <input
          type="text"
          placeholder="메시지를 입력해주세요"
          ref={inputRef}
          onChange={handleOnChangeInPut}
          onKeyDown={onKeyDown}
        />

        {inputVal.length > 0 ? (
          <span className="chat_inputbar_addchat" onClick={handleAddText}>
            <ArrowBackIcon />
          </span>
        ) : null}
      </div>
      {isOpen ? (
        <ProfileImgModal data={chatData} setIsOpen={setIsOpen} />
      ) : null}
    </div>
  );
}
