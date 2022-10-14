<script>
export default {
	onLaunch() {},
	onShow() {},
	onHide() {}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
page {
	background: linear-gradient(
		180deg,
		rgba(255, 198, 189, 1) 0%,
		rgba(208, 245, 237, 1) 18.12%,
		rgba(154, 220, 228, 1) 51.39%,
		rgba(199, 232, 240, 1) 88.01%,
		rgba(189, 233, 242, 1) 100%
	);
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
