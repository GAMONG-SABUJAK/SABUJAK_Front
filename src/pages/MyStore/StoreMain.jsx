import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { IoSettingsOutline, IoDocumentTextOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import SalesOverview from "./SalesOverview";

export default function StoreMain() {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const navigate = useNavigate();

  const weatherStyles = {
    Clear: {
      icon: "🌤",
      desc: "맑음",
      bg: "bg-[#A9DEF3]",
    },
    Clouds: {
      icon: "☁️",
      desc: "흐림",
      bg: "bg-[#E6E6E6]",
    },
    Rain: {
      icon: "🌧️",
      desc: "비",
      bg: "bg-[#78A3D1]",
    },
    Drizzle: {
      icon: "🌦️",
      desc: "이슬비",
      bg: "bg-[#A1BCDA]",
    },
    Thunderstorm: {
      icon: "⛈️",
      desc: "천둥/번개",
      bg: "bg-[#8190B4]",
    },
    Snow: {
      icon: "❄️",
      desc: "눈",
      bg: "bg-[#F9F9F9]",
    },
    Fog: {
      icon: "🌫️",
      desc: "안개",
      bg: "bg-[#C1C1C1]",
    },
    Sand: {
      icon: "🌪️",
      desc: "황사",
      bg: "bg-[#DFCFB5]",
    },
  };

  const fetchWeather = async () => {
    try {
      const API_KEY = "4534c40ed1b6e89dcc4e813498a37cc4";
      const lat = 37.3943;
      const lon = 126.9568;

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.list) {
        console.log("Weather API Error:", data);
        return;
      }

      const dailyMap = {};

      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyMap[date]) {
          dailyMap[date] = {
            min: item.main.temp_min,
            max: item.main.temp_max,
            weather: item.weather[0].main, // 🌈 대표 날씨 저장!
          };
        } else {
          dailyMap[date].min = Math.min(dailyMap[date].min, item.main.temp_min);
          dailyMap[date].max = Math.max(dailyMap[date].max, item.main.temp_max);
        }
      });

      const dailyArray = Object.entries(dailyMap)
        .slice(0, 5)
        .map(([dateStr, temp]) => {
          const dateObj = new Date(dateStr);
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");

          const weatherInfo = weatherStyles[temp.weather] || {
            icon: "❔",
            desc: "정보 없음",
          };

          return {
            date: `${month}.${day}`,
            min: Math.round(temp.min),
            max: Math.round(temp.max),
            weather: temp.weather,
            icon: weatherInfo.icon,
            desc: weatherInfo.desc,
            sales: Math.floor(Math.random() * 60) - 10,
          };
        });

      setWeeklyWeather(dailyArray);
    } catch (e) {
      console.log("날씨 데이터 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="pt-12 px-6 h-screen overflow-hidden">
      {/* profile */}
      <div className="flex items-center justify-between mb-5">
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

      <div className="overflow-y-auto h-full pb-[180px]">
        {/* 거래내역 | 관심목록 */}
        <div className="flex justify-evenly mt-4">
          <div
            className="flex flex-col items-center"
            onClick={() => navigate("/SalesHistory")}
          >
            <IoDocumentTextOutline size={32} />
            <div className="text-[14px] fontLight mt-1">거래내역</div>
          </div>
          <div className="w-[0.1px] bg-black" />
          <div
            className="flex flex-col items-center"
            onClick={() => navigate("/Bookmark")}
          >
            <BsBookmark size={32} />
            <div className="text-[14px] fontLight mt-1">관심목록</div>
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
            <div className="flex space-x-2 pb-2">
              {weeklyWeather.map((day, index) => (
                <div
                  key={index}
                  className={`min-w-[100px] h-fit p-2 rounded-xl shadow-md ${
                    weatherStyles[day.weather]?.bg
                  }`}
                >
                  <div className="flex justify-center items-end space-x-1">
                    <p className="fontBold text-[15px] text-center">
                      {day.date}
                    </p>

                    <p className="text-[12px] fontBold text-[#4E4E4E]">
                      {day.desc}
                    </p>
                  </div>

                  {/* 🌤 아이콘 + 설명 */}
                  <div className="text-[60px] my-[-10px] flex justify-center">
                    {day.icon}
                  </div>

                  <div className="text-[10px] fontBold text-[#4E4E4E] flex justify-center ">
                    <p>{day.min}°C</p>
                    <div className="mx-1">/</div>
                    <p>{day.max}°C</p>
                  </div>

                  <div className="mt-1 text-[10px] flex justify-center">
                    <span className="fontBold text-[#557BB4] mr-1">
                      {day.sales > 0 ? `+${day.sales}%` : `${day.sales}%`}
                    </span>
                    매출예상
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 내 가게 매출 현황 */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div className="fontBold text-[18px] text-black">
              내 가게 매출 현황
            </div>
          </div>
          <div className="fontLight text-[12px]">
            영업 종료 후, 오늘의 매출액을 입력해주세요.
          </div>

          <SalesOverview />
        </div>
      </div>
    </div>
  );
}
