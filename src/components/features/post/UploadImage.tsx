import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UploadImage({
  removeImageHandler,
  addImageHandler,
  showImages,
}: {
  removeImageHandler: (image: string) => void;
  addImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showImages: string[];
}) {
  const [value, setValue] = useState("");
  return (
    <div>
      <span className="post-input-title">사진</span>
      <div className="flex bg-[#F9F9F9] py-2 px-[10px] gap-5">
        {showImages &&
          showImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={image}
              className="h-[46px] max-w-22 cursor-pointer hover:brightness-90"
              onClick={() => removeImageHandler(image)}
            />
          ))}
        <label htmlFor="inputFile" className="flex items-center">
          <input
            id="inputFile"
            type="file"
            multiple
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={(e) => {
              addImageHandler(e);
              setValue("");
            }}
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
