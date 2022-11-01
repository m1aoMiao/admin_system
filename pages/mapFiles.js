export function getMediaFiles() { //获取本地文件              		
	let environment = plus.android.importClass("android.os.Environment");
	let sdRoot = environment.getExternalStorageDirectory(); //获取手机根目录              		
	this.filePath = {
		image: [],
		video: []
	}; //过滤到的文件信息              		
	mapFile(sdRoot); //递归过滤  
	console.log('this.filePath :>> ', this.filePath); //过滤结果  
}

const mapFile = function(path) { // 遍历目录下的所有文件和文件夹  
	let fileObj = plus.android.importClass("java.io.File");
	let files = plus.android.invoke(path, "listFiles");
	let len = files.length;
	for (let i = 0; i < len; i++) {
		let file = files[i];
		// 过滤隐藏文件以及名字叫“Android”的文件夹（自己可以自定义过滤）  
		if (!plus.android.invoke(file, "isHidden") && plus.android.invoke(file, "getName") !=
			'Android') { // 非隐藏文件执行操作  
			if (plus.android.invoke(file, "isDirectory")) { // 判断是文件还是文件夹  
				this.mapFile(new fileObj(plus.android.invoke(file, "getAbsolutePath"))); //文件夹递归  
			} else {
				let size = this.getFileSize(file)
				if (plus.android.invoke(file, "getName").endsWith('.jpg') || plus.android.invoke(file,
						"getName").endsWith('.png')) { //获取jpg、png文件（可自定义修改）  
					console.log('file name :>> ', plus.android.invoke(file, "getName"), '; size :>> ',
						size);
					this.filePath.image.push({
						path: plus.android.invoke(file, "getAbsolutePath"), //文件绝对路径  
						name: plus.android.invoke(file, "getName"), //文件名称，包含后缀  
						size: size, //文件大小  
						lastModified: plus.android.invoke(file, "lastModified") //文件最后修改时间戳  
					})
				} else if (plus.android.invoke(file, "getName").endsWith('.mp4') || plus.android.invoke(
						file, "getName").endsWith(
						'.mp3'
					)) { //获取mp3、mp4文件（可自定义修改）              						
					console.log('file name :>> ', plus.android.invoke(file, "getName"), '; size :>> ',
						size);
					this.filePath.video.push({
						path: plus.android.invoke(file, "getAbsolutePath"),
						name: plus.android.invoke(file, "getName"),
						size: size,
						lastModified: plus.android.invoke(file, "lastModified")
					})
				}
			}
		}
	}
}
