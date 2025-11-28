import React from "react";
import { useNavigate } from "react-router-dom";

export default function OutputText() {
  const navigate = useNavigate();

  const content = `
🌤️ 오늘은 맑고 따뜻한 날씨로, 산책하기에도 카페를 찾기에도 참 좋은 하루네요. 날씨 지수 83점처럼 기분도 가볍게 올라가는 날, 부드럽게 하루를 채워줄 한 잔을 소개드립니다.

저희 카페의 바닐라라떼는 은은하게 퍼지는 바닐라 향과 고소하고 깊은 에스프레소의 균형을 가장 중요하게 생각하며 만들고 있습니다.
지나치게 달지 않고, 끝맛이 깔끔해서 누구나 편안하게 즐기실 수 있는 음료예요. 특히 오늘처럼 맑고 건조한 날씨에는 더욱 향과 맛이 깔끔하게 느껴져 많은 분들이 찾아 주시는 메뉴이기도 합니다.

방문하시는 분들이 잠시 쉬어갈 수 있도록 모든 음료는 최상의 온도와 밸런스로 정성스럽게 준비해드리고 있습니다. 따뜻한 바닐라라떼 한 잔으로 오늘 하루도 부드럽고 차분하게 시작해보시면 어떨까요?

늘 찾아주시는 모든 분들께 감사드리며, 오늘도 편안한 하루 보내시길 바랍니다. 천천히 머무르고 싶은 시간이 필요하실 때, 저희가 따뜻하게 맞이하겠습니다.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert("글이 복사되었습니다!");
    });
  };

  return (
    <div className="pt-12 h-screen overflow-y-auto">
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

      <div className="w-[90%] mx-auto mt-8 border-[0.1px] border-[#c4c4c4] rounded-xl shadow-md px-6 bg-white">
        <div className="text-[12px] py-6 whitespace-pre-line">{content}</div>
      </div>

      <div className="flex space-x-2 justify-end px-6 mt-5">
        <div
          onClick={() => navigate("/write")}
          className="border-[0.1px] border-[#c4c4c4] px-4 py-1 rounded-lg fontLight cursor-pointer"
        >
          돌아가기
        </div>

        <div
          onClick={handleCopy}
          className="border-[0.1px] border-[#557BB4] px-4 py-1 rounded-lg fontLight bg-[#557BB4] text-white cursor-pointer"
        >
          글 복사하기
        </div>
      </div>

      <div className="flex flex-1 items-center mt-20">
        <img src="/public/assets/images/Robo/Robo.png" alt="" />
        <p>
          글을 복사, 붙여넣기 해서
          <br />내 가게 홍보글을 업로드 해보세요!
        </p>
      </div>
    </div>
  );
}
