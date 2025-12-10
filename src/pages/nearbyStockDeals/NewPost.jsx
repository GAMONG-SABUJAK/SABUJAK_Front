import React, { useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Header from "../../components/Header";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

export default function NewPost() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      alert("사진은 최대 5장까지 업로드할 수 있어요!");
      return;
    }

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previewUrls]); // 미리보기
    setFiles((prev) => [...prev, ...selectedFiles]); // 실제 파일
  };

  const tagStyles = {
    나눔: "bg-[#E6ECF5] text-[#365482]",
    구해요: "bg-[#FFF6D8] text-[#A88600]",
    팔아요: "bg-[#FFE5EA] text-[#B33A4B]",
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(formatted);
  };

  // presigned url 요청
  const getPresignedUrls = async (files) => {
    const token = localStorage.getItem("accessToken");

    const presignedReqList = files.map((file, index) => {
      return {
        fileName: file.name,
        mimeType: file.type,
      };
    });

    try {
      const res = await axios.post(
        `${API_URL}s3/presigned-urls`,
        presignedReqList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.error("에러:", err);
      throw err;
    }
  };

  // s3 업로드
  const uploadToS3 = async (files, presignedUrls) => {
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { presignedUrl, cdnUrl } = presignedUrls[i];

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      imageUrls.push(cdnUrl);
    }

    return imageUrls;
  };

  // item-trade/create
  const createPost = async (itemImageList) => {
    const token = localStorage.getItem("accessToken");

    const payload = {
      itemImage: itemImageList,
      hashTag:
        selectedTag === "나눔"
          ? "FREE"
          : selectedTag === "구해요"
          ? "WANTED"
          : "FOR_SALE",
      itemName,
      title,
      description,
      price: Number(price.replace(/,/g, "")),
    };

    const res = await axios.post(`${API_URL}item-trade/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const handleSubmit = async () => {
    try {
      if (!selectedTag) return alert("태그를 선택해주세요.");
      if (!title.trim()) return alert("제목을 입력해주세요.");
      if (!itemName.trim()) return alert("제품명을 입력해주세요.");
      if (!description.trim()) return alert("설명을 입력해주세요.");
      if (!price) return alert("가격을 입력해주세요.");
      if (files.length === 0) return alert("사진을 최소 1장 업로드해주세요.");

      // 1) presigned URL 요청
      const presignedUrls = await getPresignedUrls(files);

      if (!presignedUrls || presignedUrls.length === 0) {
        throw new Error("presigned URL을 받아오지 못했습니다.");
      }

      // 2) S3 업로드
      await uploadToS3(files, presignedUrls);

      // 3) 아이템이미지 JSON 배열 생성
      const itemImageList = files.map((file, index) => {
        const p = presignedUrls[index];
        return {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileUrl: p.cdnUrl,
          fileKey: p.key,
        };
      });

      // 4) 게시글 생성 API 호출
      await createPost(itemImageList);

      alert("게시글이 성공적으로 등록되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("게시글 등록 에러:", err);
      if (err.response?.status !== 401) {
        alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    }
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
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-18 h-18 object-cover rounded-lg flex-shrink-0 border-[0.1px]"
              />
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {/* 자세한 설명 */}
        <div className="space-y-2">
          <p className="fontSB text-[18px]">자세한 설명</p>
          <textarea
            className="border-[0.1px] h-24 w-full px-3 py-1 rounded-md text-[#6a6a6a] text-[16px] fontLight "
            placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div
          onClick={handleSubmit}
          className="bg-[#4A70A9] py-3 text-white fontBold text-center rounded-lg shadow-2xl"
        >
          게시글 올리기
        </div>
      </div>
    </div>
  );
}
