import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Header from "../../components/Header";

export default function NewPost() {
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
    </div>
  );
}
