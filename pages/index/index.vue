<template>
	<view class="container">
		<view class="title">
			<text>WELCOME!</text>
			<text>学生信息管理系统</text>
		</view>
		<view class="bkCircle">
			<view class="input_section">
				<input type="text" placeholder="账号" placeholder-style="color:rgba(58, 58, 58, 1);font-size: 18px;
			font-weight: 400;" v-model.trim="username" />
				<input type="safe-password" placeholder="密码" placeholder-style="color:rgba(58, 58, 58, 1);font-size: 18px;
			font-weight: 400;" v-model.trim="password" />
			</view>

			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
			<view class="button_wrapper">
				<button @click="handleClick">登录</button>
				<button @click="handleClick">登录</button>
			</view>

			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: 'lxy',
				password: '123456',
				msgType: '',
				messageText: ''
			};
		},
		methods: {
			handleClick() {

				this.$axios({
					url: '/login',
					method: 'post',
					params: {
						username: this.username,
						password: this.password
					}
				}).then((res) => {
					console.log(res);
				})


				// login({
				// 	username: this.username,
				// 	password: this.password
				// }).then((res) => {
				// 	console.log(res)
				// });
				// if (this.username && this.password) {
				// 	console.log(this.username, this.password);
				// 	// uni.redirectTo({
				// 	// 	url: '/pages/teacher/index'
				// 	// });
				// 	uni.redirectTo({
				// 		url: '/pages/student/index'
				// 	});
				// } else {
				// 	this.msgType = 'error';
				// 	this.messageText = '请输入用户名或密码!';
				// 	this.$refs.message.open();
				// }
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		height: 100vh;
		background-color: transparent;
		color: rgba(58, 58, 58, 1);
		overflow: hidden;
	}

	.title {
		position: absolute;
		width: 100vw;
		top: 9.2vh;

		text {
			display: block;
			text-align: center;

			&:first-of-type {
				font-size: 48px;
				line-height: 48px;
				font-weight: 700;
			}

			&:last-child {
				font-size: 36px;
				line-height: 36px;
				font-weight: 700;
			}
		}
	}

	.bkCircle {
		position: absolute;
		top: 27.1vh;
		left: 50%;
		transform: translateX(-50%);
		width: 85vh;
		height: 85vh;
		border-radius: 50%;
		background: linear-gradient(180deg, rgba(135, 245, 255, 1) 0%, rgba(189, 198, 242, 1) 100%);

		.button_wrapper {
			text-align: center;

			button {
				display: inline-block;
				margin-top: 24px;
				padding: 0 16px;
				font-size: 15px;
				font-weight: 400;
				color: rgba(243, 167, 63, 1);
				border-radius: 12px;
				background: rgba(255, 246, 232, 1);
				border: 1px solid rgba(246, 221, 184, 1);

				&:last-of-type {
					margin-left: 20px;
				}
			}
		}


		.line {
			width: 64.9vw;
			height: 0;
			margin: 0 auto;
			margin-top: 16px;
			background: rgba(204, 204, 204, 1);
			border: 1px solid rgba(255, 255, 255, 1);
		}
	}

	.input_section {
		margin-top: 5.4vw;

		input {
			width: 47.8vw;
			height: 5.3vh;
			margin: 0 auto;
			padding-left: 25px;
			opacity: 0.61;
			background: rgba(255, 255, 255, 1);
			border-radius: 25px;

			&::placeholder {
				margin-left: 25px;
				color: red;
				font-size: 18px;
				font-weight: 400;
			}

			&:last-child {
				margin-top: 16px;
			}
		}
	}
</style>
