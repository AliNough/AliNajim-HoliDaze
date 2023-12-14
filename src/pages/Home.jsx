// import FetchPosts from "../components/fetchPosts";
// import WritePosts from "../components/writePosts";
import FetchListing from "../components/listingFetch";
import UserInfo from "../components/userInfoHome";
export default function Home() {
  return (
    <>
      <UserInfo />
      <FetchListing />
    </>
  );
}
