import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function StoreScore() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // 중복 생성 방지
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [
          {
            label: "매출액",
            data: [12, 17, 20, 25, 30, 34, 40], // 상승 그래프
            borderWidth: 1,
            tension: 0.35,
            borderColor: "#4A90E2",
            pointBackgroundColor: "#4A90E2",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // label 숨김
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              font: { size: 10 },
            },
          },
          x: {
            ticks: {
              font: { size: 11 },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="mt-12 mb-30">
      {/* title */}
      <div>
        <div className="flex items-center justify-between">
          <div className="fontEB text-[20px] text-[#365482]">내 가게 점수</div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="fontLight text-[14px]">
            최근 7일 매출 변화를 리포트로 보여드려요
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="flex justify-center">
        <div className="mt-4 h-[200px] w-[88%] ">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* 리포트 */}
      <div className="flex justify-between h-auto mt-6">
        <div className="bg-white w-[48%] shadow-md py-3 px-4 rounded-lg">
          <p className="text-[14px] fontMedium text-center mb-4">
            📈 최근 7일 매출 변화
          </p>
          <p className="text-[10px] fontLight">
            🔼 매출 상승
            <br />
            - 지난 일주일간 매출이 꾸준히 오르고 있어요!
            <br />
            - 지난주보다 매출이 안정적으로 상승 중이에요.
            <br />
            - 최근 들어 손님 발길이 더 활발해지고 있어요.
            <br />
            - 이번 주 매출 흐름이 아주 좋아요!
            <br />- 지난 7일 동안 좋은 매출 탄력을 받고 있어요.
          </p>
        </div>
        <div className="bg-white w-[48%] shadow-md py-3 px-4 rounded-lg">
          <p className="text-[14px] fontMedium text-center mb-4">
            📈 최근 7일 매출 변화
          </p>
          <p className="text-[10px] fontLight">
            🔼 매출 상승
            <br />
            - 지난 일주일간 매출이 꾸준히 오르고 있어요!
            <br />
            - 지난주보다 매출이 안정적으로 상승 중이에요.
            <br />
            - 최근 들어 손님 발길이 더 활발해지고 있어요.
            <br />
            - 이번 주 매출 흐름이 아주 좋아요!
            <br />- 지난 7일 동안 좋은 매출 탄력을 받고 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
