import axios from "axios";
export default async function CreatePost(
  token: string,
  name: string,
  description: string,
  commId: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/posts/create`,
      {
        title: name,
        description: description,
        comm_id: commId
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data.error != 0) {
      throw new Error(response.data.message);
    } else {
      console.log(response.data);
      const post = response.data.post;

      return {
        
      };
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Could not create community");
  }
}
