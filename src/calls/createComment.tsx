import { toast } from "@/components/ui/use-toast";
import axios from "axios";
export default async function CreateComment(
  token: string,
  post_id: any,
  description: string,
  comm_id: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/comments`,
      {
        description,
        post_id,
        comm_id
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
      toast({
        title: "New Comment!",
        description: response.data.message
      })
    }
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Could not create message");
  }
}
