import React, { useRef, useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import Purchases from "./Purchases";
import { useNavigate } from "react-router-dom";
import Sales from "./Sales";

export default function SalesHistory() {
  const [activeTab, setActiveTab] = useState("Purchases");
  const [textWidths, setTextWidths] = useState({});
  const textRefs = useRef({});

  const navigate = useNavigate();
  const tabs = [
    { key: "Purchases", label: "구매내역" },
    { key: "Sales", label: "판매내역" },
  ];

  useEffect(() => {
    const newWidths = {};
    tabs.forEach((tab) => {
      if (textRefs.current[tab.key]) {
        newWidths[tab.key] = textRefs.current[tab.key].offsetWidth;
      }
    });
    setTextWidths(newWidths);
  }, []);

  return (
    <div className="pt-12 h-screen overflow-y-auto">
      <div className="flex items-center px-6 ">
        <IoChevronBack
          size={26}
          onClick={() => navigate(-1)}
          className="cursor-pointer text-black z-20"
        />

        <div className="flex items-center ml-4">
          <p className="fontBold">거래내역</p>
          <IoDocumentTextOutline size={18} className="ml-1" />
        </div>

        <div className="w-6"></div>
      </div>
      <div className="w-full h-[0.5px] bg-[#c4c4c4] mt-4"></div>

      {/* 탭 */}
      <div className="flex justify-center space-x-4 mt-6">
        {tabs.map((tab) => (
          <div key={tab.key} onClick={() => setActiveTab(tab.key)}>
            <div className="flex-col w-full">
              <p
                ref={(el) => (textRefs.current[tab.key] = el)}
                className={activeTab === tab.key ? "fontBold" : ""}
              >
                {tab.label}
              </p>
              {activeTab === tab.key && (
                <div
                  className="h-1.5 bg-[#557BB4] rounded-full transition-all"
                  style={{ width: textWidths[tab.key] }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 내용 */}
      <div className="px-6 mt-2 overflow-y-auto">
        {activeTab === "Purchases" ? <Purchases /> : <Sales />}
      </div>
    </div>
  );
}
