<template>
	<view class="container">
		<view class="header">
			<img src="@/static/Menu.png" alt="" />
			<text>学生信息管理系统</text>
			<img src="@/static/avatar.png" alt="" />
		</view>
		<view class="main_section">
			<text class="slogen">Hello！Teacher Li</text>
			<view class="button_wrapper">
				<!-- <button>学生管理</button> -->
				<view><text>课程</br>管理</text></view>
				<view><text>导入</text></view>
				<view><text>我的</br>信息</text></view>
			</view>
			<view class="info_section">
				<view class="head">
					<text>学生管理</text>
					<img src="@/static/arrow_up.png" alt="" />
				</view>
				<view class="main">
					<view class="stu_info">
						<view class="top">
							<text>课程名称:</text>
							<text>课程编号:</text>
							<text>授课老师:</text>
							<text>开课学期:</text>
							<text>选购教材:</text>
						</view>
						<view class="bottom">
							<button>修改</button>
							<button>删除</button>
						</view>
					</view>
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


		.button_wrapper {
			display: flex;
			justify-content: space-evenly;
			margin-top: 32px;

			view {
				display: inline-block;
				width: 17.6vw;
				height: 14.6vw;
				text-align: center;
				border-radius: 7.68px;
				border: 0.5px solid rgba(228, 228, 228, 1);

				text {
					line-height: 7.3vw;
					font-size: 14px;
					font-weight: 700;
					color: white;
				}

				&:first-of-type {
					background: linear-gradient(180deg, rgba(255, 179, 97, 1) 0%, rgba(255, 215, 156, 1) 100%);
				}

				&:nth-of-type(2) {
					line-height: 14.6vw;
					background: linear-gradient(180deg, rgba(114, 160, 212, 1) 0%, rgba(164, 217, 219, 1) 100%);
				}

				&:nth-of-type(3) {
					background: linear-gradient(180deg, rgba(252, 152, 139, 1) 0%, rgba(255, 184, 203, 1) 100%);
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
					height: auto;
					margin-top: 48px;
					border-radius: 7.68px;
					background: rgba(106, 106, 106, 0.25);
					box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

					&:first-of-type {
						margin-top: 0;
					}

					.top {
						display: flex;
						flex-direction: column;
						gap: 12px;
						padding: 23px 11px 16px 11px;

						text {
							font-size: 12px;
							font-weight: 400;
							letter-spacing: 0px;
							color: rgba(0, 0, 0, 0.5);
						}
					}

					.bottom {
						display: flex;
					}

					button {
						width: 100%;
						border: transparent;
						background: rgba(0, 0, 0, 0.5);
						font-size: 15px;
						font-weight: 400;
						letter-spacing: 0px;
						color: rgba(243, 167, 63, 1);

						&:first-of-type {
							border-radius: 0 0 0 8px;
						}

						&:last-of-type {
							border-radius: 0 0 8px 0;
						}
					}
				}
			}
		}
	}
</style>
