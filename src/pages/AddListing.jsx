import { API_URL } from "../lib/constants";
import { useNavigate } from "@tanstack/react-router";

// import { useEffect, useState } from "react";

export default function AddNewListing() {
  const navigate = useNavigate();
  //   const userName = localStorage.getItem("user_name");

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    const {
      titleInput,
      descriptionInput,
      deadlineDate,
      deadlineTime,
      tagsInput,
      mediaInput,
    } = form.elements;

    const deadline = new Date(`${deadlineDate.value}T${deadlineTime.value}Z`);
    const tagsArray = tagsInput.value.split(",").map((tag) => tag.trim());
    const mediaArray = mediaInput.value.split(",").map((media) => media.trim());
    console.log(deadline);
    const req = await fetch(`${API_URL}/auction/listings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: titleInput.value,
        description: descriptionInput.value,
        tags: tagsArray,
        endsAt: deadline,
        media: mediaArray,
      }),
    });

    if (req.status === 201) {
      const data = await req.json();
      navigate(`/singlelisting/${data.id}/?id=${data.id}`);
      form.reset();
      console.log(data);
      alert("Listing Created");
    } else {
      const data = await req.json();
      console.log(data);
    }
  };

  return (
    <>
      <div className="bg-gray-800 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-3 px-3">
          <h1 className="text-2xl font-bold text-yellow-100">
            Add New Listing
          </h1>
          <p className="text-gray-400 ">
            Please fill out the form below to add a new listing.
          </p>
        </div>
        <form
          action=""
          className="bg-gray-800 flex flex-col py-6 w-10/12 sm:w-2/4 "
          onSubmit={submitHandler}
        >
          <div className="relative">
            <input
              type="text"
              id="titleInput"
              name="titleInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              id="titleInput"
              name="titleInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Title{" "}
              <span
                className={`text-xs text-gray-600 peer-focus:bg-orange-300`}
              >
                Requiered
              </span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="descriptionInput"
              name="descriptionInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              id="descriptionInput"
              name="descriptionInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Description
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="tagsInput"
              name="tagsInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              id="tagsInput"
              name="tagsInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Tags{" "}
              <span
                className={`text-xs text-gray-600 peer-focus:bg-orange-300`}
              >
                Requiered
              </span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="mediaInput"
              name="mediaInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              id="mediaInput"
              name="mediaInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Media{" "}
              <span
                className={`text-xs text-gray-600 peer-focus:bg-orange-300`}
              >
                (URL)
              </span>
            </label>
          </div>
          <div className="flex justify-center w-full mt-3 gap-2">
            <div className="relative w-full">
              <input
                type="date"
                id="deadlineDate"
                name="deadlineDate"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
                placeholder=""
              />
              <label
                id="deadlineDate"
                name="deadlineDate"
                className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Date{" "}
                <span
                  className={`text-xs text-gray-600 peer-focus:bg-orange-300`}
                >
                  Required
                </span>
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="time"
                id="deadlineTime"
                name="deadlineTime"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
                placeholder=""
              />
              <label
                id="deadlineTime"
                name="deadlineTime"
                className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Time{" "}
                <span
                  className={`text-xs hidden text-gray-600 peer-focus:bg-orange-300`}
                >
                  Required
                </span>
              </label>
            </div>
          </div>
          <input
            type="submit"
            className="border mt-2 bg-gray-700 border-yellow-50 text-yellow-50 rounded-md py-1"
          />
        </form>
      </div>
    </>
  );
}
