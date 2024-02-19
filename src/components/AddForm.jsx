import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { addLetter } from "../redux/modules/updateLetter";
import Button from "./common/Button";

function AddForm({ setActiveMember }) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [writedTo, setWritedTo] = useState("SOOBIN");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname || !content) {
      alert("닉네임과 내용을 모두 입력하세요.");
    } else {
      const currentDate = new Date();
      const newLetter = {
        createdAt: currentDate.toISOString(),
        nickname,
        content,
        writedTo,
        id: uuidv4(),
        avatar: "assets/user_icon.png",
      };
      dispatch(addLetter(newLetter));
      setNickname("");
      setContent("");
      setWritedTo("SOOBIN");

      setActiveMember(writedTo);
    }
  };
  return (
    <WriteBox>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
          <StyledInput
            type="text"
            placeholder="최대 20자 입력 가능"
            maxLength="20"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <label>받는 멤버</label>
          <StyledSelect
            value={writedTo}
            onChange={(e) => setWritedTo(e.target.value)}
          >
            <option value="SOOBIN">SOOBIN</option>
            <option value="YEONJUN">YEONJUN</option>
            <option value="BEOMGYU">BEOMGYU</option>
            <option value="TAEHYUN">TAEHYUN</option>
            <option value="HUENINGKAI">HUENINGKAI</option>
          </StyledSelect>
        </div>
        <div>
          <label>내용</label>
          <br />
          <StyledTextarea
            placeholder="최대 100자 작성 가능"
            maxLength="100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button text="✔️등록하기" />
      </form>
    </WriteBox>
  );
}

/** Styled-Componenets */
const WriteBox = styled.div`
  width: 650px;
  background-color: #e9f7ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-weight: bold;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 190px;
  padding: 5px;
  margin: 10px;
  margin-right: 65px;
  border: 1px solid grey;
  border-radius: 7px;
`;

const StyledSelect = styled.select`
  width: 190px;
  margin-left: 10px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 7px;
`;

const StyledTextarea = styled.textarea`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: 70px;
  border: 1px solid grey;
  border-radius: 7px;
  resize: none;
`;

export default AddForm;
