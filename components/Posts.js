import Post from "./Post";
const posts = [
  {
    id: "123",
    username: "taibu",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "This a cation, amazing stuff",
  },
  {
    id: "124",
    username: "Haroub",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "This a cation, greate stuff",
  },
];
function Posts() {
  return (
    <div>
      {posts.map(({ id, username, userImg, img, caption }) => (
        <Post
          key={id}
          username={username}
          userImg={userImg}
          img={img}
          caption={caption}
        />
      ))}
    </div>
  );
}

export default Posts;
