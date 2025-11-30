import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { IoSettingsOutline, IoDocumentTextOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";

export default function StoreMain() {
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  const weatherStyles = {
    Clear: {
      icon: "🌤",
      desc: "맑음",
      bg: "bg-[#FFF4CC]", // 은은한 크림 노랑
    },
    Clouds: {
      icon: "☁️",
      desc: "흐림",
      bg: "bg-[#EEF1F5]", // 연한 그레이블루
    },
    Rain: {
      icon: "🌧️",
      desc: "비",
      bg: "bg-[#E3ECF9]", // 은은한 비블루
    },
    Drizzle: {
      icon: "🌦️",
      desc: "이슬비",
      bg: "bg-[#EAF2FB]", // 연한 비+흐림 톤
    },
    Thunderstorm: {
      icon: "⛈️",
      desc: "천둥/번개",
      bg: "bg-[#E8E8F5]", // 회보라 톤
    },
    Snow: {
      icon: "❄️",
      desc: "눈",
      bg: "bg-[#F2F8FF]", // 파스텔 아이스 블루
    },
    Mist: {
      icon: "🌫️",
      desc: "안개",
      bg: "bg-[#F5F5F5]", // 연한 안개 회색
    },
    Fog: {
      icon: "🌫️",
      desc: "안개",
      bg: "bg-[#F5F5F5]",
    },
    Haze: {
      icon: "🌫️",
      desc: "연무",
      bg: "bg-[#F7F7F7]", // 아주 옅은 회색
    },
    Dust: {
      icon: "🌪️",
      desc: "먼지",
      bg: "bg-[#FFF1E0]", // 연한 먼지 오렌지
    },
    Sand: {
      icon: "🌪️",
      desc: "황사",
      bg: "bg-[#FFEFD6]", // 파스텔 베이지
    },
    Smoke: {
      icon: "🌁",
      desc: "스모그",
      bg: "bg-[#ECECEC]", // 탁한 회색 느낌
    },
    Squall: {
      icon: "💨",
      desc: "돌풍",
      bg: "bg-[#E8F4F8]", // 바람 느낌 연파랑
    },
    Tornado: {
      icon: "🌪️",
      desc: "토네이도",
      bg: "bg-[#F4E6FF]", // 연보라 (강한 기류 느낌)
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
        <div className="w-[0.1px] bg-black" />
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
                className={`min-w-[150px] p-4 rounded-lg shadow-md border ${
                  weatherStyles[day.weather]?.bg
                }`}
              >
                <p className="fontBold text-[16px]">{day.date}</p>

                {/* 🌤 아이콘 + 설명 */}
                <div className="text-[32px] mt-1">{day.icon}</div>
                <p className="text-[14px] text-gray-500">{day.desc}</p>

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
