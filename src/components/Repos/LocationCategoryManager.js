export const getLocationCategories = () => {
    return fetch("http://localhost:8000/locationCategories", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}