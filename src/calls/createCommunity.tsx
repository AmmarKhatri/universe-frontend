import axios from "axios";
export default async function CreateCommunity(
  token: string,
  name: string,
  description: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/communities/create`,
      {
        name: name,
        description: description,
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
      const comm = response.data.community;

      return {
        id: comm._id,
        commid: comm._id,
        name: comm.name,
        description: comm.description,
        moderators: comm.moderators.map((m: any) => m.email),
        createdBy: {
          username: comm.createdBy.username,
          email: comm.createdBy.email,
        },
        isArchived: comm.isArchived,
      };
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Could not create community");
  }
}
