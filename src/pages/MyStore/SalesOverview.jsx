import React, { useState, useEffect } from "react";

export default function SalesOverview() {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const salesData = {
    1: 20000,
    3: 50000,
    8: 120000,
    12: 300000,
    17: 700000,
    22: 1000000,
  };

  // 매출 -> 색상 맵핑 함수
  const getColorBySales = (amount) => {
    if (!amount) return ""; // 매출 없으면 색 없음

    if (amount < 50000) return "bg-[#ffffff]";
    if (amount < 100000) return "bg-[#DDE5F0]";
    if (amount < 200000) return "bg-[#BBCAE1]";
    if (amount < 300000) return "bg-[#99B0D2]";
    if (amount < 400000) return "bg-[#7795C3]";
    if (amount < 500000) return "bg-[#557BB4]";

    return "bg-[#2C5187]"; // 최고 매출
  };

  // 현재 날짜에 맞는 달력 데이터 생성
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDayOfMonth.getDay();
    const lastDate = lastDayOfMonth.getDate();

    // 이전 달
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDay; i > 0; i--) {
      days.push({
        date: prevMonthLastDate - i + 1,
        isCurrentMonth: false,
      });
    }

    // 이번 달
    for (let i = 1; i <= lastDate; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }

    // 다음 달
    while (days.length < 42) {
      days.push({
        date: days.length - (startDay + lastDate) + 1,
        isCurrentMonth: false,
      });
    }

    setDaysInMonth(days);
  }, [currentDate]);

  // 오늘 날짜 강조
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day.date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear() &&
      day.isCurrentMonth
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="mt-4 ">
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-[90%] px-8 py-4">
          {/* 달 이동 */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ←
            </button>
            <h3 className="fontSB text-[18px]">
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h3>
            <button
              onClick={goToNextMonth}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              →
            </button>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((weekday, index) => (
              <div
                key={index}
                className="text-center py-2 font-semibold text-gray-600"
              >
                {weekday}
              </div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7">
            {daysInMonth.map((day, index) => {
              const salesAmount =
                day.isCurrentMonth && salesData[day.date]
                  ? salesData[day.date]
                  : null;

              const bgColor = getColorBySales(salesAmount);

              return (
                <div
                  key={`${day.date}-${day.isCurrentMonth}-${index}`}
                  className="relative aspect-square flex items-center justify-center text-sm"
                >
                  {/* 날짜 글씨 (항상 맨 위) */}
                  <span
                    className={`z-20 ${
                      day.isCurrentMonth ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {day.date}
                  </span>

                  {/* 매출 원 */}
                  {salesAmount && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div
                        className={`w-9 h-9 rounded-full ${bgColor} opacity-90`}
                      ></div>
                    </div>
                  )}

                  {/* 오늘 */}
                  {isToday(day) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-[#B3DEBC] flex items-center justify-center text-[9px] fontEB text-black z-30 ">
                        TODAY
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col items-center">
          <p className="fontLight text-[13px]">
            지난 달보다 매출이 약 12% 올랐어요!
          </p>
          <p className="fontMedium mt-1 text-[16px]">월별 매출액 비교해보기</p>
        </div>
        <div className="flex justify-evenly mt-4">
          <div className="flex flex-col items-center space-y-2">
            <input
              type="month"
              className="border border-[0.1px] rounded-full px-2 py-0.5 text-[14px]"
            />
            <div className="text-[14px]">1,200,222 원</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <input
              type="month"
              className="border border-[0.1px] rounded-full px-2 py-0.5 text-[14px]"
            />
            <div className="text-[14px]">1,200,222 원</div>
          </div>
        </div>
      </div>
    </div>
  );
}
