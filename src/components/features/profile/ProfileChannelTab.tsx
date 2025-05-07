import { useState } from "react";
import Button from "../../commons/Button";
import ReviewTab from "./ReviewTab";
import CrewTab from "./CrewTab";

export default function ProfileChannelTab({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<"review" | "crews">("review");

  return (
    <div className="w-[1062px] mx-auto mt-[30px]">
      {/* 탭 버튼 */}
      <div className="flex bg-[#F3F4F6] rounded-[10px]">
        <Button
          onClick={() => setActiveTab("review")}
          className={`h-[50px] flex-1 py-2 text-center font-semibold ${
            activeTab === "review" ? "text-white m-[5px] font-medium text-[18px]" : "bg-fff text-[#333333] m-[5px] font-medium text-[18px]"
          }`}
        >
          후기 게시글
        </Button>
        <Button
          onClick={() => setActiveTab("crews")}
          className={`h-[50px] flex-1 py-2 text-center font-semibold ${
            activeTab === "crews" ? "text-white m-[5px] font-medium text-[18px]" : "bg-fff text-[#333333] m-[5px] font-medium text-[18px]"
          }`}
        >
          동행 게시글
        </Button>
      </div>
      {/* 탭 내용 */}
      <div className="h-full p-4 border border-t-0 border-gray-200 rounded-b">
        <div className={activeTab === "review" ? "block" : "hidden"}>
          <ReviewTab authorId={userId} />
        </div>


        <div className={activeTab === "crews" ? "block" : "hidden"}>
          <CrewTab authorId={userId}/>
        </div>
      </div>
    </div>
  );
}
