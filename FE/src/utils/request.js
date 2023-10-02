import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
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
    return response;
};

export const deleteProduct = async(id) => {
    const request = createRequest();
    
    const response = await request.delete(`/admin/products/${id}`);
    return response;
}

export const login = async (email, password) => {
    const response = await request.post('/api/v1/auth/login',JSON.stringify(
    {
        email: email,
        password: password,
    }));
    
    return response;
};


export const addNewProduct = async (data) => {

    const request = createRequest();
    
    const response = await request.post('/admin/products', JSON.stringify(data));
    return response;
}

export const uploadImage = async (image) => {

    const data = new FormData();

    data.append("imageFile", image);
    const request = createRequest();
    
    const response = await request.post('/images', data);
    return response;
}

const createRequest = () => {
    const request = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    
        },
    });
    return request;
}

export const updateProduct = async (data, id) => {
    const request = createRequest();
    const response = await request.put(`/admin/products/${id}`, JSON.stringify(data));
    return response;
}

export const removeProductFromCategory = async (categoryName, productID) => {
    const request = createRequest();
    const response = await request.put(`/categories/${categoryName}/products/${productID}`);
    return response;
}

export const addProductToCategory = async (categoryName, productIDs) => {
    const request = createRequest();
    const response = await request.post(`/categories/${categoryName}/products`, JSON.stringify({productIDs}))
    return response;
}

export const addNewProductToCart = async (productId, quantity) => {
    const request = createRequest();

    const response = await request.post(`/carts`, JSON.stringify({
        productId: productId,
        quantity: quantity
    }))

    return response;
}

export const createOrder = async (cartIds) => {
    const request = createRequest();

    const response = await request.post('/orders', JSON.stringify({
        cartIds: cartIds
    }))

    return response;
}

export const changeOrderStatus = async (status, orderId) => {
    const request = createRequest();

    const response = await request.put('/orders/' + orderId, JSON.stringify(status))

    return response;
}

export default request;
