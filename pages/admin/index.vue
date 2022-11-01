<template>
	<view class="container">
		<view class="header">
			<uni-icons class='exit' type="home" @click="handleExit" />
			<text>学生信息管理系统</text>
			<image :src="require('@/static/avatar.png')" alt="" />
		</view>
		<view class="main_section">
			<text class="slogen">Hello！admin</text>

			<template>
				<view class="info_section">
					<view class="head">
						<view class="top">
							<text>导入</text>
						</view>
					</view>
					<view class="main">
						<view>
							<lsj-upload class="confirm" ref="lsjUpload0" childId="upload1" :option="stu_option"
								:size="size" :width="width" :height="height" :formats="formats" :debug="debug"
								:instantly="instantly" @change="onChange" @uploadEnd="onuploadEnd"
								style="{font-size: 15px;font-weight: 400;line-height: 32px;text-align: center;}">
								<view>导入学生</view>
							</lsj-upload>
						</view>

						<view>
							<lsj-upload class="confirm" ref="lsjUpload0" childId="upload1" :option="teacher_option"
								:size="size" :width="width" :height="height" :formats="formats" :debug="debug"
								:instantly="instantly" @change="onChange" @uploadEnd="onuploadEnd"
								style="{font-size: 15px;font-weight: 400;line-height: 32px;text-align: center;}">
								<view>导入老师</view>
							</lsj-upload>
						</view>
						<view>
							<lsj-upload class="confirm" ref="lsjUpload0" childId="upload1" :option="course_option"
								:size="size" :width="width" :height="height" :formats="formats" :debug="debug"
								:instantly="instantly" @change="onChange" @uploadEnd="onuploadEnd"
								style="{font-size: 15px;font-weight: 400;line-height: 32px;text-align: center;}">
								<view>导入课程</view>
							</lsj-upload>
						</view>

						<button class="confirm" @click="downloadTemplate">下载模板</button>
					</view>

				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stu_option: {
					url: 'http://1.117.115.133:8080/inputstudentinfo',
					// 上传附件的key
					name: 'file',
				},
				teacher_option: {
					url: 'http://1.117.115.133:8080/inputteacherinfo',
					// 上传附件的key
					name: 'file',
				},
				course_option: {
					url: 'http://1.117.115.133:8080/inputcourseinfo',
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
				stu_id: '',
				stu_class: '',
				stu_name: '',
				templateUrl: ''
			};
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
			importStudent() {

			},
			importTeacher() {

			},
			importCourse() {

			},
			downloadTemplate() {
				uni.showActionSheet({
					itemList: ['学生模板', '老师模板', '课程模板'],
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								this.templateUrl = 'http://1.117.115.133:9000/student/template-student.xlsx'
								break;
							case 1:
								this.templateUrl = 'http://1.117.115.133:9000/student/template-teacher.xlsx'
								break;
							case 2:
								this.templateUrl = 'http://1.117.115.133:9000/student/template-course.xlsx'
								break;

						}
						this.handleAndroidDownload(this.templateUrl)
					},
					fail(res) {
						console.log(res.errMsg);
					}
				});
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
		margin-top: 60px;

		text {
			font-size: 24px;
			font-weight: 700;
		}

		.info_section {
			margin-top: 14px;
			padding: 2.59vh 3.7vw;
			height: 60vh;
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
			}

			.main {
				text-align: center;
			}

			.confirm {
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
</style>
