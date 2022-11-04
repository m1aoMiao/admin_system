<template>
	<view class="container">
		<view class="header">
			<uni-icons class='exit' type="home" @click="handleExit" />
			<text>学生信息管理系统</text>
			<image :src="require('@/static/avatar.png')" alt="" @click="toMyProfile" />
		</view>
		<view class="main_section">
			<text class="slogen">Hello！{{stu_id}}</text>
			<view class="button_wrapper">
				<view @click="changeSection('courseSelectInquiry')">
					<text>选课</br>查询</text>
				</view>
				<view @click="changeSection('courseInfo')">
					<text>课程</br>信息</text>
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
							<image :src="require('@/static/arrow_up.png')" alt="" />
						</view>
						<view class="bottom">
							<text>课程名称</text>
							<text>课程学分</text>
							<text>分数</text>
							<text>绩点</text>
						</view>
					</view>
					<view class="main">
						<view class="stu_info" v-for="(course,index) in myGradePoints" :key="index">
							<view class="brief_info">
								<text>{{course.courseName}}</text>
								<text>{{course.point}}</text>
								<text>{{course.score}}</text>
								<text>{{course.GPA}}</text>
							</view>
						</view>
					</view>

					<uni-icons class='downLoad' type="cloud-download" @click="handleDownLoad('成绩单')"></uni-icons>
				</view>
			</template>

			<template v-if="openSection.courseInfo">
				<view class="info_section">
					<view class="head">
						<view class="bottom">
							<text>课程名称</text>
							<text>课程学分</text>
							<text>教师</text>
							<text>开设学期</text>
						</view>
					</view>
					<view class="main">
						<view class="stu_info" v-for="(course,index) in allCourses" :key="index">
							<view class="brief_info">
								<text>{{course.courseName}}</text>
								<text>{{course.point}}</text>
								<text>{{course.teacher}}</text>
								<text>{{course.term}}</text>
							</view>
						</view>
					</view>

					<uni-icons class='downLoad' type="cloud-download" @click="handleDownLoad('课程信息')"></uni-icons>
				</view>
			</template>

			<template v-if="openSection.courseSelectInquiry">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<uni-data-select class="select" v-model="term" :localdata="termRange" @change="chooseTerm">
							</uni-data-select>
							<image :src="require('@/static/arrow_up.png')" alt="" />
						</view>
						<view class="bottom">
							<text>课程名称</text>
							<text>教师</text>
							<text>开课时间</text>
							<text>选课情况</text>
						</view>
					</view>
					<view class="main">
						<view :class="{'stu_info':true,'open':openIndex === index}" v-for="(course,index) in myCourses"
							:key="index" @click="handleOpen(index)">
							<template v-if="openIndex === index">
								<view class="top">
									<text>课程名称: {{course.courseName}}</text>
									<text>授课老师: {{course.teacher}}</text>
									<text>开课学期: {{course.term}}</text>
									<text>选课情况: {{course.className}}</text>
								</view>
								<button v-if="course.className !=='未选'"
									@click="deleteCourse(course.courseName)">退课</button>
								<button v-else @click="addCourse(course.courseName)">新增选课</button>
							</template>

							<template v-else>
								<view class="brief_info">
									<text>{{course.courseName}}</text>
									<text>{{course.teacher}}</text>
									<text>{{course.term}}</text>
									<text>{{course.className}}</text>
								</view>
							</template>

						</view>
					</view>

					<uni-icons class='downLoad' type=" cloud-download" @click="handleDownLoad('选课信息')"></uni-icons>
				</view>
			</template>

			<template v-if="openSection.myProfile">
				<view class="info_section">
					<text>我的信息</text>
					<view class="upLoadAvatar">
						<view class="image_wrapper">
							<image class="avatar" :src="require('@/static/avatar_big.png')" alt="" />
							<!-- <image :src="require('@/static/upload.png')" alt="" /> -->
						</view>
					</view>

					<view class="brief_profile">
						<view class="top">
							<text>姓名:{{myProfile.studentName}}</text>
							<text>学号:{{myProfile.studentId}}</text>
							<text>班级:{{myProfile.className}}</text>
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
						<input type="password" v-model="old_password">
					</view>

					<view class="password_input_wrapper">
						<text>新密码</text>
						<input type="password" v-model="new_password">
					</view>

					<view class="password_input_wrapper">
						<text>再次输入新密码</text>
						<input type="password" v-model="confirm_password">
					</view>

					<button class="confirm" @click="confirmPassword">确认</button>

				</view>
			</template>

			<template v-if="openSection.GPACalculator">
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>GPA计算器(点击成绩进行修改)</text>
						</view>

					</view>

					<view class="GPA_detail">
						<text>GPA: </text>
						<text>{{GPA}}</text>
					</view>

					<view class="course_info">
						<view class="GPA_detail" v-for="course,index in myGradePoints" :key="index"
							@click="modifyGrade(course.courseName)">
							<text>{{course.courseName}}</text>
							<text>{{course.GPA}}</text>
						</view>
					</view>

					<button class="confirm" @click="resetGPA">重新计算</button>

				</view>
			</template>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isModify: false,
				url: '',
				openSection: {
					transcript: false,
					courseSelectInquiry: false,
					myProfile: false,
					changePassword: false,
					GPACalculator: false,
					courseInfo: false
				},
				myProfile: '',
				myCourses: [],
				GPA: "",
				allCourses: [],
				myGradePoints: [],
				originGPA: [],
				myCourseScore: [],
				old_password: '',
				new_password: '',
				confirm_password: '',
				openIndex: 0,
				isOpen: true,
				term: '',
				termRange: [{
						value: 1,
						text: "第一学期"
					},
					{
						value: 2,
						text: "第二学期"
					},
					{
						value: 3,
						text: "第三学期"
					},
					{
						value: 4,
						text: "第四学期"
					},
					{
						value: 5,
						text: "第五学期"
					},
					{
						value: 6,
						text: "第六学期"
					},
					{
						value: 7,
						text: "第七学期"
					},
					{
						value: 8,
						text: "第八学期"
					},
				]
			};
		},
		computed: {
			stu_id() {
				return uni.getStorageSync('id')
			},
		},
		watch: {
			myGradePoints: {
				deep: true,
				handler() {
					let points = 0
					let GPAs = 0

					this.myGradePoints.forEach((course) => {
						if (course.score >= 0) {
							GPAs += Number(course.GPA * course.point)
						}
						points += Number(course.point)
					})

					this.GPA = (GPAs / points).toFixed(2)
				}
			}
		},
		methods: {
			deleteCourse(courseName) {
				this.$axios({
					url: '/student/deleteCourse',
					method: 'post',
					params: {
						courseName,
						term: this.term
					}
				}).then(({
					data
				}) => {
					uni.showToast({
						title: data,
						icon: 'success',
						duration: 2000
					})
					this.getTermCourses(this.term)
				})
			},
			addCourse(courseName) {
				this.$axios({
					url: '/student/addCourse',
					method: 'post',
					params: {
						courseName,
						term: this.term
					}
				}).then(({
					data
				}) => {
					uni.showToast({
						title: data,
						icon: 'success',
						duration: 2000
					})
					this.getTermCourses(this.term)
				})
			},
			modifyGrade(courseName) {
				uni.showModal({
					title: '修改成绩',
					editable: true,
					success: (res) => {
						if (res.confirm) {
							if (res.content <= 100 && res.content >= 0 && Number(res.content) !== 'NaN') {
								this.myGradePoints.forEach((course) => {
									if (course.courseName === courseName) {
										course.score = Number(res.content)
									}
								})
								this.calculateGPA(this.myGradePoints)
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
			resetGPA() {
				this.getGradePoint(0)
			},
			calculateGPA(courses) {
				courses.forEach((course) => {
					if (course.score === -1) {
						course.score = '未考'
						course.GPA = 0.0
					} else {
						const GPA = (course.score >= 60 ? (course.score - 50) * 0.1 : 0.0)
						course.GPA = GPA.toFixed(2)
					}
				})
				return courses
			},
			downLoadTranscript(term) {
				term = term || 0
				this.$axios({
					url: '/student/outReport',
					method: 'get',
					params: {
						term
					}
				}).then(({
					data
				}) => {
					if (!data) {
						return
					}
					this.handleAndroidDownload(data)
				})
			},
			downLoadCourseList() {
				this.$axios({
					url: '/student/outCourseInfo',
					method: 'get',
				}).then(({
					data
				}) => {
					if (!data) {
						return
					}
					this.handleAndroidDownload(data)
				})
			},
			downLoadCourseSelection(term) {
				if (term) {
					this.$axios({
						url: '/student/outChooseCourse',
						method: 'get',
						params: {
							term
						}
					}).then(({
						data
					}) => {
						if (!data) {
							return
						}
						this.handleAndroidDownload(data)
					})
				} else {
					uni.showToast({
						title: "请选择学期",
						icon: 'error',
						duration: 2000
					});
				}

			},
			handleDownLoad(type) {
				uni.showLoading({
					title: '下载'
				});

				if (type === '成绩单') {
					this.downLoadTranscript(this.term)
				} else if (type === '课程信息') {
					this.downLoadCourseList()
				} else {
					this.downLoadCourseSelection(this.term)
				}
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
									console.log(res.savedFilePath);
									that.savaPath = res.savedFilePath
								}
							});
							setTimeout(() => {
								console.log(that.savaPath);
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
					case 'myProfile':
						this.getMyProfile()
						break
					case 'courseSelectInquiry':
						this.getTermCourses()
						break
					case 'transcript':
						this.getGradePoint()
						break
					case 'courseInfo':
						this.getAllCourses()
						break
					case 'GPACalculator':
						this.getGradePoint(0)
						break
					case 'changePassword':
						break
				}
			},
			chooseTerm(term) {
				if (term) {
					if (this.openSection.transcript) {
						this.getGradePoint(term)
					} else if (this.openSection.courseSelectInquiry) {
						this.getTermCourses(term)
					}
				} else {
					if (this.openSection.transcript) {
						this.getGradePoint()
					} else if (this.openSection.courseSelectInquiry) {
						this.getTermCourses()
					}
				}
			},
			handleOpen(index) {
				if (!this.isOpen) {
					this.isOpen = !this.isOpen
					this.openIndex = index
				} else if (this.openIndex === index) {
					this.isOpen = !this.isOpen
					this.openIndex = -1
				} else {
					this.openIndex = index
				}
			},
			modifyPassword() {
				this.openSection.myProfile = false
				this.openSection.changePassword = true
			},
			confirmPassword() {
				if (this.new_password.trim() === this.old_password.trim()) {
					uni.showToast({
						title: "新旧密码需不同",
						icon: 'error',
						duration: 2000
					});
					this.new_password = ''
					this.old_password = ''
					this.confirm_password = ''
				} else if (this.new_password.trim() !== this.confirm_password.trim()) {
					uni.showToast({
						title: "两次新密码不同",
						icon: 'error',
						duration: 2000
					});
					this.new_password = ''
					this.old_password = ''
					this.confirm_password = ''
				} else {
					this.$axios({
						url: '/student/changePassword',
						method: 'post',
						headers: {
							token: uni.getStorageSync('token')
						},
						params: {
							newPassword: this.confirm_password.trim(),
							oldPassword: this.old_password.trim()
						}
					}).then(({
						message,
						code
					}) => {
						if (code === 200) {
							uni.showToast({
								title: message,
								icon: 'success',
								duration: 2000
							});
						} else {
							uni.showToast({
								title: message,
								icon: 'error',
								duration: 2000
							});
						}
						this.new_password = ''
						this.old_password = ''
						this.confirm_password = ''
					})
				}
			},
			getAllCourses() {
				this.$axios({
					url: '/student/getCourse',
					method: 'get',
					headers: {
						token: uni.getStorageSync('token')
					},

				}).then(({
					data
				}) => {
					this.allCourses = [...data]
				})
			},
			getTermCourses(term) {
				if (term) {
					this.$axios({
						url: '/student/chooseCourseList',
						method: 'get',
						headers: {
							token: uni.getStorageSync('token')
						},
						params: {
							term
						}
					}).then(({
						data,
						code,
						message
					}) => {
						if (code === 200) {
							this.myCourses = [...data]
						} else {
							this.myCourses = []
							uni.showToast({
								title: message,
								icon: 'error',
								duration: 2000
							});
						}
					})
				} else {
					this.myCourses = []
				}

			},
			getGradePoint(term) {
				if (term || term === 0) {
					this.$axios({
						url: '/student/report',
						method: 'get',
						params: {
							term
						}
					}).then(({
						data,
						code,
						message
					}) => {
						if (code === 200) {
							data = this.calculateGPA(data)
							this.myGradePoints = [...data]
							this.originGPA = [...data]
						} else {
							this.myGradePoints = []
							uni.showToast({
								title: message,
								icon: 'error',
								duration: 2000
							});
						}
					})
				} else {
					this.myGradePoints = []
				}

			},
			getMyProfile() {
				this.$axios({
					url: '/student/getinfo',
					method: 'get',
					headers: {
						token: uni.getStorageSync('token')
					}
				}).then(({
					data
				}) => {
					this.myProfile = data
				})
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
			justify-content: space-between;
			margin-top: 32px;

			view {
				display: inline-block;
				width: 14.6vw;
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
					background: linear-gradient(180deg, rgba(114, 160, 212, 1) 0%, rgba(164, 217, 219, 1) 100%);
				}

				&:nth-of-type(3) {
					line-height: 14.6vw;
					background: linear-gradient(180deg, rgba(252, 152, 139, 1) 0%, rgba(255, 184, 203, 1) 100%);
				}

				&:nth-of-type(4) {
					background: linear-gradient(180deg, rgba(247, 216, 210, 1) 0%, rgba(251, 198, 169, 1) 100%);
				}

				&:last-of-type {
					background: linear-gradient(180deg, rgba(140, 189, 145, 1) 0%, rgba(204, 230, 161, 1) 100%);
				}
			}
		}

		.info_section {
			position: relative;
			margin-top: 14px;
			padding: 2.59vh 3.7vw;
			height: calc(50vh + 2.59vh + 2.59vh);
			border-radius: 7.68px;
			background: rgba(255, 255, 255, 0.5);
			overflow: scroll;

			.downLoad::before {
				position: absolute;
				right: 20px;
				bottom: 20px;
				font-size: 48px;
			}

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

				image {
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
						width: calc(90% - 16px);
						height: 100%;
						padding: 0 8px;
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

				input {
					width: 50px;
					margin-left: 36px;
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

			.course_info {
				height: calc(100% - 160px);
				overflow: scroll;
			}

		}
	}
</style>
