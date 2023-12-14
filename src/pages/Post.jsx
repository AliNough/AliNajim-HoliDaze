import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";

const initialPostState = {
  title: "No post found",
  body: "Nothing to see here",
  userId: null,
  id: null,
};

export default function PostPage() {
  const [post, setPost] = useState(initialPostState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("id");
        const accessToken = localStorage.getItem("access_token");
        const resp = await fetch(`${API_URL}/social/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await resp.json();
        setPost(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <section>
        <h2>{post?.title}</h2>
        <p>{post?.body}</p>
        <img className="max-w-lg" src={post.media} alt="" />
      </section>
    </>
  );
}