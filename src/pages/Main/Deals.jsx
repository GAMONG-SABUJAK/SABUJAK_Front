import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { deals } from "../../data/deals";

export default function Deals() {
  const navigate = useNavigate();
  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };

  return (
    <div className="mt-12">
      {/* title */}
      <div>
        <div className="flex items-center justify-between">
          <div className="fontEB text-[20px] text-[#365482]">
            근처 재고 거래
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="fontLight text-[14px]">
            내 가게와 같은 업종의 가게를 보여드려요
          </div>
        </div>
      </div>

      {/* card */}
      <div className="mt-4 overflow-x-auto ">
        <div className="flex space-x-4 h-[210px]">
          {deals.map((item) => (
            <div
              key={item.id}
              className="p-3 min-w-[160px] border border-[#c4c4c4] border-[0.1px] rounded-lg"
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
