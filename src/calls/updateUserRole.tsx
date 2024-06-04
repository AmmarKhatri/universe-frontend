import { Role } from "@/types";
import axios from "axios";
export default async function UpdateUserRole(token: string, role: Role, email: string) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_APIURL}/users/updateRole`,
      {
        role,
        email,
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
      const user = response.data.user;

      return {
        id: user._id,
        email: user.email,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Could not update user role");
  }
}
