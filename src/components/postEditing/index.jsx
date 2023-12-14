import { useState } from "react";
import { API_URL } from "../../lib/constants";
import { PostShape } from "../../lib/types";

export default function ManipulatePost({ id = "no id" }) {
  const [isEditing, setIsEditing] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  async function deletePost(postId) {
    try {
      const response = await fetch(`${API_URL}/social/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const json = await response.json();
      console.log("deleted post>", json);
    } catch (error) {
      console.warn("deletePost error", error);
    } finally {
      null;
    }
  }

  async function handleOnEdit() {
    setIsEditing(true);
  }
  async function handleOnDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      deletePost(id);
    }
  }
  async function editPost(event) {
    event.preventDefault();
    handleOnEdit();

    const { body, title, postId } = event.target.elements;

    const formattedPostId = Number(postId.value);

    const payload = {
      title: title.value,
      body: body.value,
    };

    try {
      const response = await fetch(
        `${API_URL}/social/posts/${formattedPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();

      console.warn("Success, updated post!", json);
    } catch (error) {
      console.warn("Couldn't update post", error);
    } finally {
      null;
    }
  }
  return (
    <>
      {isEditing ? (
        <>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => editPost(event, setIsEditing)}
          >
            <input type="hidden" name="postId" id="postId" value={id} />
            <input
              className="px-1 bg-blue-100 rounded-sm hover:bg-blue-200"
              name="title"
              id="title"
              type="text"
              placeholder="Title"
            />
            <input
              className="px-1 bg-blue-100 rounded-sm hover:bg-blue-200"
              name="body"
              id="body"
              type="text"
              placeholder="Body"
            />
            <input
              className="px-3 py-1 bg-blue-300 rounded-sm cursor-pointer hover:bg-blue-400 "
              type="submit"
              value="Update"
            />
            <button
              className="px-2 bg-red-100 rounded-sm hover:bg-red-300"
              onClick={() => setIsEditing(false)}
            >
              X
            </button>
          </form>
        </>
      ) : (
        <button
          className="px-3 bg-blue-300 rounded-sm hover:bg-blue-500 "
          onClick={editPost}
        >
          Edit
        </button>
      )}
      <button
        onClick={handleOnDelete}
        className="self-end px-3 bg-red-200 rounded-sm hover:bg-red-500"
      >
        Delete
      </button>
    </>
  );
}
ManipulatePost.propTypes = PostShape;
