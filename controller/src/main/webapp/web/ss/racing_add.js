//ranhongmin 2016.9.22 完成0.1
//******************************************************************主处理*******************************************************************************************
$(function() {
	//*************************************************************拉取主办方信息**********************************************************************************************
	$.ajax({
		url:'../../ssSponsorController/findSponsorByUserId.json',
		type:"post",
		async:true,
		cache:false,
		success : function(data) {
			//****************************************************************写入主办方信息**********************************************************************************
			$('#mainOrganizersName').val(data.data.obj.contacts);
			$('#mainOrganizersPhoneNumber').val(data.data.obj.phone);
			$('#specialPlane').val(data.data.obj.tel);
			$('#sponsorName').val(data.data.obj.name);
			
		},
		error : function() {
			lrError("服务器错误！");
		}
	});
	if("0"==$.session.get('ProjectState')){
		projectId = $.session.get('ProjectId');
		 $.session.remove('ProjectId');
		 $.session.remove('ProjectState');
	}else{
		projectId = "";
	}
	getModel();
	getCodes("../../","competition_system","racing_type");
//*****************************************************************增加主办方按钮****************************************************************************************
	$('#btn_add_sponsorName').click(function(){
		add_sponsorName();
	});
//	if(Tel !==undefined || Tel !==""){
//		//定义一个数组
//		//定义一个串儿
//		var Str = "";
//		var array = Tel.split(',');
//		$.each(array,function(k,v){
//			Str = '<div class="hr-line-dashed"></div>';
//			Str = Str + '<div class="form-group"id="tel'+k+'">'
//					+'		<label class="col-sm-2 control-label">主办方座机号码 </label>'
//					+'		<div class="col-sm-4">'
//					+'			<input type="text" name="tel'+k+'" value='+v+''
//					+'				class="form-control required" placeholder="主办方座机号码">'
//					+'		</div>'
//			Str = Str + '<a onclick="del('+k+',1)" href="#"><i class="glyphicon glyphicon-remove"></i></a>';		
//			Str = Str +'</div>';
//			
//			$('#TEL').append(Str);
//		});
//	}
	
		
//****************************************************************上传文件初始化**********************************************************************************
	$('#file_racing').fileinput({
        language: 'zh', // 设置语言
        uploadUrl: '../../common/upload/up.json', // 上传的地址
        uploadAsync: true,
        allowedFileExtensions : ['jpg', 'png','gif'],// 接收的文件后缀
        showUpload: true, // 是否显示上传按钮
        showRemove: true,//是否显示删除按钮
        enctype: 'multipart/form-data',
        showCaption: true,
        showCaption: false,// 是否显示标题
        validateInitialCount:true,
        browseClass: "btn btn-primary", // 按钮样式
        removeClass: "btn btn-danger",
        uploadClass: "btn btn-info",
        maxFilesNum : 8,//上传最大的文件数量
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
        
       
    }).on("fileuploaded", function(event, data) {
        if(data.response)
        {
        	var tmpUrl=$('#hidRacingPic').val();
        	if(""==tmpUrl){
        		$('#hidRacingPic').val(data.response.data.list[0].uri);
        	}else{
        		$('#hidRacingPic').val(tmpUrl+"|"+data.response.data.list[0].uri);
        	}
          //  alert('处理成功'+data.response.data.list[0].uri);
        	
        }
    });
    
//    city();

//******************************************************************规格按钮*******************************************************************************************
	$('#btn_model_spec').click(function(){
		//规格管理和选择
		var p1 = $('#modelid').children('option:selected').val();// 这就是selected的值
		if(null==p1||"0"==p1){
			lrError("请选择竞赛模型！");
		}else{
			$('#spec_list').empty();
			$('#spec_data').empty();
			$('#tbody_spec_data').empty();
			showSpec(p1);
		}
	});
//******************************************************************扩展信息*******************************************************************************************
	$('#btn_model_prop').click(function(){
		//扩展选择
		
	});
	//**************************************************************新增事件*******************************************************************************************
	$('#add').click(function() {// 从前台按钮点击执行add函数
		getModel();
		$("#model_app").empty();
		$('#spec_view').empty();	
		add();
	});
	
	$('#btn_model_prop').click(function(){//这个按钮的事件是添加竞赛项目时选择竞赛模型后的跳转到模型管理的按钮，但是存在bug所以在html中已经把按钮注释掉
		var index_main_1= layer.open({
			type : 2,
			title : '模型列表',
			shadeClose : true,
			shade : false,
			closeBtn:true,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '100%', '100%' ],
			content :'model_main.html'
		});
	});
	
	
	
	
	$('#modelid').change(function() {//添加竞赛项目时其中的选择竞赛模型的方法
		var p1 = $(this).children('option:selected').val();// 这就是selected的值
		if(p1=="0"){
			$('#model_app').empty();
		}else{
			getProp(p1);	
		}
	});


	//******************************************************************日期控件*******************************************************************************************
	compareDateTimes("cut_off_date","racing_begin_time","racing_end_time");



//******************************************************************保存按钮*******************************************************************************************
// 添加竞赛项目的最后的保存按钮   下面的cookie 为从该赛事活动管理中跳转到竞赛添加时用的不过使用之后存在bug
//bug为 当在赛事活动管理中跳转到竞赛添加后，在独立进入竞赛管理时cookie还会存在，
//但是好像又没法删，所以在赛事活动管理跳转竞赛时用的是显示所有赛事的example查询
$('#btn_add').click(function() { // 弹出添加框内的确认按钮
		$('#projectId').val(projectId);
		
	if (!$('#from_ss_racing').valid()) {
		lrError("请输入必填项！");
		return;
	}
	if ($('#hidRacingPic').val()=="") {
		lrError("请上传宣传图片！");
		return;
	}
	
	//判断是否选择规格
	if($("#specjsonstr_append tr").length < 1){
		lrError("请添加规格！");
		return;
	}
	
	if(!ue.hasContents()){
		lrError("请输入项目介绍！");
		return;
	}	
	
	var index = layer.load(0, {
		shade : false
	});
 var e=$("#from_ss_racing").serialize();//表格的序列化
// var f=$('#specjsonstr_append').children('tr').length;//查看总共又几个规格
// var g="[]";
// var h=eval('('+g+')');
// var k=$('#specjsonstr_append tr:nth-child(1)').attr("data-tr_sepdata");//好像没啥用，用来查看下面的for中的是不是能正确获取到值
// for(var j=1;f>=j;j++){//获取添加的规格
//	 	
//	 	var i={
//	 				"selData":''+$('#specjsonstr_append tr:nth-child('+j+')').attr("data-tr_sepdata")+'',
//	 				"specName":''+$('#specjsonstr_append tr:nth-child('+j+')').attr("data-tr_specname")+'',
//	 				"specId":''+$('#specjsonstr_append tr:nth-child('+j+')').attr("data-tr_specid")+''
//	 			}
//	 			h.push(i);
//
//}
//下面是整属性的
 var o=new Array()
 var o_o=$("#from_ss_racing").serialize()
 var p=$('label[data-type="propertyType_1"]').length;
 var q=$('label[data-type="propertyType_2"]').length;
 var r=$('label[data-type="propertyType_4"]').length;
 for(var s=0;s<p;s++){
	 var t=$('label[data-type="propertyType_1"]:eq('+s+')').attr("data-name");
	 o.push({ 
				name:t,
				data:$('input:checked[name='+t+' ]').val(),
				type:1
			 });
 }
  
 for(var u=0;u<q;u++){	 
	 var v=$('label[data-type="propertyType_2"]:eq('+u+')').attr("data-name");
	 var y='';
	 $('input:checked[name='+v+']').each(function(z){
		 if(0==z){
			 y=$(this).val();
		 }else{
			 y+=(","+$(this).val());
		 }
	 });
	 o.push({
		 name:v,
		 data:y,
		 type:2
	 });	 
 }
 for(var w=0;w<r;w++){
	 var x=$('label[data-type="propertyType_4"]:eq('+w+')').attr("data-name");
	 o.push({
		 name:x,
		 data:$('select[name='+x+']').val(),
		 type:4
	 });
 }
 
 
 //var o_o=o_o+"&param="+JSON.stringify(o)+"&specdetil="+JSON.stringify(h);//把属性和规格加在表单后面，在controller中用getp什么的获取 
  var o_o=o_o+"&param="+JSON.stringify(o);//把属性和规格加在表单后面，在controller中用getp什么的获取
	$.ajax({
		type : "POST",
		url : "../../ssRacingController/add.json",
		dataType : "json",
		data : o_o,
		success : function(data) {

			layer.closeAll('page');
			layer.close(index);
			 swal({
				   title:"添加成功",
				   text:"信息保存成功",
				   type:"success",
				   confirmButtonText:"确定"
			  },function (){
				  window.location.href="sponsor_homepage_new.html";
			  });
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});	
});
//******************************************************************获取模型*******************************************************************************************
function getModel() {
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../ssModelController/findModels.json",
		dataType : "json",
		success : function(data) {
			var json = data['data']['list'];
			$('#modelid').html("");
			var itemm = "<option value='0'>请选择...</option>";
			$('#modelid').append(itemm);
			$.each(json, function(i, n) {
				var item = "<option value='" + n.id + "'>" + n['modelName']
						+ "</option>";
				$('#modelid').append(item);
			});
			layer.close(index);

		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
}
//******************************************************************获取html属性*******************************************************************************************
//获取属性的html
function getHtml(type,name,values){
	var html="";
	var keys=values.split(";");
	switch (type) {
	case "1":
		$.each(keys, function(i, n) {
			html+="<label class='radio-inline'><input type='radio' checked='' value='";
			html+=n;
			html+="' id='' name='";
			html+=name;
			html+="'>";
			html+=n;
			html+="</label>";
		});
		html+="<input name='propertyType' value='1' type='hidden'>"
		break;
	case "2":
	case "3":
		$.each(keys, function(i, n) {
			html+="<label class='checkbox-inline'><input type='checkbox' checked='true' value='";
			html+=n;
			html+="' name='";
			html+=name;
			html+="'>";
			html+=n;
			html+="</label>";
			html+="<input name='propertyType' value='2' type='hidden' disabled='false'>"			
		});
		break;
	case "4":
		html="<select class='form-control'  name='";
		html+=name;
		html+="'>";
		$.each(keys, function(i, n) {
			html+="<option value='";	
			html+=n;
			html+="'>";
			html+=n;
			html+="</option>";
		});
		html+="</select>";
		html+="<input name='propertyType' value='4' type='hidden'>"
		break;
	
	default:
		html+="<input class='form-control'  name='";
		html+=values;
		html+="/>";
		html+="<input name='propertyType' value='3' type='hidden'>"
		break;
	}
	return html;
};
//******************************************************************追加到扩展信息*******************************************************************************************
function getProp(id) {
	var index = layer.load(0, {
		shade : false
	});
	
	$.ajax({
		type : "POST",
		url : "../../ssModelController/findProp.json",
		data:{
			modelId:id
		},
		dataType : "json",
		success : function(data) {
			$('#model_app').empty();
			$('#model_app').append("<div class='hr-line-dashed'></div>");
			var json = data['data']['list'];
			var a="<div class='form-group'>";
			a+=" <label class='col-sm-2 control-label'>扩展属性</label>";
			a+="<div class='col-sm-9 ' style='border:1px solid #1a7bb9; border-radius:0px;padding:15px 15px 15px 0px;;margin-left:15px;'>";
			$.each(json, function(i, n) {
				a+=" <label class='col-sm-2 control-label'data-type='propertyType_"+n.modelPropertyType+"'  data-name='"+n.modelPropertyName+"' >";
				a+=n.modelPropertyName ;
				a+=": </label>";
				a+="<div class='col-sm-10'>";
				a+=getHtml(n.modelPropertyType,n.modelPropertyName,n.modelPropertyData);
				a+="</div>";
			
			});
			a+="</div>";
			a+="</div>";
			$('#model_app').append(a);
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});

}
//******************************************************************显示规格*******************************************************************************************
//显示规格
function showSpec(id){//点击添加规格后的方法
	var index_main = layer.open({
		type : 1,
		title : '规格管理',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_spec'),
		success: function(layero, index){
			getSpec(id);
		},
		end : function() { // 此处用于演示
			
		}
	});
	$('#btn_spec_close').click(function(){
		layer.close(index_main);
	});
	
	$('#btn_spec_add').click(function(){
		//判断是否选择规格
		if($("#tbody_spec_data tr").length < 1){
			lrError("请选择规格！");
			return;
		}
		
		//var specjsonstr=[];
		$('#spec_view').empty();	
		var specValueData = {};
		var specData      = {};
		for(var a=$('#tbody_spec_data').children('tr').length;a>0;a--){
			var i=$('#tbody_spec_data').children('tr').attr("name");
			var x=$('#tbody_spec_data tr:nth-child('+a+')').attr("data-selData");
			var y=$('#tbody_spec_data tr:nth-child('+a+')').attr("data-specName");  //spec_view
			var z=$('#tbody_spec_data tr:nth-child('+a+')').attr("data-specId");  //spec_view
			var specjsonbuf={
					specName:y,
					selData:x,
					specId:z
					};						
			//specjsonstr.push(specjsonbuf);
			if(!specValueData[specjsonbuf.specId])
			{
				specData[specjsonbuf.specId]  = specjsonbuf;
				specValueData[specjsonbuf.specId] = [];
			}
			specValueData[specjsonbuf.specId].push(specjsonbuf.selData);
			
		}

		var specMaxData = descartes(specValueData,specData);
		
		var  j=' ';
		j+='<div class="panel panel-info " style="border:1px solid #1a7bb9; border-radius:0px;padding:15px 15px 15px 0px;"	>';
		j+='	<div class="panel-body">';
		j+='	<table class="table table-striped " >';
		j+='<thead><tr>';
		$.each(specData, function(i, n) {
			j+='<th>'+n.specName+'</th>';
		});
		j+='<th>限报队伍数</th><th>每队最少报名人数（仅限运动员）</th><th>每队最多报名人数（仅限运动员）</th><th>报名费用</th><th>操作</th>	</tr></thead><tbody id="specjsonstr_append" ';
		j+='</tbody>	</table>		</div>	</div>';	
		
		$('#spec_view').append(j);	
		var count=specMaxData.length;
		var w_count='<input type="hidden" name="spec_num" value="'+count+'">';
		$('#specjsonstr_append').append(w_count);	
		$.each(specMaxData, function(i, data) {
			var  w='';
			w+='<tr>';
			$('#specjsonstr_append').append(w);	
			var dal_count=data.length;
			$.each(data, function(j, n) {
				var updatedString=JSON.stringify(n).replace(/\"/g,"'");
				w+='<td>'+n.selData+'<input type="hidden" name="_spec_array['+i+']['+j+']" value="'+updatedString+'"/></td> ';
			});
			
			w+='<td> <input type="hidden" name="spec_num_dal['+i+']" value="'+dal_count+'"><input type="text" name="_spec_sign['+i+']" class="form-control required" value="0"></td>';
			w+='<td><input type="text" name="sign_person_min['+i+']" class="form-control required" value="0"></td>';
			w+='<td><input type="text" name="sign_person_max['+i+']" class="form-control required" value="0"></td>';
			w+='<td><input type="text" name="_spec_count['+i+']" class="form-control required" value="0"></td>';
			w+='<td ><a><i class="glyphicon glyphicon-remove"/></a></td>';
			w+='</tr>';
			$('#specjsonstr_append').append(w);	
		});
//		$.each(specMaxData, function(i, n) {
//			var  w='';
//			w+='<tr data-tr_sepData="'+n.selData+'" name="'+n.specName+n.selData+'"  data-tr_specName="'+n.specName+'" data-tr_specId="'+n.specId+'"><td>'+n.specName+'</td><td>'+n.selData+'</td> ';
//			$('#specjsonstr_append').append(w);	
//		});
		
		layer.close(index_main);
		
	});
	
}




//******************************************************************笛卡儿积组合*******************************************************************************************
//笛卡儿积组合
function descartes(list,specData)
{
	//parent上一级索引;count指针计数
	var point  = {};

	var result = [];
	var pIndex = null;
	var tempCount = 0;
	var temp   = [];

	//根据参数列生成指针对象
	for(var index in list)
	{
		if(typeof list[index] == 'object')
		{
			point[index] = {'parent':pIndex,'count':0}
			pIndex = index;
		}
	}

	//单维度数据结构直接返回
	if(pIndex == null)
	{
		return list;
	}

	//动态生成笛卡尔积
	while(true)
	{
		for(var index in list)
		{
			tempCount = point[index]['count'];
			temp.push({"specId":specData[index].specId,"specName":specData[index].specName,"selData":list[index][tempCount]});
		}

		//压入结果数组
		result.push(temp);
		temp = [];

		//检查指针最大值问题
		while(true)
		{
			if(point[index]['count']+1 >= list[index].length)
			{
				point[index]['count'] = 0;
				pIndex = point[index]['parent'];
				if(pIndex == null)
				{
					return result;
				}

				//赋值parent进行再次检查
				index = pIndex;
			}
			else
			{
				point[index]['count']++;
				break;
			}
		}
	}
}

//******************************************************************获取规格信息*******************************************************************************************
//获取规格信息
function getSpec(id){
	var index = layer.load(0, {
		shade : false
	});
	
	$.ajax({
		type : "POST",
		url : "../../ssModelController/findSpecs.json",
		data:{
			modelId:id
		},
		dataType : "json",
		success : function(data) {
			var myTemplate = Handlebars.compile($("#spec-model").html());
			$('#spec_list').append(myTemplate(data['data']['list']));
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
	
}
//******************************************************************选中的规格*******************************************************************************************
var xh=1;
//选中规格
function selSpec(specData,specName,specId){
	if($('button[data-id="'+specName+'"]').length<=0){
 	$('#spec_data').empty();		
		xh=1;
		var datas=specData.split(",");
		var data="";
		$.each(datas, function(i, n) {
			if($('tr[name='+n+specName+']').length<=0){
			data+='<li style="margin-right: 15px;" ><button data-id="'+specName+'" class="btn btn-rounded btn-primary" id="'+specName+n+'speclb" onclick="selSpecData(\''+n+'\',\''+specName+'\',\''+specId+'\')" >'+n+'</button></li> ';
			}else{
				data+='<li style="margin-right: 15px;"><button data-id="'+specName+'" class="btn btn-rounded btn-primary btn-danger" id="'+specName+n+'speclb" onclick="selSpecData(\''+n+'\',\''+specName+'\',\''+specId+'\')" disabled="disabled">'+n+'</button></li>';
			}
		});
		if($('button[data-id="'+specName+'"]').length=0){
			}
		$('#spec_data').append(data);
		$('#panel_sel_sepc_data').show();
	}
	
//	$('#tbody_spec_data').empty();
	
	
}
function selSpecData(selData,specName,specId){
	$('#'+specName+selData+'speclb').addClass("btn btn-danger").attr("disabled","true");
	var spec_data='<tr id="tr_'+xh+'" name="'+selData+specName+'" data-selData="'+selData+'" data-specName="'+specName+'" data-specId="'+specId+'"><td>'+specName+'</td><td>'+selData+'</td> <td class="text-navy"><i class="glyphicon glyphicon-remove" onclick="selSpecDataRemove(\''+selData+'\',\''+specName+'\')"></i></td>';
	xh++;
	$('#tbody_spec_data').append(spec_data);
	
}

function selSpecDataRemove(selData,specName){	
	$('#'+specName+selData+'speclb').removeClass("btn-danger").removeAttr("disabled");
	$('tr[name='+selData+specName+']').remove();
}

var ue = UE.getEditor('racingIntroduce');
//**************************************************************************************城市控件***********************************************************************
//function city(){
//	 // 地区
//	$("#address_new").address({
//		prov: "内蒙古",
//		city: "呼和浩特市",
//		district: "",
//		scrollToCenter: true,
//		footer: true,
//		selectEnd: function(json) {
//			console.log(JSON.stringify(json));
//		}
//	});
//}

$("#from_ss_racing").validate({
    rules : {
    	mainOrganizersPhoneNumber : {
            required : true,
            isMobile : true
        },
        modelId : {
            required : true,
            min : 1
        },
//        racingType : {
//            required : true,
//            min : 1
//        },
        specialPlane : {
        	isTel : true
        }
    },
    messages : {
    	mainOrganizersPhoneNumber : {
            required : "<i class='fa fa-times-circle'></i>请输入手机号码",
            isMobile : "<i class='fa fa-times-circle'></i>手机号码不符合规则！"
        },
        modelId : {
            required : "<i class='fa fa-times-circle'></i>请选择赛事模型！",
            min : "<i class='fa fa-times-circle'></i>请选择赛事模型！"
        },
//        racingType : {
//            required : "<i class='fa fa-times-circle'></i>请选择赛事类型！",
//            min : "<i class='fa fa-times-circle'></i>请选择赛事类型！"
//        },
        specialPlane : {
        	isTel : "<i class='fa fa-times-circle'></i>电话号码不符合规则！"
        }
    }
    
});

////********************************************************************************添加主办方实现********************************************************************************
////定义一个变量
//var i=0;
//function add_sponsorName(){
//	var Str = '<div class="hr-line-dashed"></div>';
//		Str = Str + '<div class="form-group" id="zhuban'+i+'">'
//		+'		<label for="inputEmail3" class="col-sm-2 control-label">主办方名称</label>'
//		+'			<div class="col-sm-9" id="">'
//		+'				<input type="text" class="form-control required" id="sponsorName" name="sponsorName" placeholder="请输入主办方名称">'
//		+'			</div>'
//		+'			<button class="btn btn-outline btn-primary" type="button" onclick="btnDelete('+i+')">'
//		+'				<i class="glyphicon glyphicon-plus" aria-hidden="true"></i>'
//		+'			</button>'
//		+'		</div>';
//	$('#ZBF').append(Str);
//	i++;
//}

//*********************************************************************************主办方删除事件**********************************************************************************
function btnDelete(i){
	$('#'+"zhuban"+i).prev().remove();
	$('#'+"zhuban"+i).remove();
}

//*********************************************************************************************添加座机点击事件***************************************************************************************
//$("#sendTel").click(function() {
//	$('#input_tel').append($('#div_tel').clone());
//});