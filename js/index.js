/*函数区*/

searchFor = function(keyword){//搜索关键词
	if (keyword!='') window.open('https://list.tmall.com/search_product.htm?q='+keyword);
}
showSug = function() {//根据输入的关键词建立相应的script元素
	var list = document.getElementById('search-suggestion');
	var input = document.getElementById('search_input');
	list.innerHTML='';
	var script = document.createElement('script');
	var body = document.getElementsByTagName('body')[0];
	script.src='https://suggest.taobao.com/sug?code=utf-8&q='+input.value+'&callback=getsug'
	script.id = 'sugData';
	if(document.getElementById('sugData')){
		var sugData = document.getElementById('sugData');
		body.removeChild(sugData);
	};
	body.appendChild(script);
}
getsug = function(data) {//跨域搜索callback函数，获取推荐关键词列表
	var list = document.getElementById('search-suggestion');
	var sugs = data.result;
	for(var i=0; i<sugs.length;i++) {
		var sugLi = document.createElement('a');
		var txt = '<span class="float_left">';
		txt += sugs[i][0];
		txt += '</span>';
		txt += '<span class="float_right">';
		txt += '约' + sugs[i][1] + '个结果';
		txt += '</span>';
		sugLi.innerHTML = txt;
		sugLi.onmouseover=function(){
			this.className="hover";
		};
		sugLi.onmouseout=function(){
			this.className="";
		};
		sugLi.href='https://list.tmall.com/search_product.htm?q='+sugs[i][0];
		sugLi.target='_blank';
		list.appendChild(sugLi);
	}
}
sliderImgFn = function() {//轮播图模块初始化
		/*启动自动轮播*/
	var autoChangeImg = setInterval(function(){
		for(var i=0;i<oLi.length;i++){
			if(oLi[i].className=='selected'){
				for(var j=0; j<oLi.length; j++){
					oLi[j].className='';
					sliderImgs[j].style.display='none';
				}
				if(i==oLi.length-1) {
					sliderImgs[0].style.display='block';
					oLi[0].className='selected';
				}
				else{
					i++
					sliderImgs[i].style.display='block';
					oLi[i].className='selected';
				}
				return;
			}
		}
		
	},2000)
	var oLi = document.getElementsByClassName('slider-nav')[0].getElementsByTagName('li');
	var sliderImgs = document.getElementsByClassName('slider-img');
	/*绑定圈圈点击事件*/
	for(var i=0; i<oLi.length; i++) {
		(function(){
			var p=i;
			oLi[i].onclick=function() {		
			clearInterval(autoChangeImg);
			for(var j=0; j<oLi.length; j++){
					oLi[j].className='';
					sliderImgs[j].style.display='none';
				}
				sliderImgs[p].style.display='block';
				this.className='selected';
				autoChangeImg = setInterval(function(){
					for(var i=0;i<oLi.length;i++){
					if(oLi[i].className=='selected'){
						for(var j=0; j<oLi.length; j++){
							oLi[j].className='';
							sliderImgs[j].style.display='none';
						}
						if(i==oLi.length-1) {
							sliderImgs[0].style.display='block';
							oLi[0].className='selected';
						}
						else{
							i++
							sliderImgs[i].style.display='block';
							oLi[i].className='selected';
						}
						return;
					}
				}
				},2000)
				}
			})();	
		}
}

window.onload=function() {
	var p=-1;//命名不好
	var input = document.getElementById('search_input');//获取搜索框input元素，用于实时监测搜索值
	var list = document.getElementById('search-suggestion');//获取关键词推荐列表盒子
	var searchButton = document.getElementById('search-button');//获取搜索按钮用于绑定事件
	var searchNavList = document.getElementById('search-nav-list').getElementsByTagName('li');//搜索框下方推荐关键词
	sliderImgFn();//初始化轮播图

	input.oninput=function() {//绑定输入框内容改变事件
		showSug()
	};
	input.onkeydown=function(event){//绑定输入框键盘事件
		var e = event || window.event;
		var oLi = document.getElementById("search-suggestion").getElementsByTagName('a');
		// var inputV; 
		if(e.keyCode == 40 && oLi.length!=0) {
			p++;
			for(var i=0; i<oLi.length; i++) {
				oLi[i].className='';
			}
			if(p==oLi.length){
				p=0
			};
			oLi[p].className='hover';
			input.value=oLi[p].firstChild.innerHTML;
		}
		else if(e.keyCode == 38 && oLi.length!=0) {
			window.enent?window.event.returnValue = false : e.preventDefault();
			p--;
			for(var i=0; i<oLi.length; i++) {
				oLi[i].className='';
			}
			if(p<0){p=oLi.length-1};
			oLi[p].className='hover';
			input.value=oLi[p].firstChild.innerHTML;
		}
		else if(e.keyCode == 13) {
			window.enent?window.event.returnValue = false : e.preventDefault();
			searchFor(input.value);
		}
	};
	searchButton.onclick=function() {//绑定搜索按钮点击事件
		searchFor(input.value);
	};
	for(var i=0;i<searchNavList.length;i++){
		searchNavList[i].onclick=function(){
		searchFor(this.innerHTML)
	}
	}
}



