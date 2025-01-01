// baseURL: 'https://json-server-be-nguyen-k10.onrender.com',
import axios from 'axios';

const JSON_SERVER_URL = 'http://localhost:3000';

const instance = axios.create({
	baseURL: JSON_SERVER_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const getAllProducts = async () => {
    const res = await instance.get('/products');
    // console.log('getAllProducts res: ', res)
    return res;
};

export const getOneProduct = async id => {
    const res = await instance.get(`/products/${id}`);
    // console.log('getOneProduct res: ', res)
    return res;
};

export const addProduct = async product => {
    const res = await instance.post('/products', product);
    console.log('addProduct res: ', res)
    return res;
};

export const deleteProduct = async id => {
    const res = await instance.delete(`/products/${id}`);
    console.log('deleteProduct res: ', res)
    return res;
};

export const updateProduct = async (id, product) => {
    const res = await instance.patch(`/products/${id}`, product);
    console.log('updateProduct res: ', res)
    return res;
};

// const handleRequest = async (request) => {
//     try {
//         const res = await request;
//         return res.data; // Trả về dữ liệu trực tiếp
//     } catch (error) {
//         return {
//             error: true,
//             message: error.response?.data?.message || error.message,
//             status: error.response?.status || 500,
//         };
//     }
// };
//
// export const getAllProducts = async () => {
//     return await handleRequest(instance.get("/products")); // Chuẩn endpoint rồi
// };
//
// export const getOneProduct = async (id) => {
//     return await handleRequest(instance.get(`/products/${id}`));
// };
//
// export const addProduct = async (product) => {
//     return await handleRequest(instance.post("/products", product));
// };
//
// export const deleteProduct = async (id) => {
//     return await handleRequest(instance.delete(`/products/${id}`));
// };
//
// export const updateProduct = async (id, product) => {
//     return await handleRequest(instance.patch(`/products/${id}`, product));
// };
