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

Pace.on("done", function() {
    jQuery(function($) {
        $(".pace-pack").remove();

        var successSound = new buzz.sound(["images/m01.mp3"]),
            bgSound = new buzz.sound(["images/m02.mp3"],{
                volume: 100,
                autoPlay: true,
                loop: true
            });
        bgSound.loop().play();

        var showModal = function() {
            var modalBackdrop = $('<div class="modal-backdrop fade"></div>');
            modalBackdrop.appendTo('body');
            window.setTimeout(function() {
                modalBackdrop.addClass('in');
            }, 16);
        };

        var hideModal = function() {
            $('.modal-backdrop').removeClass('in').on('transitionEnd webkitTransitionEnd', function() {
                $(this).remove();
            });
        };

        $('.share-guild').on('click', function() {
            hideShareGuild();
        });

        var showShareGuild = function() {
            showModal();
            $('.share-guild').show();
        };
        var hideShareGuild = function() {
            hideModal();
            $('.share-guild').hide();
        };
        //分享
        $('.btn-share').on('click', function(e) {
            e.preventDefault();
            showShareGuild();
        });
        $(document).on('click', '.modal-share', function() {
            hideShareGuild();
        });

        $('.collapse .toggle').click(function(e) {
            e.preventDefault();
            $(this).closest('.collapse').toggleClass('in');
        });

        var shakeHandler = function() {
            $(".scenes-2").hide();
            $(".scenes-1").show();
            $(".copyright").fadeOut("normal");
            successSound.play();
            window.setTimeout(function() {
                $(".scenes-1").addClass("door-opened");
                shake.stop();
                window.setTimeout(function() {
                    $(".scenes-1").fadeOut(function() {
                        $(".scenes-1").removeClass("door-opened");
                        $(".scenes-2").fadeIn(function(){
                            shake.start();
                        });
                        $(".menshen").hide();
                        var b = parseInt(5 * Math.random() + 1);
                        $(".menshen-" + b).show();
                        $(".copyright").fadeIn("normal");

                    });
                }, 3e3)
            }, 100)
        };

        var shake = new Shake({
            threshold: 15,
            timeout: 1e3
        });
        shake.start();
        window.addEventListener("shake", shakeHandler, false);

        // $('.door').on('touchstart', shakeHandler);
    });
});
