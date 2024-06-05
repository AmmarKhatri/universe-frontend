import axios from "axios"
export default function FetchPaginatedComments(token: string, comments:any, setComments: any, setPagination: any, post_id: any, offset: number, limit: number){
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/comments/post/${post_id}?offset=${offset}&limit=${limit}`, {
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    .then(response => {
        if (response.data.error != 0){
            throw new Error(response.data.message);
        } else {
            console.log(response.data);
            let newComments = response.data.comments;
            // Combine old comments with new comments
            setComments([...comments, ...newComments]);
            console.log(response.data);
            setPagination(response.data.pagination);
        }
    })
    .catch(error => {
        console.error("Error fetching comments:", error);
        throw new Error("Could not fetch comments")
    });
}