import axios from "axios";

export default function FetchPaginatedPosts(token: string, posts: any[], setPosts: any, comm_id: string, offset: number, limit: number) {
  axios
    .get(`${process.env.NEXT_PUBLIC_APIURL}/communities/${comm_id}/posts?offset=${offset}&limit=${limit}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.data.error != 0) {
        throw new Error(response.data.message);
      } else {
        let newPosts = response.data.posts;
        // Combine old posts with new posts and then set the posts
        setPosts([...posts, ...newPosts]);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error("Error could not fetch communities:", error);
      throw new Error("Could not fetch communities");
    });
}
