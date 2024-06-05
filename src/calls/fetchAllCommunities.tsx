import axios from "axios"
export default function FetchAllCommunities(token: string, setCommunities: any, userId: string){
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/communities`, {
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    .then(response => {
        if (response.data.error != 0){
            throw new Error(response.data.message);
        } else {
            console.log(response.data);
            const comm = response.data.communities
            console.log(comm[0].moderators.email)
            const communities = comm.map((c: any, i: number) => {
                return {
                    id: i,
                    commid: c._id,
                    name: c.name,
                    description: c.description,
                    moderators: c.moderators.map((m: any) => m.email),
                    joined: c.participants.includes(userId),
                    createdBy: {
                        _id: c.createdBy._id,
                        username: c.createdBy.username,
                        email: c.createdBy.email,
                    },
                    isArchived: c.isArchived,
                }
            })
            setCommunities(communities);
        }
    })
    .catch(error => {
        console.error("Error signing up:", error);
        throw new Error("Could not fetch communities")
    });
}
