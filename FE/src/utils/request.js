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
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIdXkgTmd1eeG7hW4iLCJhdmF0YXJVcmwiOiJodHRwczovL2kucGluaW1nLmNvbS81NjR4L2VkL2E5L2YwL2VkYTlmMDYzNmI3MDg0NjExZWNiNWQ0NjA4YTVkYzJlLmpwZyIsInJvbGVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2xvZ2luIiwiZXhwIjoxNjczNjI1NzM0fQ.JxYf45TC4ckDnkuH9WFHXwPAu9xgO4k-WHsI86mz1Eo'
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


export default request;
