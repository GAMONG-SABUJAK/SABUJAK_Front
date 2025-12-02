import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { deals } from "../../data/deals";
import {
  getBookmarks,
  toggleBookmark,
  isBookmarked,
} from "../../utils/bookmark";

export default function DealMain() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleBookmark = (e, id) => {
    e.stopPropagation(); // 게시물 클릭 방지
    const updated = toggleBookmark(id);
    setBookmarks(updated);
  };

  return (
    <div className="pt-12 h-screen overflow-y-auto">
      {/* header */}
      <div className="flex justify-between px-6">
        <div className="flex items-center">
          <FiMapPin size={20} />
          <p className="ml-2 text-[16px] fontBold">안양시 만안구</p>
        </div>
        <div>검색창</div>
      </div>

      <div className="w-full h-[0.5px] bg-[#c4c4c4] mt-6"></div>

      <div className="px-6">
        {deals.map((item) => {
          const bookmarked = bookmarks.includes(item.id);
          const bookmarkCount = item.bookmarkCount + (bookmarked ? 1 : 0);

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/deals/${item.id}`)}
              className="cursor-pointer"
            >
              <div className="flex py-4">
                <img
                  src={item.img}
                  alt=""
                  className="aspect-square object-cover w-30 rounded-lg"
                />

                <div className="ml-3 w-full">
                  <p className="text-end">{item.time}</p>

                  <div className="space-y-2">
                    <div className="flex space-x-2 items-center">
                      <div
                        className={`px-2 py-0.5 text-[11px] rounded-sm shadow-sm fontRegular ${
                          tagStyles[item.tag]
                        }`}
                      >
                        #{item.tag}
                      </div>
                      <p className="fontMedium text-[14px]">{item.title}</p>
                    </div>

                    <p className="fontEB text-[18px] text-[#4A70A9]">
                      {item.price}
                    </p>

                    <div className="flex items-center text-[#474747]">
                      <FiMapPin size={12} />
                      <p className="ml-2 text-[12px] fontBold">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* 하단 아이콘 */}
                  <div className="flex space-x-3 justify-end">
                    <div className="flex items-center">
                      <IoChatboxEllipsesOutline />
                      <p className="ml-1">{item.chatCount}</p>
                    </div>

                    {/* 북마크 */}
                    <div
                      className="flex items-center"
                      // onClick={(e) => handleBookmark(e, item.id)}
                    >
                      {bookmarked ? (
                        <BsBookmarkFill className="text-[#4A70A9]" />
                      ) : (
                        <BsBookmark />
                      )}
                      <p className="ml-1">{bookmarkCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[0.5px] bg-[#c4c4c4]"></div>
            </div>
          );
        })}

        {/* 오른쪽 아래 글쓰기 버튼 */}
        <div className="shadow-lg bg-[#4A70A9] w-15 h-15 rounded-full absolute bottom-25 right-10 flex justify-center items-center">
          <FaPlus className="text-white" size={36} />
        </div>
      </div>
    </div>
  );
}
