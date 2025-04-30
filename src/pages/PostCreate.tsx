import "flatpickr/dist/themes/material_blue.css";
import PostForm from "../components/features/post/PostForm";

export default function PostCreate() {
  return (
    <div className="flex justify-center items-center">
      <main className="font-[Noto-Sans]">
        <PostForm />
      </main>
    </div>
  );
}
