<template>
	<view class="container">
		<view class="header">
			<uni-icons class='exit' type="home" @click="handleExit" />
			<text>学生信息管理系统</text>
			<image :src="require('@/static/avatar.png')" alt="" @click="toMyProfile" />
		</view>
		<view class="main_section">
			<text class="slogen">Hello！{{teacher_id}}</text>
			<view class="button_wrapper">
				<!-- <button>学生管理</button> -->
				<view @click="changeSection('coursesManagement')"><text>课程</br>管理</text></view>
				<view @click="changeSection('importStuInfo')"><text>导入</text></view>
				<view @click="changeSection('myProfile')"><text>我的</br>信息</text></view>
			</view>

			<template v-if="openSection.coursesManagement">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>课程管理(点击跳转到学生管理页面)</text>
							<img :src="require('@/static/arrow_up.png')" alt="" />
						</view>
						<view class="bottom">
							<text>课程名称</text>
							<text>课程学分</text>
							<text>开课学期</text>
						</view>
					</view>
					<view class="main">
						<view class="course_info" @click="viewCourseInfo(course.courseName)"
							v-for="course, index in myCourses" :key="index">
							<view class="brief_info">
								<text>{{course.courseName}}</text>
								<text>{{course.point}}</text>
								<text>{{course.term}}</text>
							</view>
						</view>
					</view>

				</view>
			</template>

			<template v-if="openSection.stuManagement">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>学生管理</text>
							<img src="@/static/arrow_up.png" alt="" />
						</view>
					</view>
					<view class="main">
						<view class="stu_info" v-for="student in myStudents" :key="student.studentId">
							<view class="top">
								<text>课程名称: {{student.courseName}}</text>
								<text>学生姓名: {{student.teacher}}</text>
								<text>学生学号: {{student.studentId}}</text>
								<text>学生成绩: {{student.id}}</text>
							</view>
							<view class="bottom">
								<button @click="modifyStuInfo(student)">修改</button>
								<button @click="deleteStuInfo(student.studentId)">删除</button>
							</view>
						</view>

					</view>
				</view>
			</template>

			<template v-if="openSection.importStuInfo">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>导入</text>
						</view>
					</view>

					<view class="password_input_wrapper">
						<text>输入学号</text>
						<input type="text" v-model="stu_id">
					</view>
					<view class="password_input_wrapper">
						<text>输入班级</text>
						<input type="text" v-model="stu_class">
					</view>
					<view class="password_input_wrapper">
						<text>输入姓名</text>
						<input type="text" v-model="stu_name">
					</view>

					<view class="button_section">
						<button class="confirm" @click="importOne">导入</button>
						<lsj-upload class="confirm" ref="lsjUpload0" childId="upload1" :option="stu_option" :size="size"
							:width="width" :height="height" :formats="formats" :debug="debug" :instantly="instantly"
							@change="onChange" @uploadEnd="onuploadEnd"
							style="{font-size: 15px;font-weight: 400;line-height: 32px;text-align: center;}">
							<view>批量导入</view>
						</lsj-upload>
						<button class="confirm" @click="downloadTemplate">下载模板</button>
					</view>

				</view>
			</template>

			<template v-if="openSection.myProfile">
				<view class="info_section">
					<text>我的信息</text>
					<view class="upLoadAvatar">
						<view class="image_wrapper">
							<image class="avatar" :src="require('@/static/avatar_big.png')" alt="" />
						</view>
					</view>

					<view class="brief_profile">
						<view class="top">
							<text>姓名: {{myProfile.teacherName}}</text>
							<text>工号: {{myProfile.teacherId}}</text>
						</view>
					</view>

				</view>
			</template>
		</view>
	</view>
</template>

