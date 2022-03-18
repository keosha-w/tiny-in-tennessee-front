export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}