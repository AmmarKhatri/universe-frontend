import axios from "axios";

export default function FetchSinglePost(token: string, setPost: any, post_id: any) {
  axios
    .get(`${process.env.NEXT_PUBLIC_APIURL}/posts/${post_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.data.error != 0) {
        throw new Error(response.data.message);
      } else {
        let post = response.data.post;
        setPost(post);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error("Error could not fetch communities:", error);
      throw new Error("Could not fetch communities");
    });
}
