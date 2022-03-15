export const getLaws = () => {
    return fetch("http://localhost:8000/laws", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}