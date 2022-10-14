/* eslint-disable */
import axios from 'axios';


// 创建axios实例
const service = axios.create({
	// 超时
	timeout: 5000,
	baseURL: 'http://127.0.0.1:4523/mock/1710164'
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		// 如果 token 存在
		// 让每个请求携带自定义 token 请根据实际情况自行修改

		return config

	},
	(error) => {
		console.log(error);
		Promise.reject(error);
	},
);

// 响应拦截器
service.interceptors.response.use((res) => {
		// const {
		// 	code
		// } = res.data;
		// if (code && code !== 200) {
		// 	if (res.response?.data?.message.includes('重新登录')) {
		// 		Notification.error({
		// 			title: res.response.message || res.result,
		// 		});
		// 		router.push('/login')
		// 	}
		// 	Notification.error({
		// 		title: res.data.message || res.message || res.result,
		// 	});
		// 	return Promise.reject('error');
		// } else {
		// 	return res.data;
		// }
	},
	(error) => {
		// if (error?.response?.data?.message.includes('重新登录')) {
		// 	Notification.error({
		// 		title: error.response.data.message || res.response.message,
		// 	});
		// 	return Promise.reject('error');

		// }
		return Promise.reject(error);
	});
export default service;
