import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UploadImage() {
  const [value, setValue] = useState("");
  const [showImages, setShowImages] = useState<string[]>([]);
  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = e.target.files;
    const imageUrlList = [...imageFiles!]
      .filter((file) => file.type.startsWith("image/"))
      .map((imageFile) => URL.createObjectURL(imageFile));
    if (showImages.length <= 10) {
      setShowImages((list) => {
        const result = [...list, ...imageUrlList];
        return result.slice(0, 10);
      });
      setValue("");
    }
  };
  return (
    <div>
      <span className="input-label-style">사진</span>
      <div className="flex bg-[#F9F9F9] py-2 px-[10px] gap-5">
        {showImages &&
          showImages.map((image) => (
            <img src={image} alt={image} className="h-[46px] max-w-22" />
          ))}
        <label htmlFor="inputFile" className="flex items-center">
          <input
            id="inputFile"
            type="file"
            multiple
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={addImageHandler}
            value={value}
            className="absolute w-0 h-0"
            disabled={showImages.length === 10 ? true : false}
          />
          <div className="group flex flex-col justify-center items-center gap-[1px] w-[46px] h-[46px] border border-[#D0D0D0] bg-white rounded-lg cursor-pointer">
            <FontAwesomeIcon
              icon={faCamera}
              className={twMerge(
                "text-[#616161]",
                showImages.length < 10 ? "group-hover:text-black" : null
              )}
            />
            <span
              className={twMerge(
                "text-xs text-[#616161]",
                showImages.length < 10 ? "group-hover:text-black" : null
              )}
            >
              {showImages.length}/10
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}

// image to base64 인코딩
// firebase
