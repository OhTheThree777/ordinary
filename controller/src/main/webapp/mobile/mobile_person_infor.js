/**
 * 
 */
$(function(){
	
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
		}
	
	var a =getUrlParam("id");
	//球队详细信息
	$.ajax({
	     url:'../teamIndexController/selectOnePersonnel.json',
	     data:{'id':a},
	     type:"post",
	     dataType:"json",
	     success:function(data){
//	    	  <div  class="am-align-left">
//	    	    <img class="person_pic am-circle" src="../img/user.png" alt="" onerror='this.src="../img/user.png"'>
//	    	  </div>
//	    	  <div  class="am-align-left">
//	    	    <h2 class="person_name">印度阿三</h2>
//	    	    <div><small>性别：男</small></div>
//	    	    <div><small>年龄：22岁</small></div>
//	    	    <div><small>地区：呼和浩特市</small></div>
//	    	    <div><small>运动项目：羽毛球</small></div>
//	    	  </div>
	    	 
//	    	 <!-- 	<p><small>出生日期：&nbsp;1993-04-24</small><small style="margin-left:4rem;">民族：&nbsp;汉族</small></p> -->
//	    	 <!-- 	<p><small>毕业学校：&nbsp;内蒙古师范大学</small><small style="margin-left:4rem;">学历：&nbsp;本科</small></p> -->
//	    	 <!-- 	<p><small>身高：&nbsp;164cm</small><small style="margin-left:4rem;">体重：&nbsp;57kg</small></p> -->
//	    	 <!-- 	<p><small>政治面貌：&nbsp;共青团员</small><small style="margin-left:4rem;">联系电话：&nbsp;15104710000</small></p> -->

	    	 var imgdata=' <p class="am-align-left">'
	    		 	imgdata+= '<img class="person_pic am-circle" src="'+isUndefined(data.data.obj.person_pic)+'" alt=""/>   	  </p>'
	    		 	imgdata+=  '</div>';
	    	 		imgdata+='<div class="am-align-left">';
	    	 		imgdata+='<h2 class="person_name">'+isUndefined(data.data.obj.person_name)+'"</h2>"';
	    	 		imgdata+='<div><small>性别：'+isUndefined(data.data.obj.person_sex)+'</small></div>';
	    	 		imgdata+='<div><small>生日：'+isUndefined(data.data.obj.person_birthday)+'</small></div>';
	    	 		imgdata+='<div><small>国籍：'+isUndefined(data.data.obj.person_nationality)+'</small></div>';
	    	 		imgdata+=	 ' <div><small>运动项目：'+isUndefined(data.data.map.name)+'</small></div>';
	    	 		imgdata+=	 ' <div><small>所属队伍：'+isUndefined(data.data.obj.team_name)+'</small></div>';
	    	 		
	    	 $('#person_img_append').append(imgdata);
	    	 var baseinfo='<p><small>地区：&nbsp;'+isUndefined(data.data.obj.person_address)+'</small></p>'
	    	 		baseinfo+='<p><small>身高：&nbsp;'+isUndefined(data.data.obj.person_height)+'</small></p>'
	    	 		baseinfo+='<p><small>体重：&nbsp;'+isUndefined(data.data.obj.person_weight)+'</small></p>'
	    	 		baseinfo+='<p><small>鞋号：&nbsp;'+isUndefined(data.data.obj.person_Shoe_size)+'</small></p>'
	    	 		baseinfo+='<p><small>毕业学校：&nbsp;'+isUndefined(data.data.obj.person_school)+'</small></p>'
	    	 		baseinfo+='<p><small>运动项目：&nbsp;'+isUndefined(data.data.map.name)+'</small></p>'
//	    			 运动项目根据teamtype设的 判断 123 来的数据也有问题
	    			 $('#person_info_append').append(baseinfo);
	    	 if(data.data.obj.person_body!=undefined){
	    	 var personrecord='<p><small>'+isUndefined(data.data.obj.person_body)+'</small></p>';
	    	 $("#person_record_append").append(personrecord);
	    	 $("#person_record_tips").hide();
	    	 }
	    	 
	     }
	 });
	
	
	
	
	
})


