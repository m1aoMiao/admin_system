import request from '@/utils/service';

// 登录
export function login(data) {
	console.log(data);
    return request({
        url: `/login`,
        method: 'post',
        data
    });
}