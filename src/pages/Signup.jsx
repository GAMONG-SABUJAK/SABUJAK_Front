import React from "react";

export default function Signup() {
  return (
    <div className="px-6 py-12">
      {/* <div className="flex justify-between">
        <div className="text-[#365482] text-[20px] fontBold">회원가입</div>
        <div className="flex items-start ml mt-[-20px]">
          <p className="mt-6 text-[14px] text-right fontLight mr-[-20px] ">
            내 가게에 대한 정보를
            <br />
            간단히 작성해주세요.
          </p>
          <img
            src="/assets/images/Robo/Robo.png"
            className="scale-x-[-1] w-28"
            alt=""
          />
        </div>
      </div> */}
      <div className="flex justify-between">
        <div>
          <div className="text-[#365482] text-[20px] fontBold">회원가입</div>
          <div className="text-[12px] fontLight ">
            내 가게에 대한 정보를 간단히 작성해주세요.
          </div>
        </div>
        <img
          src="/assets/images/Robo/Robo.png"
          className="scale-x-[-1] w-32 mt-[-20px] mr-[-10px]"
          alt=""
        />
      </div>
    </div>
  );
}
