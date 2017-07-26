$(function(){
$("#profess-tit1").click(function(){
 $(this).addClass("on");
 $("#profess-tit2").removeClass("on");
 $("#profess-tit3").removeClass("on");
// var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".tab_box>div.profess-list").eq(0).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
$("#profess-tit2").click(function(){
 $(this).addClass("on");
 $("#profess-tit1").removeClass("on");
 $("#profess-tit3").removeClass("on");
// var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".tab_box>div.profess-list").eq(1).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
$("#profess-tit3").click(function(){
 $(this).addClass("on");
 $("#profess-tit1").removeClass("on");
 $("#profess-tit2").removeClass("on");
// var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".tab_box>div.profess-list").eq(2).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
 
 
$(".tab_box .category").click(function(){
 $(this).addClass("on3").siblings().removeClass("on3");
 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".profess-list ul.cat-item").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
 
$(".tab_box .category").click(function(){
 $(this).addClass("on3").siblings().removeClass("on3");
 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".profess-list #jiaolian ul.cat-item").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
 
$(".tab_box .category").click(function(){
 $(this).addClass("on3").siblings().removeClass("on3");
 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".profess-list #caipan ul.cat-item").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
 
$("#service-player").click(function(){
 $(this).addClass("on2");
 $("#new-player").removeClass("on2");
 $(".player-listing").eq(0).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
$("#new-player").click(function(){
 $(this).addClass("on2");
 $("#service-player").removeClass("on2");
 $(".player-listing").eq(1).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });

$("#service-coach").click(function(){
 $(this).addClass("on2");
 $("#new-coach").removeClass("on2");
 $(".coach-listing").eq(0).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
$("#new-coach").click(function(){
 $(this).addClass("on2");
 $("#service-coach").removeClass("on2");
 $(".coach-listing").eq(1).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
 
$(".create_team .btn-group-justified .btn-group").click(function(){
	 $(this).addClass("on4").siblings().removeClass("on4");
	 });

 });