import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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
            />
            <input
              type="password"
              className="border-[#c4c4c4] border-[0.1px] w-full rounded-full shadow-md py-1.5 px-5 text-[#c4c4c4] fontLight"
              placeholder="비밀번호"
            />
            <div className="flex space-x-2 justify-end">
              <div
                onClick={() => navigate("/signup")}
                className="bg-[#7D9FD1] w-fit px-4 py-1.5 rounded-full shadow-md text-white fontMedium text-[14px]"
              >
                회원가입
              </div>
              <div
                onClick={() => navigate("/")}
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
