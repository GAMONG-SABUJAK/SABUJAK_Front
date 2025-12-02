import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Advertise() {
  const [selected, setSelected] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "차분한",
    "감성적인",
    "귀여운",
    "공손/정중한",
    "유머러스한",
    "활기찬",
  ];

  const menuList = [
    {
      name: "아메리카노",
      image: "/assets/images/Americano.png",
    },
    {
      name: "카페라떼",
      image: "/assets/images/CafeLatte.png",
    },
    {
      name: "바닐라라떼",
      image: "/assets/images/VanillaLatte.png",
    },
    {
      name: "헤이즐넛라떼",
      image: "/assets/images/HazelnutLatte.png",
    },
    {
      name: "멜론라떼",
      image: "/assets/images/MelonLatte.png",
    },
  ];

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

  return (
    <div className="pt-12 h-screen pb-28 overflow-y-auto">
      {/* header */}
      <div className="flex justify-between px-6">
        <div className="flex flex-col justify-center">
          <p className="text-[20px] fontBold">AI로 가게 게시물 작성하기</p>
          <p className="text-[14px] fontLight ">
            오늘 날씨와 메뉴를 바탕으로 <br />
            맞춤 홍보글을 바로 생성해드려요.
          </p>
        </div>
      </div>

      {/* 도넛차트 */}
      <div className="px-6 flex items-center justify-evenly">
        <div className="w-[50%] h-[180px] mt-[-10px]">
          <Doughnut data={data} options={options} />

          {/* 가운데 점수 텍스트 */}
          <div className="text-[32px] fontPLMedium text-center mt-[-100px] ">
            83점
          </div>
        </div>
        <p className="fontLight text-[11px] ">
          오늘은 화창한 날씨입니다.
          <br />
          야외활동 증가로 매출이
          <br />
          어제보다 5% 오를 가능성이 있습니다.
        </p>
      </div>

      {/* 구분선 */}
      <div className="w-full h-[0.5px] bg-[#c4c4c4]"></div>

      {/* STEP */}
      <div className="px-6 mt-10 space-y-12 relative">
        <div className="absolute ml-3.5 h-full inset-y-0  border-l-2 border-dashed border-[#557BB4] z-0 fade-in"></div>
        {/* step1 */}
        <div className="flex items-start relative z-10">
          <div className="w-8 h-8 bg-[#557BB4] rounded-full flex items-center justify-center text-white text-[18px] fontBold shrink-0 fade-in">
            1
          </div>

          <div>
            <div className="text-[18px] fontBold ml-3">SNS 스타일</div>
            {/* 카테고리 */}
            <div className="ml-3 mt-2 flex flex-wrap gap-2 items-center">
              {categories.map((cat) => {
                const isSelected = selected.includes(cat);

                return (
                  <div
                    key={cat}
                    onClick={() =>
                      setSelected((prev) =>
                        isSelected
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat]
                      )
                    }
                    className={`px-3 py-0.5 rounded-full text-[15px] fontMedium cursor-pointer 
              ${
                isSelected
                  ? "bg-[#557BB4] text-white border-[#557BB4] border-2"
                  : "border-2 border-[#557BB4] text-black"
              }
            `}
                  >
                    {cat}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* step2 */}
        <div className="flex items-start relative z-10">
          <div className="w-8 h-8 bg-[#557BB4] rounded-full flex items-center justify-center text-white text-[18px] fontBold shrink-0 fade-in">
            2
          </div>

          <div className="">
            <div className="text-[18px] fontBold ml-3">강조할 메뉴</div>
            <div className="text-[14px] fontLight ml-3 mt-[-3px]">
              내 가게의 메뉴를 불러왔어요
            </div>
            {/* 카테고리 */}
            <div className="ml-3 mt-2 overflow-x-auto mr-6">
              <div className="flex space-x-3">
                {menuList.map((menu) => {
                  const isSelected = selectedMenus.includes(menu.name);

                  return (
                    <div
                      key={menu.name}
                      onClick={() =>
                        setSelectedMenus((prev) =>
                          isSelected
                            ? prev.filter((m) => m !== menu.name)
                            : [...prev, menu.name]
                        )
                      }
                      className={`flex flex-col items-center shrink-0 bg-white py-2 px-2 rounded-lg shadow-xl border-[2px] cursor-pointer
            ${isSelected ? "border-[#557BB4]" : "border-[#c4c4c4]"}
          `}
                    >
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-[60px] h-[60px] object-cover rounded-lg"
                      />
                      <p className="text-[12px] mt-1 text-center fontMedium">
                        {menu.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* step3 */}
        <div className="flex items-start relative z-10">
          <div className="w-8 h-8 bg-[#557BB4] rounded-full flex items-center justify-center text-white text-[18px] fontBold shrink-0 fade-in">
            3
          </div>

          <div>
            <div className="text-[18px] fontBold ml-3">글자 수</div>
            {/* 입력받기 */}
            <div className="flex ml-3 mt-1">
              <input
                type="number"
                className="border-[0.1px] px-2 py-0.5 text-[12px] rounded-md shadow-md"
                placeholder="숫자만 입력해주세요"
              />
              <p className="text-[16px] ml-2">자 내외</p>
            </div>
          </div>
        </div>

        {/* step4 */}
        <div className="flex items-start relative z-10">
          <div className="w-8 h-8 bg-[#557BB4] rounded-full flex items-center justify-center text-white text-[18px] fontBold shrink-0 fade-in">
            4
          </div>

          <div className="flex">
            <div className="text-[18px] fontBold ml-3">오늘의 날씨 반영</div>
            <input type="checkbox" name="" id="" className="ml-2 w-4" />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 justify-end px-6 mt-5">
        <div className="border-[0.1px] border-[#c4c4c4] px-4 py-1 rounded-lg fontLight ">
          초기화
        </div>

        <div
          onClick={() => navigate("/output")}
          className="border-[0.1px] border-[#557BB4] px-4 py-1 rounded-lg fontLight bg-[#557BB4] text-white cursor-pointer"
        >
          글 작성하기
        </div>
      </div>
    </div>
  );
}
