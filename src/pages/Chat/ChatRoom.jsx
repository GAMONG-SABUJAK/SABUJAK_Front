import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

export default function ChatRoom() {
  const { state: chatInfo } = useLocation();
  const navigate = useNavigate();

  if (!chatInfo) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="pt-12 h-screen flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center px-6 ">
        <IoChevronBack
          size={26}
          onClick={() => navigate(-1)}
          className="cursor-pointer text-black"
        />

        <div className="flex items-center ml-4">
          <p className="fontBold">{chatInfo.chat.name}</p>
        </div>

        <div className="w-6"></div>
      </div>

      <div className="w-full h-[0.5px] bg-[#c4c4c4] mt-4"></div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex">
          <img
            src="/assets/images/milk.png"
            alt=""
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-evenly ml-3">
            <div className="flex space-x-2 items-end">
              <p className="text-black fontBold ">{chatInfo.title}</p>
              <p className="fontLight text-[12px]">{chatInfo.location}</p>
            </div>
            <p className="fontBold text-[20px] text-[#4A70A9]">
              {chatInfo.price}
            </p>
          </div>
        </div>
        <div className="bg-[#4A70A9] w-fit px-3 py-1 rounded-full text-white text-[14px]">
          게시글 보러가기
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-[#c4c4c4]"></div>

      {/* 입력창 */}
      <div className="absolute bottom-[80px] w-full">
        <div className="p-4 flex space-x-2">
          <input
            className="flex-1 border-[0.1px] p-2 rounded-lg"
            placeholder={`"${chatInfo.chat.name}"에게 메시지 보내기`}
          />
          <button className="px-4 py-2 bg-[#557BB4] text-white rounded-lg">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
