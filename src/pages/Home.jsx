// import FetchPosts from "../components/fetchPosts";
// import WritePosts from "../components/writePosts";
import FetchVenues from "../components/venueFetch";
import UserInfoHome from "../components/userInfoHome";
export default function Home() {
  return (
    <>
      <UserInfoHome />
      <FetchVenues />
    </>
  );
}
