import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'content-type': 'application/json',
    },
});

export const get = async (url) => {
    const response = await request.get(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await request.post('/login', {
        email: email,
        password: password,
    });

    return response;
};


export const addNewProduct = async (data) => {

    const request = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    
        },
    });
    
    const response = await request.post('/admin/products', JSON.stringify(data));
    return response;

//     var dataz = JSON.stringify(data);

//     const response = await request.post("/api/v1/admin/products", {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         },
//         data: dataz
//     });

//     console.log(JSON.stringify(response.data));
//     return response;
}

export default request;
