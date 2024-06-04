import axios from "axios";

export default function FetchAllCommunities(token: string, setCommunities: any, userId: string) {
  axios
    .get(`${process.env.NEXT_PUBLIC_APIURL}/communities`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.data.error != 0) {
        throw new Error(response.data.message);
      } else {
        let communities = [];
        let comm = response.data.communities;
        for (let i = 0; i < comm.length; i++) {
          if (!comm[i].isArchived){
            let c = {
                id: i,
                commid: comm[i]._id,
                name: comm[i].name,
                description: comm[i].description,
                initial: comm[i].name[0],
                joined: comm[i].participants.includes(userId)
              };
              communities.push(c);
          }
        }
        setCommunities(communities);
        console.log(communities)
      }
    })
    .catch((error) => {
      console.error("Error could not fetch communities:", error);
      throw new Error("Could not fetch communities");
    });
}
