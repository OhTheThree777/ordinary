var Against_Id;
var racing_id;
var product_id;
$(function(){
	Against_Id = $.session.get("Against_Id");
	var index = layer.load(0, {shade : false});
	//获取
	$.ajax({
        type : "post",
        url : '../../ssContestantsInformationController/preview.json',
        data : { 'id' : Against_Id,'Anna':"A" },
        dataType : "json",
        success : function(data) {
        	racing_id = data.data.map.racingId;
        	product_id = data.data.map.productId;
        	$('#A_caption').html(data.data.obj.teamName);
        	$('#a_name').html(data.data.obj.teamName);
        	$('#a_number').html(data.data.map.coAScore);
            $.each(data.data.list,function(k,v){
            	var str = '';
            		str = str + '<tr style="text-align:center"><td><img src='+v.personPic+' width="65" height="65"></td><td>'+v.personName+'</td><td>'+v.personNumber+'</td><td>'+v.place+'</td><td>'+v.goalsForNumber+'</td><td>'+v.yellowCardNumber+'</td><td>'+v.redCardNumber+'</td><td>'+v.playingTime+'</td></tr>'
            		$('#A_tbody').append(str);
            });
        }
    });
	$.ajax({
        type : "post",
        url : '../../ssContestantsInformationController/preview.json',
        data : { 'id' : Against_Id,'Anna':"B" },
        dataType : "json",
        success : function(data) {
        	$('#B_caption').html(data.data.obj.teamName);
        	$('#b_name').html(data.data.obj.teamName);
        	$('#b_number').html(data.data.map.coBScore);
            $.each(data.data.list,function(k,v){
            	var str = '';
            		str = str + '<tr style="text-align:center"><td><img src='+v.personPic+' width="65" height="65"></td><td>'+v.personName+'</td><td>'+v.personNumber+'</td><td>'+v.place+'</td><td>'+v.goalsForNumber+'</td><td>'+v.yellowCardNumber+'</td><td>'+v.redCardNumber+'</td><td>'+v.playingTime+'</td></tr>'
            		$('#B_tbody').append(str);
            });
            layer.close(index);
        }
    });
});

//确认发布
function issue(){
	$("#btn_add").attr("disabled", true);
	var index = layer.load(0, {shade : false});
			//发布
			$.ajax({
		        type : "post",
		        url : '../../postmessageController/issues_notice.json',
		        data : {'info':$('#Z_div').html(),'racingId':racing_id,'productId':product_id,'COCKLEBUR':"1",'title':$('#A_caption').html() + "VS" +$('#B_caption').html(),'Anna':"0"},
		        dataType : "json",
		        success : function(data) {
		        	if(data.status == 1){
		        		swal({
							title :data.msg,
							type : "success",
							confirmButtonText : "确定"
						},function(){
							window.location.href = 'http://isport.lrkpzx.com/dede/inter_makehtml_all.php';
						});
		        	}else{
		        		swal({
							title :data.msg,
							type : "error",
							confirmButtonText : "确定"
						});
		        	}
		        	 layer.close(index);
		        },
		        error : function () {
                    layer.close(index);
                    lrError("服务器错误！");
                }
		    });
}
