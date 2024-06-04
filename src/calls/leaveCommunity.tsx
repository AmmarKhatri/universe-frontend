import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export default function LeaveCommunity(token: string, communities: any, setCommunities: any, comm_id: string) {
  axios
    .put(`${process.env.NEXT_PUBLIC_APIURL}/communities/${comm_id}/leave`,{}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.data.error != 0) {
        throw new Error(response.data.message);
      } else {
        const updatedCommunities = communities.map((community: any) => {
          if (community.commid === comm_id) {
            return { ...community, joined: false };
          }
          return community;
        });
        setCommunities(updatedCommunities);
        toast({
            title: "Goodbye! :(",
            description: response.data.message,
        })
      }
    })
    .catch((error) => {
      console.error("Error could not leave community:", error);
      throw new Error("Could not leave community");
    });
}
