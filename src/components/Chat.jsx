var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatLog from "./ChatLog";
import "../styles/Chat.css";
import ProfileImgModal from "./ProfileImgModal";
export default function Chat() {
    const [chatData, setChatData] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState("");
    const inputRef = useRef(null);
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
            const res = yield axios.get("http://test.vanillabridge.com/test_data");
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
    useEffect(() => {
        servetest();
    }, []);
    useEffect(getImg, [chatData]);
    return (<div className="chat_container">
      <div className="chat_topbar">
        <span className="chat_topbar_backarrow">
          <ChevronLeftIcon />
        </span>
        <div className="chat_topbar_matchmaker">
          <span className="chat_topbar_matchmaker_img" onClick={() => setIsOpen((cur) => !cur)}>
            <img src={url} alt="주선자"/>
          </span>
          <span className="chat_topbar_matchmaker_name">{"주선자"}</span>
        </div>
      </div>
      <div className="chat_content_box">
        <ChatLog data={chatData} setIsOpen={setIsOpen} url={url}/>
      </div>
      <div className="chat_inputbar">
        <button className="chat_inputbar_addfile">+</button>
        <input type="text" placeholder="메시지를 입력해주세요" ref={inputRef} onChange={handleOnChangeInPut} onKeyDown={onKeyDown}/>

        {inputVal.length > 0 ? (<span className="chat_inputbar_addchat" onClick={handleAddText}>
            <ArrowBackIcon />
          </span>) : null}
      </div>
      {isOpen ? (<ProfileImgModal data={chatData} setIsOpen={setIsOpen}/>) : null}
    </div>);
}
