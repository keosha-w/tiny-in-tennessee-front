export const getBuilders = () => {
    return fetch("http://localhost:8000/builders?approved=True", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}
export const getAdminBuilders = () => {
    return fetch("http://localhost:8000/builders/adminList", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}

export const createBuilder = (builder) => {
    return fetch("http://localhost:8000/builders", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem('tit_token')}`,
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(builder)

    })
        .then(res => res.json())
}

export const getSingleBuilder = (builderId) => {
    return fetch(`http://localhost:8000/builders/${builderId}`, {

        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        },
    })
            .then(res => res.json())
}

export const updateBuilder = (builder, id) => {
    return fetch(`http://localhost:8000/builders/${id}`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("tit_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(builder)

    })
}

export const deleteBuilder = (id) => {
    return fetch(`http://localhost:8000/builders/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Token ${localStorage.getItem("tit_token")}`
        }})}

export const approveBuilder = (builder, id) => {
    return fetch(`http://localhost:8000/builders/${id}/approve_builder`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("tit_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(builder)

    })
}

export const getNotApprovedBuilders = () => {
    return fetch("http://localhost:8000/builders?approved=False", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('tit_token')}`
        }
    }
    ).then(res => res.json())
}