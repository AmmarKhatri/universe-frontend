import axios from "axios"
export default function FetchAllUsers(token: string, setUsers: any){
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users/all`, {
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    .then(response => {
        if (response.data.error != 0){
            throw new Error(response.data.message);
        } else {
            console.log(response.data);
            let users = response.data.users
            users = users.map((u: any, i: number) => {
                return {
                    id: u._id,
                    email: u.email,
                    username: u.username,
                    dateOfBirth: u.dateOfBirth,
                    role: u.role,
                }
            })
            setUsers(users);
        }
    })
    .catch(error => {
        console.error("Error signing up:", error);
        throw new Error("Could not fetch users")
    });
}