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
				<view @click="changeSection('courseSelectInquiry')">
					<text>选课</br>查询</text>
				</view>
				<view @click="changeSection('transcript')">
					<text>成绩单</text>
				</view>
				<view @click="changeSection('GPACalculator')">
					<text>GPA</br>计算器</text>
				</view>
				<view @click="changeSection('myProfile')">
					<text>我的</br>信息</text>
				</view>
			</view>
			<template v-if="openSection.transcript">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<uni-data-select class="select" v-model="term" :localdata="termRange" @change="chooseTerm">
							</uni-data-select>
							<img src="@/static/arrow_up.png" alt="" />
						</view>
						<view class="bottom">
							<text>课程名称</text>
							<text>分数</text>
							<text>绩点</text>
							<text>评级</text>
							<text>排名</text>
						</view>
					</view>
					<view class="main">
						<view class="stu_info"></view>
						<view class="stu_info"></view>
						<view class="stu_info"></view>
						<view class="stu_info"></view>
						<view class="stu_info"></view>
					</view>
				</view>
			</template>

			<template v-if="openSection.courseSelectInquiry">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<uni-data-select class="select" v-model="term" :localdata="termRange" @change="chooseTerm">
							</uni-data-select>
							<img src="@/static/arrow_up.png" alt="" />
						</view>
						<view class="bottom">
							<text>课程名称</text>
							<text>教师</text>
							<text>开课时间</text>
							<text>教材</text>
						</view>
					</view>
					<view class="main">
						<view :class="{'stu_info':true,'open':openIndex === index}" @click="handleOpen(index)"
							v-for="index in 8" :key="index">
							<template v-if="openIndex === index">
								<view class="top">
									<text>课程名称:</text>
									<text>课程编号:</text>
									<text>授课老师:</text>
									<text>开课学期:</text>
									<text>选购教材:</text>
								</view>
								<button>退选</button>
							</template>

							<template v-else>
								<view class="brief_info">
									<text>高级程序设计</text>
									<text>张老师</text>
									<text>1-2学期</text>
									<text>已选</text>
								</view>
							</template>

						</view>
					</view>
				</view>
			</template>

			<template v-if="openSection.myProfile">
				<view class="info_section">
					<text>我的信息</text>
					<view class="upLoadAvatar">
						<view class="img_wrapper">
							<img class="avatar" src="@/static/avatar_big.png" alt="">
							<img src="@/static/upload.png" alt="">
						</view>
					</view>

					<view class="brief_profile">
						<view class="top">
							<text>姓名:</text>
							<text>学号:</text>
							<text>班级:</text>
							<text>密码:</text>
						</view>
						<button @click="modifyPassword">修改密码</button>
					</view>

				</view>
			</template>

			<template v-if="openSection.changePassword">
				<view class="info_section">
					<text>修改密码</text>

					<view class="password_input_wrapper">
						<text>原密码</text>
						<input type="password">
					</view>

					<view class="password_input_wrapper">
						<text>新密码</text>
						<input type="password">
					</view>

					<view class="password_input_wrapper">
						<text>再次输入新密码</text>
						<input type="password">
					</view>

					<button class="confirm">确认</button>

				</view>
			</template>

			<template v-if="openSection.GPACalculator">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>GPA计算器</text>
							<uni-data-select class="select" v-model="term" :localdata="termRange" @change="chooseTerm">
							</uni-data-select>
						</view>

					</view>

					<view class="GPA_detail">
						<text></text>
						<input type="password">
					</view>

					<view class="GPA_detail">
						<text>程序设计实践</text>
						<text>97/4.50</text>
					</view>

					<view class="GPA_detail">
						<text>平均绩点/排名</text>
						<text>3.77/54</text>
					</view>

					<button class="confirm">确认</button>

				</view>
			</template>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openSection: {
					'transcript': false,
					'courseSelectInquiry': true,
					'myProfile': false,
					'changePassword': false,
					'GPACalculator': false,
				},
				transcript: false,
				courseSelectInquiry: true,
				myProfile: false,
				changePassword: false,
				GPACalculator: false,
				openIndex: 1,
				isOpen: true,
				term: '',
				termRange: [{
						value: 0,
						text: "第一学期"
					},
					{
						value: 1,
						text: "第二学期"
					},
					{
						value: 2,
						text: "第三学期"
					},
					{
						value: 3,
						text: "第四学期"
					},
					{
						value: 4,
						text: "第五学期"
					},
					{
						value: 5,
						text: "第六学期"
					},
					{
						value: 6,
						text: "第七学期"
					},
					{
						value: 7,
						text: "第八学期"
					},
				]
			};
		},
		methods: {
			changeSection(section) {
				for (let [key] of Object.entries(this.openSection)) {
					this.openSection[key] = false
				}
				this.openSection[section] = true
			},
			chooseTerm(e) {
				console.log(e);
			},
			handleOpen(index) {
				console.log(index, this.openIndex);
				if (!this.isOpen) {
					this.isOpen = !this.isOpen
					this.openIndex = index
				} else if (this.openIndex === index) {
					this.isOpen = !this.isOpen
					this.openIndex = 0
				} else {
					this.openIndex = index
				}
			},
			modifyPassword() {
				this.openSection.myProfile = false
				this.openSection.changePassword = true
			}
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
				top: -4px;
				right: 4.6vw;
				height: 5.3vh;
				width: 5.3vh;
				background-image: url('~@/static/search.png');
				/*这里放置图标的绝对路径*/
				background-repeat: no-repeat;
				z-index: 2;
			}
		}

		.button_wrapper {
			display: flex;
			justify-content: space-between;
			margin-top: 16px;

			view {
				display: inline-block;
				width: 18.6vw;
				height: 18.6vw;
				text-align: center;
				border-radius: 7.68px;
				border: 0.5px solid rgba(228, 228, 228, 1);
				font-size: 18px;
				font-weight: 700;
				color: white;

				&:first-of-type {
					background: linear-gradient(180deg, rgba(255, 179, 97, 1) 0%, rgba(255, 215, 156, 1) 100%);
				}

				&:nth-of-type(2) {
					line-height: 18.6vw;
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
			height: calc(45vh + 2.59vh + 2.59vh);
			border-radius: 7.68px;
			background: rgba(255, 255, 255, 0.5);
			overflow: scroll;

			&>text {
				font-size: 18px;
				font-weight: 700;
				letter-spacing: 0px;
				color: rgba(0, 0, 0, 1);
			}

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
				}

				.bottom {
					margin-top: 12px;
					display: flex;
					justify-content: space-between;
					width: 90%;

					text {
						font-size: 18px;
						font-weight: 400;
						letter-spacing: 0px;
						color: rgba(0, 0, 0, 1);
					}
				}

				.uni-stat__select /deep/ {
					flex: 0;
				}

				/deep/ .uni-select {
					width: 131px;
					height: 40px;
					opacity: 1;
					border-radius: 7.68px;
					background: rgba(106, 106, 106, 0.25);
					box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

					.uni-select__input-placeholder /deep/ {
						font-size: 18px;
						font-weight: 400;
						letter-spacing: 0px;
						line-height: 0px;
						color: rgba(0, 0, 0, 1);
					}
				}

				img {
					width: 21px;
					height: 12px;
				}
			}

			.main {
				margin-top: 24px;
				height: calc(100% - 2.59vh - 24px - 12px - 40px);
				overflow: scroll;

				.stu_info {
					height: 80px;
					margin-top: 48px;
					border-radius: 7.68px;
					background: rgba(106, 106, 106, 0.25);
					box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

					&:first-of-type {
						margin-top: 0;
					}

					.brief_info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 90%;
						height: 100%;
						margin: 0 auto;

						text {
							font-size: 12px;
							font-weight: 400;
							letter-spacing: 0px;
							color: rgba(0, 0, 0, 1);
						}
					}

					&.open {
						height: auto;

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

						button {
							border: transparent;
							border-radius: 0px 0px, 8px, 8px;
							background: rgba(0, 0, 0, 0.5);
							font-size: 15px;
							font-weight: 400;
							letter-spacing: 0px;
							color: rgba(243, 167, 63, 1);
						}
					}



				}
			}

			.upLoadAvatar {
				height: 176px;
				margin-top: 24px;
				opacity: 1;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.25);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

				.img_wrapper {
					position: relative;
					height: 100%;

					img {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

			}

			.brief_profile {
				height: auto;
				margin-top: 24px;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.25);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

				.top {
					display: flex;
					flex-direction: column;
					gap: 12px;
					padding: 23px 24px;

					text {
						font-size: 18px;
						font-weight: 400;
						letter-spacing: 0px;
						color: rgba(0, 0, 0, 1);
					}
				}

				button {
					border: transparent;
					border-radius: 0px 0px, 8px, 8px;
					background: rgba(0, 0, 0, 0.5);
					font-size: 15px;
					font-weight: 400;
					letter-spacing: 0px;
					color: rgba(243, 167, 63, 1);
				}
			}

			.password_input_wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 40px;
				padding: 8px 8px;
				margin-top: 16px;
				opacity: 1;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.25);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

				&:first-of-type {
					margin-top: 24px;
				}


				text {
					font-size: 18px;
					font-weight: 400;
					letter-spacing: 0px;
					color: rgba(0, 0, 0, 1);

				}

				input {
					width: 50%;
					margin-left: 24px;
				}

			}

			.GPA_detail {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 40px;
				padding: 8px 8px;
				margin-top: 16px;
				opacity: 1;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.25);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

				&:first-of-type {
					margin-top: 24px;
				}

				text {
					font-size: 18px;
					font-weight: 400;
					letter-spacing: 0px;
					color: rgba(0, 0, 0, 1);

					&:last-of-type {
						margin-left: 36px;
					}
				}

			}

			.confirm {
				width: 94px;
				margin: 0 auto;
				margin-top: 24px;
				padding: 0 16px;
				font-size: 15px;
				font-weight: 400;
				color: rgba(243, 167, 63, 1);
				border-radius: 12px;
				background: rgba(255, 246, 232, 1);
				border: 1px solid rgba(246, 221, 184, 1);
			}

		}
	}
</style>
