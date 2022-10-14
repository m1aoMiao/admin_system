<template>
	<view class="container">
		<view class="header">
			<img src="@/static/Menu.png" alt="" />
			<text>学生信息管理系统</text>
			<img src="@/static/avatar.png" alt="" />
		</view>
		<view class="main_section">
			<text class="slogen">Hello！Student Li</text>
			<view class="input_wrapper">
				<input type="text" />
				<i class="icon"></i>
			</view>
			<view class="button_wrapper">
				<button>选课查询</button>
				<button>成绩查询</button>
				<button>成绩单</button>
				<button>我的信息</button>
			</view>
			<view class="info_section">
				<view class="head">
					<text>学生管理</text>
					<img src="@/static/arrow_up.png" alt="" />
				</view>
				<view class="main">
					<view class="stu_info"></view>
					<view class="stu_info"></view>
					<view class="stu_info"></view>
					<view class="stu_info"></view>
					<view class="stu_info"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: calc(100vh - 40px);
	padding: 20px;
	background-color: transparent;
	color: rgba(58, 58, 58, 1);
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	text {
		font-size: 18px;
		font-weight: 700;
	}
	img {
		width: 36px;
		height: 36px;
	}
}

.main_section {
	margin-top: 40px;
	text {
		font-size: 24px;
		font-weight: 700;
	}
	.input_wrapper {
		position: relative;
		input {
			margin: 0 auto;
			margin-top: 16px;
			padding-left: 20px;
			width: 81.3vw;
			height: 5.3vh;
			opacity: 0.61;
			border-radius: 25px;
			background: rgba(255, 255, 255, 1);
		}
		.icon {
			position: absolute;
			display: inline-block;
			top: 0;
			right: 4.6vw;
			height: 48px;
			width: 45px;
			background-image: url('~@/static/search.png'); /*这里放置图标的绝对路径*/
			background-repeat: no-repeat;
			z-index: 2;
		}
	}
	.button_wrapper {
		display: flex;
		gap: 3.7vw;
		margin-top: 16px;
		button {
			padding: 3.9vw 0.46vw;
			width: 18.6vw;
			height: 18.6vw;
			border-radius: 7.68px;
			border: 0.5px solid rgba(228, 228, 228, 1);
			font-size: 18px;
			font-weight: 700;
			color: white;
			&:first-of-type {
				background: linear-gradient(180deg, rgba(255, 179, 97, 1) 0%, rgba(255, 215, 156, 1) 100%);
			}
			&:nth-of-type(2) {
				background: linear-gradient(180deg, rgba(114, 160, 212, 1) 0%, rgba(164, 217, 219, 1) 100%);
			}
			&:nth-of-type(3) {
				background: linear-gradient(180deg, rgba(252, 152, 139, 1) 0%, rgba(255, 184, 203, 1) 100%);
			}
			&:last-of-type {
				background: linear-gradient(180deg, rgba(140, 189, 145, 1) 0%, rgba(204, 230, 161, 1) 100%);
			}
		}
	}
	.info_section {
		margin-top: 14px;
		padding: 2.59vh 3.7vw;
		height: 50vh;
		border-radius: 7.68px;
		background: rgba(255, 255, 255, 0.5);
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text {
				font-size: 18px;
				font-weight: 700;
				color: black;
			}
			img {
				width: 21px;
				height: 12px;
			}
		}
		.main {
			margin-top: 24px;
			height: calc(100% - 14px - 2.59vh);
			overflow: scroll;
			.stu_info {
				width: 200px;
				height: 200px;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.5);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);
			}
		}
	}
}
</style>
