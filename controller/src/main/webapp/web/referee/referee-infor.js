var referee_id = $.cookie('referee_id');
var personflag = $.session.get("personFlag");
var racing_id =  $.session.get('Racing_Id');
var product_id = $.session.get('Product_Id');
$(function(){
		$.session.remove('Racing_Id');
		$.session.remove('Product_Id');
		//**********************************************************************************查询裁判状态*****************************************************************************
		var index = layer.load(0, {
		    shade : false
		});
		$.ajax({
			url:'../../refereeController/queryRefereeState.json',
			type:'post',
			data:{
				'occupationId':referee_id,
				'racingId':racing_id,
				'productId':product_id
				},
			dataType:'json',
			success:function(data){
				//拿到裁判的状态去判断是否显示按钮
				if(data.data.map.main_state == 0){
					if(personflag == 5){
						$("#toolbar").prepend("<button type='button' class='btn btn-success' id='countersign' onclick='countersign(1)'>设为主裁判</button>");
					}else{
						$("#toolbar").prepend("<button type='button' class='btn btn-info' disabled='disabled'>裁判</button>");
					}
					
				}else if(data.data.map.main_state == 1){
					if(personflag == 5){
						$("#toolbar").prepend("<button type='button' class='btn btn-danger' id='dismiss' onclick='countersign(2)'>解除主裁判</button>");
					}else{
						$("#toolbar").prepend("<button type='button' class='btn btn-info' disabled='disabled'>主裁判</button>");
					}
					
				}
				layer.close(index);
			},
			error : function() {
				lrError("服务器错误！");
				layer.close(index);
			}
		});
	
	
	
	
	
	
//***************************************************************************************加载裁判信息***********************************************************************************	
	var index = layer.load(0, {
	    shade : false
	});
	$.cookie("referee_id",null,{expires: 7,path: '/'});
	$.ajax({
		url:'../../refereeController/selectReferee.json',
		type:'post',
		data:{'id':referee_id},
		dataType:'json',
		success:function(data){
			var id=data.data.obj.id;
			var str1=$('<div class="clearfix" >'
				 +'			<img class="img img-thumbnail" src="'+data.data.obj.referee_pic+'"/>'
				 +'		</div>'
				 +'		<div class="clearfix" id="cock'+id+'">'
				 +'			<p style="margin-top: 5px;">'+isUndefined(data.data.obj.referee_name,"String")+'</p><p style="color:#BCBCBC;font-weight: bold;">'+data.data.obj.personProp+'</p>'
//				 +'			<div class="current_state">'+getCodeKey('../../','athlete_state',''+data.data.obj.referee_state+'')+'</div>'
				 +'		</div>');
			$("#basic_message").append(str1);
			var str2=$('<tr>'
				+'			<th>性 别</th>'
				+'			<td>'+getCodeKey("../../","sex_code",""+isUndefined(data.data.obj.referee_sex),"int"+"")+'</td>'
				+'			<th>民族</th>'
				+'			<td>'+getCodeKey('../../','nation',''+data.data.obj.referee_national+'')+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>身高</th>'
				+'			<td>'+isUndefined(data.data.obj.referee_height,"String")+'cm</td>'
				+'			<th>体重</th>'
				+'			<td>'+isUndefined(data.data.obj.referee_weight,"String")+'kg</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>衣服尺码</th>'
				+'			<td>'+isUndefined(getCodeKey('../../','fixed_size',data.data.obj.referee_clothing_size),"String")+'</td>'
				+'			<th>鞋号</th>'
				+'			<td>'+isUndefined(getCodeKey('../../','footwear_size',data.data.obj.referee_shoe_size),"String")+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>政治面貌</th>'
				+'			<td>'+getCodeKey('../../','political_type',''+data.data.obj.referee_political_landscape+'')+'</td>'
				+'			<th>毕业学校</th>'
				+'			<td>'+data.data.obj.referee_school+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>年龄</th>'
				+'			<td>'+countAge(isUndefined(data.data.obj.birdate,"String"))+'</td>'
				+'			<th>学历</th>'
				+'			<td>'+getCodeKey('../../','education_background',''+data.data.obj.referee_education+'')+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>出生日期</th>'
				+'			<td>'+isUndefined(data.data.obj.birdate,"String")+'</td>'
				+'			<th>联系电话</th>'
				+'			<td>'+isUndefined(data.data.obj.referee_phone,"String")+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>国籍</th>'
				+'			<td>'+isUndefined(data.data.obj.referee_registration,"String")+'</td>'
				+'			<th>所属地区</th>'
				+'			<td>'+isUndefined(data.data.obj.referee_address,"String")+'</td>'
				+'		</tr>');//colspan="3"
			$("#basic_messages").append(str2);
			var str4=$('<p>'+isUndefined(data.data.obj.body,"String")+'</p>');
			$("#body").append(str4);
			infoPic();
			layer.close(index);
		}
	});
});


//*********************************************************************************任免主裁判***************************************************************************
function countersign(sign){
	var mmsg ="";
	if(sign == 1){
		mmsg = "设为主裁判吗" ;
	}else if(sign == 2){
		mmsg = "解除主裁判职务吗" ;
	}
	swal({
		   title:"您确定要将此裁判"+mmsg+"？",
		   type:"warning",
		   showCancelButton : true,
		   confirmButtonColor : "#DD6B55",
		   confirmButtonText : "确定",
		   cancelButtonText : "取消",
		   closeOnConfirm : false,
		   closeOnCancel : true
	   },function(isConfirm){
		   if(isConfirm){
			   var index = layer.load(0, {
				    shade : false
				});
				$.ajax({
					url:'../../refereeController/appointandDismissReferee.json',
					type:'post',
					data:{
						'occupationId':referee_id,
						'racingId':racing_id,
						'productId':product_id,
						'sign':sign
						
						},
					dataType:'json',
					success:function(data){
						if(data.status == 1){
							if(sign == 1){
								$('#countersign').remove();
							}else if(sign == 2){
								$('#dismiss').remove();
							}
							
							swal({
								title :data.msg,
								text : "",
								type : "success",
								confirmButtonText : "确定"
							},function(){
								layer.close(index);
							});
							
						}else{
							swal({
								title :"失败 ！",
								text : data.msg,
								type : "error",
								confirmButtonText : "确定"
							},function(){
								layer.close(index);
							});
						}
						
					},
					error : function() {
						lrError("服务器错误！");
						layer.close(index);
					}
				});
		   }
	   });

}
