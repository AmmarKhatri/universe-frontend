import axios from "axios";
export default async function ArchiveCommunity(token: string, commId: string) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_APIURL}/communities/${commId}`,
      {},
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
    throw new Error("Could not archive community");
  }
}
