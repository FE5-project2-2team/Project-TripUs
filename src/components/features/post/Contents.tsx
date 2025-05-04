import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Contents({
	contentsRef
}: {
	contentsRef: React.RefObject<HTMLDivElement | null>;
}) {
	const [contentsLength, setContentsLength] = useState(0);
	const [isComposing, setIsComposing] = useState(false);
	const [blocks, setBlocks] = useState<{ key: number; text: string }[]>([
		{
			key: Math.random(),
			text: ""
		}
	]);
	const nextIndexRef = useRef<number | null>(null);
	const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const changeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
		setContentsLength(e.target.textContent!.length);
	};

	const isCaretAtStart = () => {
		const selection = window.getSelection();
		const range = selection?.getRangeAt(0);
		return (
			range?.startOffset === 0 && range.startContainer === range.endContainer
		);
	};

	const setCaretToEnd = (prev: HTMLDivElement) => {
		const range = document.createRange();
		const selection = window.getSelection();

		range.selectNodeContents(prev);
		range.collapse(false);

		selection?.removeAllRanges();
		selection?.addRange(range);
	};

	const inputHandler = (e: React.FormEvent<HTMLDivElement>, index: number) => {
		const text = e.currentTarget.innerText;
		setBlocks((blocks) => {
			const newBlocks = [...blocks];
			newBlocks[index].text = text;
			return newBlocks;
		});
	};

	const keyDownHandler = (
		e: React.KeyboardEvent<HTMLDivElement>,
		index: number
	) => {
		if (isCaretAtStart() && e.code === "Backspace") {
			e.preventDefault();
			if (index === 0) return;
			setBlocks((blocks) => blocks.filter((_, idx) => idx !== index));
			const prev = blockRefs.current[index - 1];
			if (prev) {
				setCaretToEnd(prev);
			}
		}

		if (isComposing) return;
		if (e.code === "Enter") {
			e.preventDefault();
			setBlocks((blocks) => {
				const newBlocks = [...blocks];
				newBlocks.splice(index + 1, 0, { key: Math.random(), text: "" });
				return newBlocks;
			});
			nextIndexRef.current = index + 1;
		}
	};

	useEffect(() => {
		const index = nextIndexRef.current;
		if (index !== null && blockRefs.current[index]) {
			blockRefs.current[index]?.focus();
			nextIndexRef.current = null;
		}
	}, [blocks]);

	return (
		<div>
			<label htmlFor="contents" className="post-input-title">
				내용
			</label>
			<div
				ref={contentsRef}
				onInput={changeHandler}
				className="relative bg-[#F9F9F9] max-w-[1084px] h-100 p-5 rounded-[10px] overflow-y-scroll"
			>
				<span
					className={twMerge(
						"absolute bottom-3 right-3 text-[#CDCDCD]",
						contentsLength >= 1000 && "text-[#fa5204]"
					)}
				>
					{contentsLength} / 1000
				</span>
				{blocks.map((block, index) => (
					<div
						key={block.key}
						ref={(el) => {
							blockRefs.current[index] = el;
						}}
						onKeyDownCapture={(e) => keyDownHandler(e, index)}
						onCompositionStart={() => setIsComposing(true)}
						onCompositionEnd={() => setIsComposing(false)}
						onInput={(e) => inputHandler(e, index)}
						contentEditable
						className="focus:outline-0 "
					/>
				))}
			</div>
		</div>
	);
}
