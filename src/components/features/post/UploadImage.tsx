import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { twMerge } from "tailwind-merge";
import CustomImage from "./CustomImage";

export default function UploadImage({
	contentsRef,
	removeImageHandler,
	addImageHandler,
	showImages
}: {
	contentsRef: React.RefObject<ReactQuill | null>;
	removeImageHandler: (image: string) => void;
	addImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
	showImages: string[];
}) {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const ChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		await addImageHandler(e);
		setIsLoading(false);
		setValue("");
	};
	return (
		<div>
			<span className="post-input-title">사진</span>
			<div className="flex bg-[#F9F9F9] py-2 px-[10px] gap-5">
				{showImages &&
					showImages.map((image) => (
						<CustomImage
							contentsRef={contentsRef}
							key={image}
							image={image}
							removeImageHandler={removeImageHandler}
						/>
					))}
				{isLoading && (
					<div className="flex items-center justify-center w-[46px] h-[46px]">
						<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600" />
					</div>
				)}
				<label htmlFor="inputFile" className="flex items-center">
					<input
						id="inputFile"
						type="file"
						multiple
						accept="image/jpg, image/png, image/jpeg, image/gif"
						onChange={ChangeHandler}
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
