import axios from "axios"
export default function FetchUserCommunities(token: string, setCommunities: any){
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/communities/user`, {
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    .then(response => {
        if (response.data.error != 0){
            throw new Error(response.data.message);
        } else {
            console.log(response.data);
            let communities: any[] = [];
            let comm = response.data.communities
            for(let i = 0; i < comm.length; i++){
                let c = {
                    id: i,
                    commid: comm[i]._id,
                    name: comm[i].name,
                    initial: comm[i].name[0],
                    current: false,
                }
                communities.push(c);
            }
            setCommunities(communities);
        }
    })
    .catch(error => {
        console.error("Error signing up:", error);
        throw new Error("Could not fetch communities")
    });
}