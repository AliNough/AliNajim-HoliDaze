import { API_URL } from "./constants";

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem("jwt")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }
  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/**
 * Fetch all posts with comments, reactions and the author
 * @returns {Object | Error} - A list of posts
 */

/** *Sign up user - register page - @author Cnbergh*/
export async function registerUser({ email, password, username }) {
  const url = new URL(`${API_URL}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("user_email", data.email);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** *Login user - login page - @author Cnbergh*/
export async function loginUser({ email, password }) {
  const url = new URL(`${API_URL}/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("user_email", data.email);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** *Fetch all posts*/
export async function fetchAllPosts() {
  const url = new URL(`${API_URL}/posts`);

  url.searchParams.append("_author", "true");
  url.searchParams.append("_comments", "true");
  url.searchParams.append("_reactions", "true");

  try {
    const response = await fetcher(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
