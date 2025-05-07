import { useEffect, useState } from 'react';
import { getPostsByAuthor } from '../../../apis/post';
import postThumbnail from "../../../assets/images/primaryImage.png"

type ProfilePost = {
    _id: string;
    image: string;
    title: string;
    channel: {
      _id: string;
      name: string;
    };
    author: {
      _id: string;
    };
};

const ReviewTab = ({ authorId }: { authorId: string }) => {
  const [posts, setPosts] = useState<ProfilePost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getPostsByAuthor(authorId);
            // console.log('서버 응답 결과:', result);
            setPosts(result);
        } catch (error) {
            console.error('포스트 불러오기 실패:', error);
        }
    };
    fetchData();
  }, [authorId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">사용자 포스트 목록</h1>
      {posts
        .filter((post) => post.channel.name === "review")
        .map((post) => {
            const parsedTitle = JSON.parse(post.title);
            return (
                <div key={post._id} className="mb-4 p-4 border rounded">
                    <p><strong>채널:</strong> {post.channel.name}</p>
                    <p><strong>채널 썸네일:</strong><img src={post.image ? post.image : postThumbnail} alt="Post Thumbnail" /></p>
                    <p><strong>제목:</strong> {parsedTitle.title}</p>
                    <p><strong>모집현황:</strong> {parsedTitle.isRecruiting ? "모집중" : "모집완료"}</p>
                    <p><strong>모집인원:</strong> {parsedTitle.memberLimit}</p>
                    <p><strong>모집기간:</strong> {parsedTitle.dateRange}</p>
                    <p><strong>여행지:</strong> {parsedTitle.location}</p>
                    <p><strong>모집조건:</strong> {parsedTitle.recruitCondition.ageRange} {parsedTitle.recruitCondition.gender}</p>
                    <p><strong>내용:</strong> {parsedTitle.description}</p>
                </div>
            );
        })}
    </div>
  );
};

export default ReviewTab;
