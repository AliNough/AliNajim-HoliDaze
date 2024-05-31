/**
 * The API URL is set in the .env file. Use this everywhere you need to make an API call.
 * @example const response = await fetch(`${API_URL}/social/posts`);
 * @link https://docs.noroff.dev/social-endpoints/posts
 */
export const API_URL =
  import.meta.env.VITE_API_URL || "https://v2.api.noroff.dev";

export const API_KEY =
  import.meta.env.VITE_API_KEY || "183ffdd5-be76-4f55-9e3a-844f4dbbd935";
// export const API_URL =
//   import.meta.env.VITE_API_URL || "https://api.noroff.dev/api/v1";

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Profiles", href: "/profiles" },
  { label: "Posts", href: "/posts" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];
