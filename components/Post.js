import {
  BookOpenIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

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
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="custom-btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="custom-btn" />
            )}
            <ChatIcon className="custom-btn" />
            <PaperAirplaneIcon className="custom-btn" />
          </div>

          <BookOpenIcon className="custom-btn" />
        </div>
      )}

      {/* caption  */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mr-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments  */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
                loading="lazy"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-sm">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* inputbox  */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
