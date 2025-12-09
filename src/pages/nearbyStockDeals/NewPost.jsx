import React, { useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Header from "../../components/Header";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [images, setImages] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [price, setPrice] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("사진은 최대 5장까지 업로드할 수 있어요!");
      return;
    }

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(formatted);
  };

  return (
    <div className="pt-12 h-screen flex flex-col">
      <Header
        left={
          <div className="flex items-center space-x-3">
            <IoChevronBack
              size={26}
              onClick={() => navigate(-1)}
              className="cursor-pointer text-black"
            />
            <p className="fontBold">게시물 작성</p>
          </div>
        }
      />
      <div className="w-full h-[0.5px] bg-[#c4c4c4] mt-4"></div>

      {/* 게시글작성 */}
      <div className="p-6 space-y-10">
        {/* 사진 */}
        <div className="flex space-x-4">
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-18 h-18 border-[0.1px] rounded-lg flex flex-col items-center justify-center cursor-pointer flex-shrink-0"
          >
            <IoCameraOutline size={32} />
            <p className="fontLight">{images.length}/5</p>
          </div>
          <div className="flex space-x-4 overflow-x-auto max-w-[70%]">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* 선택된 사진 프리뷰 */}
            {images.map((img, index) => (
              // <div key={index}>
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-18 h-18 object-cover rounded-lg flex-shrink-0 border-[0.1px]"
              />
              // </div>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">제목</p>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="border-[0.1px] w-full px-3 py-1 rounded-md text-[#6a6a6a] text-[16px] fontLight "
          />
        </div>

        {/* 태그 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">태그</p>
          <div className="flex space-x-3">
            {["나눔", "구해요", "팔아요"].map((tag) => (
              <div
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-md shadow-md cursor-pointer ${
                  selectedTag === tag
                    ? tagStyles[tag]
                    : "bg-[#E8E8E8] text-[#6a6a6a]"
                }`}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>

        {/* 제품명 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">제품명</p>
          <input
            type="text"
            placeholder="제품명을 정확히 작성해주세요."
            className="border-[0.1px] w-full px-3 py-1 rounded-md text-[#6a6a6a] text-[16px] fontLight "
          />
        </div>

        {/* 자세한 설명 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">자세한 설명</p>
          <textarea
            name=""
            id=""
            className="border-[0.1px] h-24 w-full px-3 py-1 rounded-md text-[#6a6a6a] text-[16px] fontLight "
            placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요."
          ></textarea>
        </div>

        {/* 가격 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">가격</p>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="가격을 입력해주세요."
              className="border-[0.1px] w-full px-3 py-1 rounded-md text-[#6a6a6a] text-[16px] fontLight "
            />
            <p className="fontSB text-[18px]">원</p>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="fixed bottom-0 left-0 w-full px-6 pb-6">
        <div className="bg-[#4A70A9] py-3 text-white fontBold text-center rounded-lg shadow-2xl">
          게시글 올리기
        </div>
      </div>
    </div>
  );
}
