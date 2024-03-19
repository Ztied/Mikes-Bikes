export const getAllBikes = () => {
    return fetch("http://localhost:8088/bikes?_expand=user&_expand=type&_expand=size").then(res => res.json())
}

export const getBikeByType = (typeId) => {
    return fetch(`http://localhost:8088/bikes?_expand=user&_expand=type&typeId=${typeId}`).then(res => res.json())
}

export const getBikeById = (bikeId) => {
    return fetch(`http://localhost:8088/bikes?id=${bikeId}&_expand=user&_expand=type`).then(res => res.json())
}

export const getBikeByUserId = (userId) => {
    return fetch(`http://localhost:8088/bikes?_expand=user&_expand=type&userId=${userId}`).then(res => res.json())
}

export const getBikeSizes = () => {
    return fetch('http://localhost:8088/sizes').then(res => res.json())
}

export const getBikeTypes = () => {
    return fetch('http://localhost:8088/types').then(res => res.json())
}

export const updateBike = (bike) => {
    return fetch(`http://localhost:8088/bikes/${bike.id}?_expand=user&_expand=type`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    })
}

export const createBike = (bike) => {
    return fetch(`http://localhost:8088/bikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    })
}

export const deleteBike = (bikeId) => {
    return fetch(`http://localhost:8088/bikes/${bikeId}`, {
        method: "DELETE"
    })
}