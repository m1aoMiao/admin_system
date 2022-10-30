/* eslint-disable */
import axios from 'axios';


// 创建axios实例
const service = axios.create({
	// 超时
	timeout: 5000,
	baseURL: 'http://1.117.115.133:8080',
});

axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

// request拦截器
service.interceptors.request.use(
	(config) => {
		console.log(config);
		return config

	},
	(error) => {
		console.log(error);
		Promise.reject(error);
	},
);

// 响应拦截器
service.interceptors.response.use((res) => {
		return res.data
	},
	(error) => {
		return Promise.reject(error);
	});
export default service;
