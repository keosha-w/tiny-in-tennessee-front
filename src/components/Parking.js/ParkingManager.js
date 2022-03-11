export const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}