export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}