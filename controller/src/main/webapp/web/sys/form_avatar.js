
swfobject.addDomLoadEvent(function () {
	//以下两行代码正式环境下请删除
var swf = new fullAvatarEditor("fullAvatarEditor.swf", "expressInstall.swf", "swfContainer", {
		    id : 'swf',
			upload_url : '../../common/upload/upPic.json',	//上传接口
			method : 'post',	//传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
			src_upload : 2,		//是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
			avatar_box_border_width : 0,
			width: 600,						//flash文件的宽度
			height: 430,
			expressInstall:'../../js/plugins/fullavatareditor/expressInstall.swf',
			file:'../../js/plugins/fullavatareditor/fullAvatarEditor.swf',
			avatar_sizes : '100*100|50*50|32*32',
			avatar_sizes_desc : '100*100像素|50*50像素|32*32像素'
		}, function (msg) {
			switch(msg.code)
			{
				case 1 : break;
				case 2 : 
					//alert("已成功加载图片到编辑面板。");
					document.getElementById("upload").style.display = "inline";
					break;
				case 3 :
					if(msg.type == 0)
					{
						alert("摄像头已准备就绪且用户已允许使用。");
					}
					else if(msg.type == 1)
					{
						alert("摄像头已准备就绪但用户未允许使用！");
					}
					else
					{
						alert("摄像头被占用！");
					}
				break;
				case 5 : 
					var result=eval(msg.content);
					if(result.status=="1"){
						$('#add_pic').attr('src','../../'+result.list[0].uri);
						$('#update_pic').attr('src','../../'+result.list[0].uri);
						
						$('#hid_team_emblem').val(result.list[0].uri);

						$('#update_hid_team_emblem').val(result.list[0].uri);
					}else{
						alert('图片上传失败');
					}
					layer.close(pic_layer);
						
				break;
			}
		}
	);

});
var pic_layer;
function showPic(type){

	 pic_layer=layer.open({
	      type: 1,
	      title: '上传头像',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['60%', '95%'],
	      content: $('#div_pic'),
	      end: function(){ //此处用于演示
	    	
		  }
	});
}
