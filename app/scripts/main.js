var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
    setTimeout(callback, 1000 / 60);
};
(function() {
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);
    var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
    var iLastTouch = null; //缓存上一次tap的时间
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
        document.body.addEventListener('touchend', function(event) {
            var iNow = new Date().getTime();
            iLastTouch = iLastTouch || iNow + 1;
            /** 第一次时将iLastTouch设为当前时间+1 */
            var delta = iNow - iLastTouch;
            if (delta < 300 && delta > 0) {
                event.preventDefault();
                return false;
            }
            iLastTouch = iNow;
        }, false);
    }

})();


jQuery(function($){
	$('body').on('touchstart', function(){
		$('.door').toggleClass('open');
	});
});