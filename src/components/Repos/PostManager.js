export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem('tit_token')}`,
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(post)

    })
        .then(res => res.json())
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {

        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        },
    })
            .then(res => res.json())
}

export const updatePost = (post, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("tit_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(post)

    })
}