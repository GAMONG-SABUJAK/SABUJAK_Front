import React from "react";
import { FiMapPin } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";

// 오늘부터 7일간 날짜 + 랜덤 온도 + 매출예측 생성 함수
const generateWeeklyWeather = () => {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    result.push({
      date: `${month}.${day}`,
      min: Math.floor(Math.random() * 10) - 2, // -2 ~ 7도
      max: Math.floor(Math.random() * 10) + 5, // 5 ~ 14도
      sales: Math.floor(Math.random() * 60) - 10, // -10% ~ 50%
    });
  }

  return result;
};

export default function StoreMain() {
  const weeklyWeather = generateWeeklyWeather();

  return (
    <div className="pt-12 px-6">
      {/* profile */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <img
            src="/assets/images/Robo/Robo.png"
            alt=""
            className="w-16 bg-[#557BB4] rounded-full "
          />
          <div className="flex flex-col justify-center ml-3">
            <div className="flex items-center">
              <p className="fontBold text-[20px]">사부작</p>
              <p className="ml-2 text-[#6F6F6F]">#1234</p>
            </div>
            <div className="flex items-center text-[#6F6F6F]">
              <FiMapPin size={12} />
              <p className="ml-1 text-[14px]">메가커피 만안점</p>
            </div>
          </div>
        </div>
        <IoSettingsOutline size={28} />
      </div>

      {/* 거래내역 | 관심목록 */}
      <div className="flex justify-evenly mt-8">
        <div className="flex flex-col items-center">
          <IoDocumentTextOutline size={32} />
          <div className="text-[14px] fontLight">거래내역</div>
        </div>
        <div className="w-[0.1px] bg-black"></div>
        <div className="flex flex-col items-center">
          <BsBookmark size={32} />
          <div className="text-[14px] fontLight">관심목록</div>
        </div>
      </div>

      {/* 이번주 날씨 기반 매출 예측 */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div className="fontBold text-[18px] text-black">
            이번주 날씨 기반 매출 예측
          </div>
        </div>

        {/* 날씨 카드 리스트 */}
        <div className="mt-4 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {weeklyWeather.map((day, index) => (
              <div
                key={index}
                className="min-w-[130px] p-4 rounded-lg shadow-md border bg-white"
              >
                <p className="fontBold text-[16px]">{day.date}</p>

                <div className="text-[14px] mt-2">
                  <p>최저 {day.min}°C</p>
                  <p>최고 {day.max}°C</p>
                </div>

                <div className="mt-3 text-[14px]">
                  <span className="fontBold text-[#557BB4]">
                    {day.sales > 0 ? `+${day.sales}%` : `${day.sales}%`}
                  </span>{" "}
                  매출예상
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
