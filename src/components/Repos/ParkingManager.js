export const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}

export const getSingleParking = (parkingId) => {
    return fetch(`http://localhost:8000/locations/${parkingId}`, {

        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        },
    })
            .then(res => res.json())
}

export const createParking = (parking) => {
    return fetch("http://localhost:8000/locations", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem('tit_token')}`,
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(parking)

    })
        .then(res => res.json())
}


export const updateParking = (parking, id) => {
    return fetch(`http://localhost:8000/locations/${id}`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("tit_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(parking)

    })
}

export const deleteParking = (id) => {
    return fetch(`http://localhost:8000/locations/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        }})}

export const getApprovedLocations = () => {
    return fetch("http://localhost:8000/locations?approved=True", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}
export const getNotApprovedLocations = () => {
    return fetch("http://localhost:8000/locations?approved=False", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}

export const approveParking = (parking, id) => {
    return fetch(`http://localhost:8000/locations/${id}/approve_parking`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("tit_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(parking)

    })
}