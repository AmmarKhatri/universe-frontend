import axios from "axios"
export default function FetchPostImpressions(token: string, setLikeCount: any, setDislikeCount: any, post_id: any){
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/impressions/post/${post_id}`, {
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    .then(response => {
        if (response.data.error != 0){
            throw new Error(response.data.message);
        } else {
            console.log(response.data);
            setDislikeCount(response.data.totalDislikes);
            setLikeCount(response.data.totalLikes);
        }
    })
    .catch(error => {
        console.error("Error signing up:", error);
        throw new Error("Could not fetch users")
    });
}