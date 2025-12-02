import React, { useState, useEffect } from "react";

export default function SalesOverview() {
  // 달력 날짜
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 매출 입력값
  const [inputSales, setInputSales] = useState("");

  // 클릭한 날짜 (1~31)
  const [selectedDay, setSelectedDay] = useState(null);

  // 날짜별 매출 데이터 (YYYY-MM-DD 형태)
  const [salesDataState, setSalesDataState] = useState({
    "2025-01-01": 20000,
    "2025-01-02": 50000,
  });

  // 날짜 key 만드는 함수
  const getDateKey = (year, month, day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  // 매출 -> 색 지정
  const getColorBySales = (amount) => {
    if (!amount) return "";
    if (amount < 50000) return "bg-[#ffffff]";
    if (amount < 100000) return "bg-[#DDE5F0]";
    if (amount < 200000) return "bg-[#BBCAE1]";
    if (amount < 300000) return "bg-[#99B0D2]";
    if (amount < 400000) return "bg-[#7795C3]";
    if (amount < 500000) return "bg-[#557BB4]";
    return "bg-[#2C5187]";
  };

  // 달력 데이터 생성
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDayOfMonth.getDay();
    const lastDate = lastDayOfMonth.getDate();

    // 이전달
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDay; i > 0; i--) {
      days.push({
        date: prevMonthLastDate - i + 1,
        isCurrentMonth: false,
      });
    }

    // 이번달
    for (let i = 1; i <= lastDate; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }

    // 다음달
    while (days.length < 42) {
      days.push({
        date: days.length - (startDay + lastDate) + 1,
        isCurrentMonth: false,
      });
    }

    setDaysInMonth(days);
  }, [currentDate]);

  // 오늘 날짜 체크
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

  // 저장 버튼 클릭
  const handleSaveSales = () => {
    if (!inputSales) {
      alert("매출액을 입력해주세요!");
      return;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const key = getDateKey(year, month, selectedDay);

    setSalesDataState((prev) => ({
      ...prev,
      [key]: Number(inputSales),
    }));

    setIsModalOpen(false);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-[90%] px-8 py-4">
          {/* 월 이동 */}
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
              const year = currentDate.getFullYear();
              const month = currentDate.getMonth();
              const dateKey = getDateKey(year, month, day.date);

              const salesAmount =
                day.isCurrentMonth && salesDataState[dateKey]
                  ? salesDataState[dateKey]
                  : null;

              const bgColor = getColorBySales(salesAmount);

              return (
                <div
                  key={`${day.date}-${day.isCurrentMonth}-${index}`}
                  className={`
    relative aspect-square rounded-full w-9 h-9 flex items-center justify-center text-sm
    ${day.isCurrentMonth ? "cursor-pointer" : ""}
    ${
      day.isCurrentMonth &&
      day.date > new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth()
        ? "opacity-40 cursor-default"
        : ""
    }
    ${salesAmount ? bgColor : ""}
  `}
                  onClick={() => {
                    if (!day.isCurrentMonth) return;

                    const todayDate = new Date().getDate();
                    const isSameMonth =
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

                    if (isSameMonth && day.date > todayDate) return;

                    setSelectedDay(day.date);
                    setInputSales(salesDataState[dateKey] || "");
                    setIsModalOpen(true);
                  }}
                >
                  <span
                    className={`z-20 ${
                      day.isCurrentMonth ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {day.date}
                  </span>

                  {salesAmount && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className={`w-9 h-9 rounded-full ${bgColor}`} />
                    </div>
                  )}

                  {isToday(day) && (
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setSelectedDay(day.date);
                        setInputSales(salesDataState[dateKey] || "");
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#B3DEBC] flex items-center justify-center text-[9px] fontEB text-black z-30">
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

      {/* 매출 입력 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-64">
            <p className="fontBold text-[16px] text-center">매출 입력</p>

            <input
              type="number"
              className="w-full mt-4 border rounded-lg px-3 py-1"
              placeholder="매출액 입력"
              value={inputSales}
              onChange={(e) => setInputSales(e.target.value)}
            />

            <div className="flex justify-end space-x-3 mt-5">
              <button
                className="px-3 py-1 rounded-full bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="px-3 py-1 rounded-full bg-[#7D9FD1] text-white"
                onClick={handleSaveSales}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
