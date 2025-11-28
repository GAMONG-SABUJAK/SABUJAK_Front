import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GoHome, GoHomeFill } from "react-icons/go";
import {
  RiShoppingBagFill,
  RiShoppingBagLine,
  RiRobot2Fill,
  RiRobot2Line,
} from "react-icons/ri";

import {
  IoChatboxEllipses,
  IoChatboxEllipsesOutline,
  IoStorefrontOutline,
  IoStorefrontSharp,
} from "react-icons/io5";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const active = (path) => location.pathname === path;

  // 활성화/비활성화 탭 기본 스타일 + 애니메이션
  const tabClass = (path) =>
    `
    flex flex-col items-center cursor-pointer px-4
    transition-all duration-200 ease-out
    ${
      active(path)
        ? "text-[#365482] scale-110 translate-y-[-4px]"
        : "text-gray-400 scale-100 translate-y-0"
    }
  `;

  const labelClass = (path) =>
    `
    text-[11px] mt-[4px] transition-all duration-200
    ${
      active(path)
        ? "fontBold text-[#365482] opacity-100"
        : "fontLight text-gray-400 opacity-70"
    }
  `;

  return (
    <div className="absolute bottom-0 w-full h-[80px] bg-white border-t border-gray-200 flex justify-around items-center">
      {/* 홈 */}
      <div className={tabClass("/")} onClick={() => navigate("/")}>
        {active("/") ? <GoHomeFill size={26} /> : <GoHome size={26} />}
        <p className={labelClass("/")}>홈</p>
      </div>

      {/* 재고거래 */}
      <div className={tabClass("/deals")} onClick={() => navigate("/deals")}>
        {active("/deals") ? (
          <RiShoppingBagFill size={26} />
        ) : (
          <RiShoppingBagLine size={26} />
        )}
        <p className={labelClass("/deals")}>재고거래</p>
      </div>

      {/* ai 홍보글 */}
      <div className={tabClass("/write")} onClick={() => navigate("/write")}>
        {active("/write") ? (
          <RiRobot2Fill size={26} />
        ) : (
          <RiRobot2Line size={26} />
        )}
        <p className={labelClass("/write")}>ai홍보글</p>
      </div>

      {/* 채팅 */}
      <div className={tabClass("/chat")} onClick={() => navigate("/chat")}>
        {active("/chat") ? (
          <IoChatboxEllipses size={26} />
        ) : (
          <IoChatboxEllipsesOutline size={26} />
        )}
        <p className={labelClass("/chat")}>채팅</p>
      </div>

      {/* 내 가게 */}
      <div className={tabClass("/store")} onClick={() => navigate("/store")}>
        {active("/store") ? (
          <IoStorefrontSharp size={26} />
        ) : (
          <IoStorefrontOutline size={26} />
        )}
        <p className={labelClass("/store")}>내 가게</p>
      </div>
    </div>
  );
}
