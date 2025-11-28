import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deals } from "../../data/deals";
import { FiMapPin } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { GoHome, GoHomeFill } from "react-icons/go";

export default function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };

  const item = deals.find((deal) => deal.id === Number(id));

  if (!item) {
    return <div className="pt-12 px-6">존재하지 않는 거래입니다.</div>;
  }

  return (
    <div className="h-screen overflow-y-auto pb-28">
      {/* 상단 뒤로가기 */}
      <div className="fixed top-5 ml-5 mb-4">
        <div className="flex">
          <IoChevronBack
            size={26}
            onClick={() => navigate(-1)}
            className="cursor-pointer text-white"
          />
          <GoHomeFill
            size={26}
            onClick={() => navigate("/")}
            className="cursor-pointer ml-3 text-white"
          />
        </div>
      </div>

      {/* 상품 이미지 */}
      <img
        src={item.img}
        alt={item.title}
        className="w-full aspect-[4/3] object-cover"
      />

      <div className="px-6">
        {/* 태그 */}
        <div className="mt-4">
          <span
            className={`px-2 py-1 text-[12px] rounded-sm shadow fontRegular 
          ${
            item.tag === "나눔"
              ? "bg-[#E6ECF5] text-[#365482]"
              : item.tag === "구해요"
              ? "bg-[#FFF6D8] text-[#A88600]"
              : "bg-[#FFE5EA] text-[#B33A4B]"
          }`}
          >
            #{item.tag}
          </span>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BsBookmark size={28} />
            <div className="w-[1px] h-6 bg-black"></div>
            <p className="text-[24px] fontEB text-[#4A70A9]">{item.price}</p>
          </div>
          <div className="bg-white py-1 px-4 border-1 rounded-full border-[#4A70A9] fontMedium">
            채팅하기
          </div>
        </div>

        {/* 제목 + 가격 */}
        <div className="mt-10">
          <p className="text-[24px] fontBold">{item.title}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#474747] mt-1 space-x-2">
            <div className="flex items-center">
              <FiMapPin size={14} />
              <p className="ml-1 text-[14px] fontMedium">{item.location}</p>
            </div>
            <div className="w-[1px] h-3 bg-[#474747]"></div>
            <p className=" text-[14px] fontMedium">{item.time}</p>
          </div>

          <div className="flex space-x-3 justify-end">
            <div className="flex items-center">
              <IoChatboxEllipsesOutline />
              <p className="ml-1">{item.chat}</p>
            </div>
            <div className="flex items-center">
              <BsBookmark />
              <p className="ml-1">{item.bookmark}</p>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="mt-4 rounded-lg text-[16px] leading-5 text-[#3A3A3A] fontRegular">
          {item.ex}
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-[#c4c4c4] my-8"></div>

      <div className="mt-4 px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {deals.map((item) => (
            <div
              key={item.id}
              className="p-3 border border-[#c4c4c4] border-[0.1px] rounded-lg"
              onClick={() => navigate(`/deals/${item.id}`)}
            >
              <img
                src={item.img}
                className="aspect-[4/3] object-cover rounded-lg"
              />

              <div
                className={`px-2 py-0.5 text-[9px] w-fit mt-2 rounded-sm shadow-sm fontRegular ${
                  tagStyles[item.tag]
                }`}
              >
                #{item.tag}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[12px] fontMedium mt-1.5">{item.title}</p>
                <p className="text-[#909090] text-[8px]">{item.time}</p>
              </div>

              <p className="fontLight text-[7px] pb-1">{item.ex}</p>

              <div className="flex items-center mt-1">
                <FiMapPin size={11} />
                <div className="text-[8.5px] ml-1">{item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
