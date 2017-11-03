function getStyle(ele, style){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[style];
	}else{
		return ele.currentStyle[style];
	}
}
function startMove(elem, json, func){
	clearInterval(elem.timer);
	var iSpeed;
	var iCur;
	var bStop;
	elem.timer = setInterval(function(){
		bStop = true;
		for(var attr in json){
			iCur = attr === 'opacity' ? parseFloat(getStyle(elem,attr)) * 100 : parseInt(getStyle(elem,attr));
			iSpeed = attr === 'opacity' ? (parseFloat(json[attr])* 100 - iCur) / 7 : (parseInt(json[attr]) - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			elem.style[attr] = attr === "opacity" ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px';
			if(iCur !== (attr === 'opacity' ? parseFloat(json[attr]) * 100 : parseInt(json[attr]))){
				bStop = false;
			}
		}
		if(bStop){	
			clearInterval(elem.timer);	
			if(func){
				
				func();
			}
		}
	},30);
}
var jalousie = (function(){
	var jlsItem = document.getElementsByTagName('div');
	var len = jlsItem.length;
	var alterTimer;
	var isDownward = true;
	function alter(jlsItem){
		alterTimer = setInterval(function(){
			if(isDownward){
				move(jlsItem,'-50px');
			}else{
				move(jlsItem,'0');
			}
			isDownward = !isDownward;
		},2000);
	}
	function move(elemArr, dis){
		var i = 0;
		var singleTimer = setInterval(function(){
			if(i == len - 1){
				clearInterval(singleTimer);
			}
			startMove(elemArr[i],{'top': dis});
			i++;
		},100);
	}

	return function(){
		alter(jlsItem);
	};
}());
jalousie();
  