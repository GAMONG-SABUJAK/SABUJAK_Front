import React from "react";
import { deals } from "../../../data/deals";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

export default function Purchases() {
  const navigate = useNavigate();

  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };
  return (
    <div>
      {deals.map((item) => (
        <div key={item.id} onClick={() => navigate(`/deals/${item.id}`)}>
          <div className="flex py-4">
            <img
              src={item.img}
              alt=""
              className="aspect-square object-cover w-30 rounded-lg"
            />

            <div className="ml-3 w-full">
              <p className="text-end">{item.time}</p>

              <div className="space-y-2">
                {/* 태그 + 제목 */}
                <div className="flex space-x-2 items-center">
                  <div
                    className={`px-2 py-0.5 text-[11px] rounded-sm shadow-sm fontRegular ${
                      tagStyles[item.tag]
                    }`}
                  >
                    #{item.tag}
                  </div>
                  <p className="fontMedium text-[14px]">{item.title}</p>
                </div>

                {/* 가격 */}
                <p className="fontEB text-[18px] text-[#4A70A9]">
                  {item.price}
                </p>

                {/* 위치 */}
                <div className="flex items-center text-[#474747]">
                  <FiMapPin size={12} />
                  <p className="ml-2 text-[12px] fontBold">{item.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#c4c4c4]"></div>
        </div>
      ))}
    </div>
  );
}
