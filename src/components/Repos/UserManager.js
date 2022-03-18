export const getSingleUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {

        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        },
    })
            .then(res => res.json())
}