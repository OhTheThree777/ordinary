$(function(){
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
		}

		var a =getUrlParam("id");
	
		
		
		$.ajax({
		     url:'../teamIndexController/selectOneCoach.json',
		     data:{'id':a},
		     type:"post",
		     dataType:"json",
		     success:function(data){

		    	 var imgdata=' <p class="am-align-left">'
		    		 	imgdata+= '<img class="person_pic am-circle" src="'+isUndefined(data.data.obj.coach_portrait)+'" alt=""/>   	  </p>'
		    		 	imgdata+=  '</div>';
		    	 		imgdata+='<div class="am-align-left">';
		    	 		imgdata+='<h2 class="person_name">'+isUndefined(data.data.obj.name)+'</h2>';
		    	 		imgdata+='<div><small>性别：'+isUndefined(data.data.obj.sex)+'</small></div>';
		    	 		imgdata+='<div><small>生日：'+isUndefined(data.data.obj.birdate)+'</small></div>';
		    	 		imgdata+='<div><small>国籍：'+isUndefined(data.data.obj.coach_birthplace)+'</small></div>';
		    	 		imgdata+=	 ' <div><small>所属队伍：'+isUndefined(data.data.obj.team_name)+'</small></div>';
		    	 		
		    	 $('#person_img_append').append(imgdata);
		    	 if(data.data.obj.person_body!=undefined){
		    	 var personrecord='<p><small>'+isUndefined(data.data.obj.coach_body)+'</small></p>';
		    	 $("#person_record_append").append(personrecord);
		    	 $("#person_record_tips").hide();
		    	 }
		    	 
		     }
		 });
		
	
})
