window.onload = function() {
	searchEffect();
	timeBack();
	bannerEffect();
}
function searchEffect() {
	// 获取banner的宽度
	var banner = document.querySelector(".jd_banner");

	var bannerHeight = banner.offsetHeight;

	// 获取header搜索块
	var search = document.querySelector(".jd_search");

	// 获取当前屏幕滚动时 banner滚出去的距离
	window.onscroll = function() {
		var offsetTop = document.body.scrollTop;
		var opacity = 0;
		// 计算比例 获取透明值 设置背景颜色样式
		if(offsetTop < bannerHeight) {
			opacity = offsetTop/bannerHeight;
			search.style.backgroundColor="rgba(233,35,34,"+opacity+")"
		}
	}
}

// 倒计时效果
function timeBack() {
	// 获取用于展示时间的span
	var time = document.querySelector(".jd_sk_time");
	var spans = time.querySelectorAll("span");
	console.log(spans)
	// 设置初始倒计时时间 以秒作为单位
	
	var totalTime = 37000;
	// 开启定时器
	
	var timerId = setInterval(function() {
		totalTime--;
		if(totalTime < 0) {
			clearInterval(timerId);
			return;
		}
		var hour = Math.floor(totalTime/3600);
		var minute = Math.floor(totalTime%3600/60);
		var second = Math.floor(totalTime%60);
		spans[0].innerHTML = Math.floor(hour/10);
		spans[1].innerHTML = Math.floor(hour%10);


		spans[3].innerHTML = Math.floor(minute/10);
		spans[4].innerHTML = Math.floor(minute%10);


		spans[6].innerHTML = Math.floor(second/10);
		spans[7].innerHTML = Math.floor(second%10);
	},1000)
}

// 轮播图开始
 function bannerEffect() {
 	// 获取轮播图结构
 	var banner = document.querySelector(".jd_banner");
 	// 获取图片容器
 	var imgBox = document.querySelector("ul:first-of-type");
 	// 获取原始第一张图片
 	
 	var first = imgBox.querySelector("li:first-of-type");

 	// 获取原始最后一张图片
 	 var last = imgBox.querySelector("li:last-of-type");

 	 // 将原始第一张克隆到最后一张
 	 
 	 imgBox.appendChild(first.cloneNode(true));

 	 // 将原始最后一张图片克隆到第一张
 	 
 	 imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

 	 // 获取所有的li
 	 
 	 var lis = imgBox.querySelectorAll("li");

 	 // 获取li元素的数量
 	 
 	 var count = lis.length;

 	 // 获取banner的宽度
 	 
 	var bannerWidth = banner.offsetWidth;

 	// 设置图片盒子的宽度
 	
 	imgBox.style.width = count * bannerWidth + "px";

 	// 设置每一个li元素的宽度
 	
 	for(var i = 0; i < lis.length; i++) {
 		lis[i].style.width = bannerWidth + "px";
 	}
 	// 设置图片索引
 	
 	var index = 1;
 	// 设置默认的偏移值
 	imgBox.style.left = -bannerWidth + "px";

 	// 当屏幕发生变化时2
 	
 	window.onresize = function() {
 		// 获取banner的宽度 覆盖全局的宽度值
 		
 		bannerWidth = banner.offsetWidth;

 		// 设置图片盒子的宽度
 		
 		imgBox.style.width = count * bannerWidth +"px";

 		// 设置每一个li元素的宽度
 		for(var i = 0; i < lis.length; i++) {
 			lis[i].style.width = bannerWidth + "px";

 		}
 		// 重新设置定位值
 		imgBox.style.left = -index * bannerWidth + "px";


 	}

 	var bj = function(index) {
 		var liAll = document.querySelector(".jd_circle").querySelectorAll("li");
 		for(var i = 0; i < liAll.length; i++) {
 			liAll[i].classList.remove("jd_current");
 		}
 		liAll[index -1].classList.add("jd_current");
 	}
 	// 定义一个定时器
 	var timerId;

 	// 实现自动轮播
 	var startTime = function() {
 		timerId = setInterval(function() {
 			index++;
 			imgBox.style.transition = "left 0.5s ease-in-out";
 			imgBox.style.left = (-index * bannerWidth)+ "px";
 			


 			// setTimeout(function(){
 			// 	if(index==count-1){
 			// 		index=1;
 			// 		/*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
 			// 		关闭过渡效果
 			// 		imgBox.style.transition="none";
 			// 		/*偏移到指定的位置*/
 			// 		imgBox.style.left=(-index*bannerWidth)+"px";
 			// 	}
 			// },500);



 		},2000)
 	}
 	startTime();

 	// 实现手动轮播
 	var startX,moveX,distanceX;

 	// 采用节流阀
 	var isEnd = true;

 	// 为图片添加触摸事件--触摸开始
 	imgBox.addEventListener("touchstart",function(e) {
 		startX = e.targetTouches[0].clientX;
 		clearInterval(timerId);
 		// 记录手指的初始位置
 		
 	})

 	imgBox.addEventListener("touchmove",function(e) {
 		if(isEnd) {
 			// 记录手指在滑动过程中的位置
 			moveX = e.targetTouches[0].clientX;

 			distanceX = moveX - startX;
 			imgBox.style.transition="none";

 			imgBox.style.left = (-index * bannerWidth+distanceX)+"px";

 		}
 		
 	})

 	/*添加触摸结束事件*/
 	/*touchend:松开手指触发*/
 	imgBox.addEventListener("touchend",function(e){
 		// 松开手指标记
 		isEnd = false;
 		/*console.log('touchend');*/
 		/*获取当前滑动的距离，判断距离是否超出指定的范围 100px*/
 		if(Math.abs(distanceX) > 100){
 			/*判断滑动的方向*/
            if(distanceX > 0){//上一张
            	index--;
            }
            else{ //下一张
            	index++;
            }
            /*翻页*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //得保证用户确实进行过滑动操作
        	/*回弹*/
        	imgBox.style.transition="left 0.5s ease-in-out";
        	imgBox.style.left=-index*bannerWidth+"px";
        }

        // 将所有的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;

    
    });

 	// 可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件
 	imgBox.addEventListener("webkitTransitionEnd",function() {
 		if(index === count - 1) {
 			index = 1;
 			imgBox.style.transition = "none";
 			imgBox.style.left = -index * bannerWidth + "px";
 		}
 		else if(index === 0) {
 			index = count -2;
 			imgBox.style.transition = "none";
 			imgBox.style.left = -index * bannerWidth + "px";
 		}
 		bj(index);
 		
 		setTimeout(function() {
 			

 			isEnd = true;
 			clearInterval(timerId);
 			//重新开启定时器
 			startTime();

 		},500);
 		console.log(index);

 		
 	})




 }