import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    ceoName: "",
    businessNum: "",
    businessName: "",
    businessType: "",
    businessItem: "",
    businessAddress: "",
  });

  // 임시 더미 데이터 (사업자번호 20250714 입력 시 자동)
  const dummyBusinessData = {
    businessName: "사부작",
    businessType: "음식점",
    businessItem: "곱창",
    businessAddress: "동탄순환대로 17길 31",
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchBusinessNum = () => {
    // 나중에 fetch로 교체하면 됨
    if (form.businessNum === "20250714") {
      setForm((prev) => ({
        ...prev,
        ...dummyBusinessData,
      }));
      alert("사업자 정보 조회 완료!");
    } else {
      alert("등록되지 않은 사업자번호입니다 (임시)");
    }
  };

  return (
    <div className="h-screen">
      {/* 상단 */}
      <div className="px-6 h-[20%] flex justify-between items-center">
        <div>
          <div className="text-[#365482] text-[20px] fontBold">회원가입</div>
          <div className="text-[14px] fontLight">
            내 가게에 대한 정보를 간단히 작성해주세요.
          </div>
        </div>
        <img
          src="/assets/images/Robo/Robo.png"
          className="scale-x-[-1] w-32 mt-[-20px] mr-[-10px]"
          alt=""
        />
      </div>

      {/* 입력 영역 */}
      <div className="bg-[#e0e8f4] w-full h-[80%] rounded-t-3xl px-16 py-10">
        <div className="flex flex-col justify-start h-full">
          <div className="space-y-20">
            {/* 사장님 정보 */}
            <div>
              <p className="fontBold text-[16px]">
                사장님의 정보를 알려주세요!
              </p>

              <div className="space-y-4 mt-6">
                <InputRow
                  label="아이디"
                  value={form.loginId}
                  onChange={(v) => handleChange("loginId", v)}
                />
                <InputRow
                  label="비밀번호"
                  value={form.password}
                  type="password"
                  onChange={(v) => handleChange("password", v)}
                />
                <InputRow
                  label="이름 (닉네임)"
                  value={form.ceoName}
                  onChange={(v) => handleChange("ceoName", v)}
                />
              </div>
            </div>

            {/* 사업장 정보 */}
            <div>
              <p className="fontBold text-[16px]">
                사업장의 정보를 알려주세요!
              </p>

              <div className="space-y-4 mt-6">
                {/* 사업자번호 + 조회 버튼 */}
                {/* 사업자등록번호 + 조회 버튼 (너비 통일 버전) */}
                <div className="flex items-center space-x-4">
                  <p className="fontLight text-[14px] w-28">사업자등록번호</p>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      className="w-[full] px-3 py-1 bg-[#f9f9f9] rounded-full"
                      value={form.businessNum}
                      onChange={(e) =>
                        handleChange("businessNum", e.target.value)
                      }
                    />
                    <button
                      className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#7D9FD1] text-white rounded-full text-sm"
                      onClick={handleSearchBusinessNum}
                    >
                      조회
                    </button>
                  </div>
                </div>

                <InputRow
                  label="상호명"
                  value={form.businessName}
                  onChange={(v) => handleChange("businessName", v)}
                />
                <InputRow
                  label="주업태명"
                  value={form.businessType}
                  onChange={(v) => handleChange("businessType", v)}
                />
                <InputRow
                  label="주종목"
                  value={form.businessItem}
                  onChange={(v) => handleChange("businessItem", v)}
                />
                <InputRow
                  label="사업장주소"
                  value={form.businessAddress}
                  onChange={(v) => handleChange("businessAddress", v)}
                />
              </div>
            </div>
          </div>

          {/* 가입 버튼 */}
          <div className="flex justify-end mt-16">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#7D9FD1] py-1 px-4 rounded-full text-white fontBold text-[17px]"
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputRow({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center space-x-4">
      <p className="fontLight text-[14px] w-28">{label}</p>
      <input
        type={type}
        className="flex-1 px-3 py-1 bg-[#f9f9f9] rounded-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
