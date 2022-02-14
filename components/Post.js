import {
  BookOpenIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header  */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          loading="lazy"
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        {/* flex-1 make the p tag take up as much space as possible */}
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img  */}
      {/* should be full width of the grid it sits in  */}
      <img src={img} alt="" loading="lazy" className="w-full object-cover" />

      {/* buttons */}
      {session && (
        <div className="flex justify-between pt-4 px-4">
          <div className="flex space-x-4">
            <HeartIcon className="custom-btn" />
            <ChatIcon className="custom-btn" />
            <PaperAirplaneIcon className="custom-btn" />
          </div>

          <BookOpenIcon className="custom-btn" />
        </div>
      )}

      {/* caption  */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments  */}

      {/* inputbox  */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      )}
    </div>
  );
}

export default Post;