<script>
	const AfDocument = uni.requireNativePlugin("Aq-ChooseFile");

	export default {
		data() {
			return {
				stu_option: {
					url: 'http://1.117.115.133:8080/inputstudentinfo',
					// 上传附件的key
					name: 'file',
				},
				// 选择文件后是否立即自动上传，true=选择后立即上传
				instantly: true,
				// 必传宽高且宽高应与slot宽高保持一致
				width: '62px',
				height: 'auto',
				// 限制允许上传的格式，空串=不限制，默认为空
				formats: '',
				// 文件上传大小限制
				size: 30,
				// 是否打印日志
				debug: true,
				openSection: {
					coursesManagement: true,
					stuManagement: false,
					myProfile: false,
					importStuInfo: false
				},
				stu_id: '',
				stu_class: '',
				stu_name: '',
				myProfile: {},
				myCourses: [],
				myStudents: [],
				templateUrl: 'http://1.117.115.133:9000/student/template_teacher.xlsx'
			};
		},
		onShow() {
			this.getMyCourses()
		},
		computed: {
			teacher_id() {
				return uni.getStorageSync('id')
			}
		},
		methods: {
			// 某文件上传结束回调(成功失败都回调)
			onuploadEnd(item) {
				uni.showToast({
					title: item.type,
					icon: 'success',
					duration: 2000
				});

				// 更新当前状态变化的文件
				this.files.set(item.name, item);

				// 演示上传完成后取服务端数据
				if (item['responseText']) {
					this.files.get(item.name).responseText = JSON.parse(item.responseText);
				}
				// 强制更新视图
				this.$forceUpdate();

			},
			// 文件选择回调
			onChange(files) {
				// 更新选择的文件 
				this.files = files;
				// 强制更新视图
				this.$forceUpdate();
			},
			handleExit() {
				uni.showModal({
					title: '确定退出？',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.redirectTo({
								url: '/pages/index/index'
							})
						} else if (res.cancel) {}
					}
				})
			},
			toMyProfile() {
				this.changeSection('myProfile')
			},
			changeSection(section) {
				this.term = ''
				for (let [key] of Object.entries(this.openSection)) {
					this.openSection[key] = false
				}
				this.openSection[section] = true
				switch (section) {
					case 'coursesManagement':
						this.getMyCourses()
						break
					case 'stuManagement':
						break
					case 'myProfile':
						this.getMyProfile()
						break
					case 'importStuInfo':
						break
				}
			},
			viewCourseInfo(courseName) {
				this.changeSection('stuManagement')
				this.$axios({
					url: '/teacher/getcoursestudentinfo',
					method: 'get',
					params: {
						courseName
					}
				}).then(({
					data
				}) => {
					this.myStudents = [...data]
				})
			},
			modifyStuInfo({
				studentId,
				courseName,
				id
			}) {
				uni.showModal({
					title: '修改成绩',
					editable: true,
					success: (res) => {
						console.log(res.content);

						if (res.confirm) {
							if (res.content <= 100 && res.content >= 0 && Number(res.content) !== 'NaN') {
								id = Number(res.content)
								this.$axios({
									url: '/teacher/changescore',
									method: 'post',
									params: {
										score: id,
										studentId,
										courseName
									}
								}).then(({
									data
								}) => {
									uni.showToast({
										title: data,
										icon: 'success',
										duration: 2000
									})
									this.viewCourseInfo(courseName)
								})
							} else {
								uni.showToast({
									title: '请输入正确成绩',
									icon: 'error',
									duration: 2000
								})
							}
						}
					}
				});
			},
			deleteStuInfo(studentId) {
				const index = this.myStudents.findIndex((student) => student.studentId === studentId)

				this.$axios({
					url: '/teacher/deletestudentinfo',
					method: 'post',
					params: {
						studentId
					}
				}).then(({
					data,
					code
				}) => {
					if (code === 200) {
						uni.showToast({
							title: data,
							icon: 'success',
							duration: 2000
						});

						this.myStudents.splice(index, 1)
					}

				})
			},
			importOne() {
				this.$axios({
					url: '/teacher/addstudentinfo',
					method: 'post',
					data: {
						studentName: this.stu_name,
						studentId: this.stu_id,
						className: this.stu_class
					}
				}).then(({
					code,
					data
				}) => {
					if (code === 200) {
						uni.showToast({
							title: data,
							icon: 'success',
							duration: 2000
						});
					}
					this.stu_class = ''
					this.stu_id = ''
					this.stu_name = ''
				})
			},
			downloadTemplate() {
				this.handleAndroidDownload(this.templateUrl)
			},
			handleAndroidDownload(url) {
				uni.downloadFile({
					url, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							uni.hideLoading();
							uni.showToast({
								title: "下载成功",
								icon: 'success',
								duration: 2000
							});
							let that = this;
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success(res) {
									that.savaPath = res.savedFilePath
								}
							});
							setTimeout(() => {
								//打开文档查看
								uni.openDocument({
									filePath: that.savaPath,
									success: function() {
										uni.showToast({
											title: "打开文档成功",
											icon: 'success',
											duration: 2000
										});
									}
								});
							}, 3000)
						} else {
							uni.hideLoading();
							uni.showToast({
								title: "下载失败",
								icon: 'error',
								duration: 2000
							});
						}

					}
				});
			},
			getMyProfile() {
				this.$axios({
					url: '/teacher/getinfo',
					method: 'get',
				}).then(({
					data
				}) => {
					this.myProfile = data
				})
			},
			getMyCourses() {
				this.$axios({
					url: '/teacher/getcourse',
					method: 'get',
					data: {
						id: uni.getStorageSync('id'),
						studentName: this.stu_name,
						studentId: this.stu_id,
						className: this.stu_class
					}
				}).then(({
					data
				}) => {
					this.myCourses = data
				})
			}
		},
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

		.exit::before {
			font-size: 36px;
		}

		text {
			font-size: 18px;
			font-weight: 700;
		}

		image {
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
				width: 108px;
				height: 108px;
				text-align: center;
				border-radius: 7.68px;
				border: 0.5px solid rgba(228, 228, 228, 1);

				text {
					line-height: 54px;
					font-size: 18px;
					font-weight: 700;
					color: white;
				}

				&:first-of-type {
					background: linear-gradient(180deg, rgba(255, 179, 97, 1) 0%, rgba(255, 215, 156, 1) 100%);
				}

				&:nth-of-type(2) {
					line-height: 108px;
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
			height: calc(45vh + 2.59vh + 2.59vh);
			border-radius: 7.68px;
			background: rgba(255, 255, 255, 0.5);

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;

				.top {
					display: flex;
					justify-content: space-between;
					width: 100%;

					text {
						font-size: 18px;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					width: 90%;
					margin-top: 12px;
				}

				text {
					font-size: 14px;
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
				height: calc(100% - 24px - 2.59vh - 24px);
				overflow: scroll;

				.course_info {
					height: 80px;
					margin-top: 24px;
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
						width: 80%;
						height: 100%;
						margin: 0 auto;

						text {
							font-size: 12px;
							font-weight: 400;
							letter-spacing: 0px;
							color: rgba(0, 0, 0, 1);
						}
					}
				}

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
						padding: 23px 24px;

						text {
							font-size: 18px;
							font-weight: 400;
							letter-spacing: 0px;
							color: rgba(0, 0, 0, 1);
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

			.upLoadAvatar {
				height: 176px;
				margin-top: 24px;
				opacity: 1;
				border-radius: 7.68px;
				background: rgba(106, 106, 106, 0.25);
				box-shadow: 0px 1px 7px 2px rgba(165, 164, 164, 0.21);

				.image_wrapper {
					position: relative;
					height: 100%;

					image {
						position: absolute;
						width: 48px;
						height: 48px;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);

						&.avatar {
							width: 128px;
							height: 128px;
						}
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

			.button_section {
				display: flex;

				.confirm {
					display: inline-block;
					width: 94px;
					margin: 0 auto;
					margin-top: 24px;
					padding: 0 16px;
					font-size: 15px;
					line-height: 32px;
					font-weight: 400;
					color: rgba(243, 167, 63, 1);
					border-radius: 12px;
					background: rgba(255, 246, 232, 1);
					border: 1px solid rgba(246, 221, 184, 1);
				}

			}
		}
	}
</style>
