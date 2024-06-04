import axios from "axios";

export default function FetchUserCommunities(token: string, setCommunities: any) {
  axios
    .get(`${process.env.NEXT_PUBLIC_APIURL}/communities/user`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.data.error != 0) {
        throw new Error(response.data.message);
      } else {
        console.log(response.data);
        let communities = [];
        let comm = response.data.communities;
        for (let i = 0; i < comm.length; i++) {
          if(!comm[i].isArchived){
            let c = {
              id: i,
              commid: comm[i]._id,
              name: comm[i].name,
              description: comm[i].description,
              initial: comm[i].name[0],
              current: i === 0 ? true : false, // Set the first community as current
            };
            communities.push(c);
          }
        }
        setCommunities(communities);
      }
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      throw new Error("Could not fetch communities");
    });
}
