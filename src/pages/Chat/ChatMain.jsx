import React from "react";
import { useNavigate } from "react-router-dom";
import { deals } from "../../data/deals";

export default function ChatMain() {
  const chatList = deals.filter((d) => d.chat);
  const navigate = useNavigate();

  return (
    <div className="pt-12 h-screen overflow-y-auto">
      <div className="flex justify-between px-6">
        <p className="text-[20px] fontBold">채팅</p>
      </div>

      <div className="w-full h-[0.5px] bg-[#c4c4c4] mt-6"></div>

      <div className="">
        {chatList.map((chatItem, index) => (
          <div key={chatItem.chat.id}>
            {/* 채팅 카드 */}
            <div
              className="flex justify-between pt-6 pb-6 cursor-pointer px-6"
              onClick={() =>
                navigate(`/chat/${chatItem.id}`, { state: chatItem })
              }
            >
              <div className="flex">
                <div className="w-20 bg-[#557BB4] rounded-full overflow-hidden">
                  <img src={chatItem.chat.profile} alt="" />
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex">
                    <p className="fontBold">{chatItem.chat.name}</p>
                    <p className="fontLight text-[13px] flex items-end ml-3 text-[#878787]">
                      {chatItem.chat.region}
                    </p>
                  </div>
                  <p>{chatItem.chat.lastMessage}</p>
                  <p className="fontLight text-[13px] text-[#878787]">
                    {chatItem.chat.date}
                  </p>
                </div>
              </div>

              <img
                src={chatItem.img}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
            </div>

            {/* 구분선: 마지막 아이템 빼고 */}
            {index !== chatList.length - 1 && (
              <div className="w-full h-[0.8px] bg-[#d1d1d1]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
