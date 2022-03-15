export const getCounties = () => {
    return fetch("http://localhost:8000/counties", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}