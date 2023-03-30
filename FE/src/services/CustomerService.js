import * as request from '../utils/request';

export const getAllCustomer = async () => {
    try {
        const res = await request.get('/customer');

        return res;
    } catch (error) {
        console.log('error');
    }
};
