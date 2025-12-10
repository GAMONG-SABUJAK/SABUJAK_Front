import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";

export default function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}user/login`, {
        loginId,
        password,
      });

      console.log("로그인성공: ", response.data);
      const token =
        response.data.accessToken || response.data.token || response.data.jwt;
      if (!token) {
        console.error("응답 구조:", response.data);
        alert("응답에 JWT 토큰이 없습니다. 응답 구조를 확인해주세요.");
        return;
      }

      localStorage.setItem("accessToken", token);
      console.log("저장된 토큰:", token); // 토큰 확인
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#7D9FD1]">
      <div className="flex flex-col items-center justify-center h-[40%]">
        <img src="/assets/images/Robo/Logo.png" className="w-80" alt="" />
        <div className="text-[#fff] flex flex-col items-center mt-[-50px]">
          <p className="fontPLBlack text-[36px]">사 부 작</p>
          <p>사장님을 부지런히 도와요!</p>
        </div>
      </div>
      <div className="bg-[#f9f9f9] h-[60%] absolute w-full bottom-0 rounded-t-4xl py-20 px-8 flex flex-col items-center">
        {/* 입력란 */}
        <div className="w-[80%]">
          <div className="space-y-4 ">
            <input
              type="text"
              className="border-[#c4c4c4] border-[0.1px] w-full rounded-full shadow-md py-1.5 px-5 text-[#c4c4c4] fontLight"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              className="border-[#c4c4c4] border-[0.1px] w-full rounded-full shadow-md py-1.5 px-5 text-[#c4c4c4] fontLight"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex space-x-2 justify-end">
              <div
                onClick={() => navigate("/signup")}
                className="bg-[#7D9FD1] w-fit px-4 py-1.5 rounded-full shadow-md text-white fontMedium text-[14px]"
              >
                회원가입
              </div>
              <div
                onClick={handleLogin}
                className="bg-[#7D9FD1] w-fit px-4 py-1.5 rounded-full shadow-md text-white fontMedium text-[14px]"
              >
                로그인
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center h-full">
          <p className="text-right text-[10px] fontLight mt-8">
            <span className="fontPLMedium text-[18px]">사부작</span> 은 사장님의
            매출, 재고, 홍보를
            <br />
            <br />
            <span className="fontPLMedium text-[18px]">'사부작'</span> 챙겨주는
            AI 도우미입니다.
          </p>
          <img
            src="/assets/images/Robo/Robo.png"
            alt=""
            className="scale-x-[-1] mr-[-13px]"
          />
        </div>
      </div>
    </div>
  );
}
