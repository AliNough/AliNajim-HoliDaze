import { API_URL } from "../../lib/constants";
export default function writePosts() {
  const user_name = localStorage.getItem("user_name");
  const defaultAvatar = "/defaultprofilepic.png";
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { title, body } = form.elements;
    const req = await fetch(`${API_URL}/social/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
      }),
    });
    const data = await req.json();
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-8 pt-3 mx-auto mt-3 form-control">
        <div className="flex flex-col justify-start w-full gap-2 md:flex-row gap-y-2 max-w-7xl ">
          <div
            role="profile-pic-container"
            className="flex flex-col items-center"
          >
            <img
              src={defaultAvatar}
              className="object-cover w-20 h-20 my-2 rounded-full label-text-alt"
            />
            <h4 className=" py-0.5 px-3 text-sm font-semibold rounded-sm bg-white">
              {user_name}
            </h4>
          </div>

          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center w-full max-w-full gap-y-2"
          >
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 my-1 placeholder-black align-middle bg-gray-200 rounded resize-none md:w-11/12 md:mx-2 focus:border-blue-500 focus:outline-blue-500"
            />
            <textarea
              name="body"
              id="body"
              rows="2"
              placeholder="Whats on your mind?"
              className="w-full p-2 my-1 placeholder-black align-middle bg-gray-200 rounded resize-none md:w-11/12 md:mx-2 focus:border-blue-500 focus:outline-blue-500"
            ></textarea>
            <input type="file" className="mx-2" />
            <input
              name="media"
              id="media"
              className="w-20 max-w-sm px-3 py-1 mx-2 text-white bg-blue-500 rounded-sm cursor-pointer"
              type="submit"
              value="Post"
            />
          </form>
        </div>
      </div>
    </>
  );
}
