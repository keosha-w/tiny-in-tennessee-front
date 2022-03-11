export const getBuilders = () => {
    return fetch("http://localhost:8000/builders", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}