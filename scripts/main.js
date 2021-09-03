"use strict";

//gNavi スクロール時の背景白処理
$(document).ready(function () {
    $(window).scroll(function () {
        var w = jQuery(window).width();　//現在のウィンドウ幅の取得
        var x = 768; //制限するウィンドウ幅の設定
        if (w >= x) {
            if ($(this).scrollTop() > 0) {
                $('.header').css('background-color', '#FFFFFF');
                $('.header-nav .nav-list-l a').css('color', '#000000');
                $('.header-nav .nav-list-l img').attr('src', './asset/img/logo02.png');
                $('.header-nav .nav-list-l .nav-item-mb a').css('color', '#FFF');
            } else {
                $('.header').css('background', 'none');
                $('.header-nav .nav-list-l a').css('color', '#FFFFFF');
                $('.header-nav .nav-list-l img').attr('src', './asset/img/top-header-logo.png');
                
            }
        } else {
            if ($(this).scrollTop() > 0) {
                $('.header').css('background-color', '#FFFFFF');                $('.header-nav .nav-list-l nav-item').css('color', '#000');
                $('.header-nav .nav-list-l img').attr('src', './asset/img/logo02.png');
                $('.bar').css('background-color', '#000')
                $('.header-nav .nav-list-l nav-item-mb').css('color', '#FFF');
            } else {
                $('.header').css('background', 'none');
                $('.header-nav .nav-list-l nav-item').css('color', '#000');
                $('.header-nav .nav-list-l img').attr('src', './asset/img/logo02.png');
                $('.bar').css('background-color', '#000')
                $('.header-nav .nav-list-l nav-item-mb').css('color', '#FFF');
            }
        }
    });
});

$(function(){
    $('a[href^=#]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});

//top フェードインとズームイン処理
$(document).ready(function () {
    //gNaviのフェードイン
    $('.header').hide().fadeIn(2000);
    //top画像のフェードインとズームイン・スライドショー処理
    //設定
    var fade_speed = 1000;//フェードイン・アウトの時間
    var interval = 3000;//画像切り替えの間隔
    $('.top').hide().fadeIn(3000, function () {
        //最初のactiveクラス付与 ズームインする
        $('.bg-img img:first').addClass('active zoom' );
        //changeImageファンクションの作成
        var changeImage = function () {
            var $active = $('.bg-img img.active');
            var $next = $active.next('img').length?$active.next("img"):$(".bg-img img:first");
            //activeクラスのフェードインとフェードアウト
            $next.fadeIn(fade_speed).addClass("active");
            $active.fadeOut(fade_speed).removeClass("active");
        }
        //changeImageファンクションをintervalの間隔で実行
        setInterval(changeImage,interval);
    });
});

//モーダルの処理
$("#modal-open").click(
    function () {
		//[id:modal-open]をクリックしたら起こる処理
        //キーボード操作などにより、オーバーレイが多重起動するのを防止する
        $(this).blur() ;	//ボタンからフォーカスを外す
        if($("#modal-overlay")[0]) return false ;		//新しくモーダルウィンドウを起動しない [下とどちらか選択]
        //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する [上とどちらか選択]

        //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
        $("body").append('<div id="modal-overlay"></div>');

        //[$modal-overlay]をフェードインさせる
        $("#modal-overlay").fadeIn("slow");
        //[$modal-content]をフェードインさせる
        $("#modal-content").fadeIn("slow");
	}
);

$("#modal-open").click(
    function () {
     //センタリングをする関数
        function centeringModalSyncer(){
            //画面(ウィンドウ)の幅を取得し、変数[w]に格納
            var w = $(window).width();
            //画面(ウィンドウ)の高さを取得し、変数[h]に格納
            var h = $(window).height();
            //コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
            var cw = $("#modal-content").outerWidth();
            //コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
            var ch = $("#modal-content").outerHeight();
            //コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
            var pxleft = ((w - cw)/2);
            //コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
            var pxtop = ((h - ch)/2);
            //[#modal-content]のCSSに[left]の値(pxleft)を設定
            $("#modal-content").css({"left": pxleft + "px"});
            //[#modal-content]のCSSに[top]の値(pxtop)を設定
            $("#modal-content").css({"top": pxtop + "px"});
        }
    centeringModalSyncer();
});

$("#modal-overlay,#modal-close").unbind().click(function(){
	//[#modal-overlay]、または[#modal-close]をクリックしたら起こる処理
    //[#modal-overlay]と[#modal-close]をフェードアウトする
    $("#modal-content,#modal-overlay").fadeOut("slow",function(){
	//フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
	$("#modal-overlay").remove();
});
});


$(function () {
    // フェードイン
    $(window).scroll(function () {
        const wHeight = $(window).height();
        const scrollAmount = $(window).scrollTop();
        $('.scrollanime').each(function () {
            const targetPosition = $(this).offset().top;
            if(scrollAmount > targetPosition - wHeight + 60) {
                $(this).addClass("fadeInDown");
            }
        });
    });

    //ハンバーガメニュー
    $('.burger-btn').on('click',function(){//.burger-btnをクリックすると
        $('.burger-btn').toggleClass('close');//.burger-btnにcloseクラスを付与(ボタンのアニメーション)
        $('.nav-wrapper').toggleClass('nav-fadein');//.nav-wrapperが0.5秒でフェードイン(メニューのフェードイン)
    });

    $('.nav-item').on('click',function(){//.nav-itemをクリックすると
        $('.burger-btn').removeClass('close');//.burger-btnにcloseクラスを削除(ボタンのアニメーション)
        $('.nav-wrapper').removeClass('nav-fadein');//.nav-wrapperからnav-fadeinクラスを削除(メニューのフェードイン)
    });

        $('a').on('click',function(){//.nav-itemをクリックすると
        $('.burger-btn').removeClass('close');//.burger-btnにcloseクラスを削除(ボタンのアニメーション)
        $('.nav-wrapper').removeClass('nav-fadein');//.nav-wrapperからnav-fadeinクラスを削除(メニューのフェードイン)
    });

});





