import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { PiMoneyWavy } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Weather() {
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [83, 17],
        backgroundColor: ["#557BB4", "#f9f9f9"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    circumference: 180, // 180도 = 반도넛
    rotation: -90, // 위로 열리게
    cutout: "88%", // 도넛 두께
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const weatherDetails = [
    { icon: "🌤️", label: "날씨", value: "17°" },
    { icon: "☔️", label: "강수량", value: "10-30mm" },
    { icon: "😡", label: "불쾌지수", value: "좋음" },
    { icon: "😷", label: "미세먼지", value: "보통" },
    { icon: "✨", label: "자외선", value: "낮음" },
  ];

  return (
    <div className="pt-12">
      <div>
        <div className="flex items-center justify-between">
          <div className="fontEB text-[20px] text-[#365482]">
            오늘의 날씨는?
          </div>
          <FiInfo size={24} />
        </div>

        <div className="flex items-center space-x-1">
          <FiMapPin />
          <div className="fontLight text-[14px]">안양시 만안구</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="w-[80%] h-[200px] mt-[-20px]">
            <Doughnut data={data} options={options} />

            {/* 가운데 점수 텍스트 */}
            <div className="text-[48px] fontPLMedium text-center mt-[-110px] ">
              83점
            </div>

            {/* 세부텍스트 */}
            <p className="fontLight text-[12px] text-center mt-4">
              오늘은 화창한 날씨입니다.
              <br />
              야외활동 증가로 매출이
              <br />
              어제보다 5% 오를 가능성이 있습니다.
            </p>
          </div>
        </div>
        {/* 세부날씨 */}
        <div className="mt-14 flex justify-between w-[88%] mx-auto">
          {weatherDetails.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-1/5">
              <div className="bg-white border-[#c4c4c4] border-[0.1px] rounded-sm w-10 h-10 flex items-center justify-center text-[27px]">
                {item.icon}
              </div>
              <div className="text-center mt-2 whitespace-nowrap text-[12px]">
                <p className="fontLight">{item.label}</p>
                <p className="fontSB text-[14px]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 예상손님수어쩌구 */}
        <div className="w-[95%] h-[75px] mx-auto mt-8 bg-[#E4E9F0] rounded-full relative">
          <div className="flex justify-evenly items-center h-full relative">
            {/* 아이템 1 */}
            <div className="flex flex-col items-center relative h-full w-[60px]">
              <p className="fontLight text-[8.5px] mt-1.5">예상 방문객 수</p>
              <div className="flex-1 flex items-center mt-[-12px] space-x-1">
                <BsPerson />
                <p className="fontMedium text-[16px]">87명</p>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-[0.1px] h-8 bg-[#3F6BAC]" />

            {/* 아이템 2 */}
            <div className="flex flex-col items-center relative h-full w-[60px]">
              <p className="fontLight text-[8.5px] mt-1.5">혼잡 예상 시간대</p>
              <div className="flex-1 flex items-center mt-[-12px] space-x-1">
                <AiOutlineFieldTime />
                <p className="fontMedium text-[16px]">87명</p>
              </div>
            </div>

            <div className="w-[0.1px] h-8 bg-[#3F6BAC]" />

            {/* 아이템 3 */}
            <div className="flex flex-col items-center relative h-full w-[60px]">
              <p className="fontLight text-[8.5px] mt-1.5">예상 매출</p>
              <div className="flex-1 flex items-center mt-[-12px] space-x-1">
                <PiMoneyWavy />
                <p className="fontMedium text-[16px]">87명</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
