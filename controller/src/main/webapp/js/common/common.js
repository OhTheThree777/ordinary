/**
 * 发送AJAX请求
 * @param serviceName: action的方法,格式为 package.class.method
 * @param 其后的参数以一对对“参数名-参数值”的方式
 * @example doService("admin.Main.changePwd", "oldpwd",1, "newpwd",2)
 */
function doService() {
	var params = doService.arguments;
	if(params.length%2 == 0) {
		alert('参数错误!');
		return;
	}
	var serviceName = params[0];
	var urlParams = '';
	urlParams = arrayToUrl(urlParams, params, 1);
	return postService(serviceName, urlParams);
}

/**
 * 发送AJAX请求
 * @private
 * @param serviceName: action的方法,格式为 package.class.method
 * @param urlParams: ajax请求的URL参数
 * @example postService("admin.Main.changePwd", "oldpwd=1&newpwd=2")
 */
function postService(serviceName, urlParams) 
{
	var jsonObject;
	$.ajax({
		type: "POST",
		url: serviceName,
		data: urlParams,
		dataType: "json",
		async: false,  
		success: function(json)
		{
			if(json.success){
				jsonObject = json.message;
			}else{
				//执行失败
				lrError(json.message);
				jsonObject = null;
			} 
			
		}
	});
	return jsonObject;
}

function lrOpen(title,width,contentId){
	var index = layer.open({
		title:title,
	    type: 1,
	    shadeClose:true,
	    maxmin: true, 
	    area: [width+"px", "auto"], //宽高
	    content: $("#"+contentId)
	    
	});
	return index;
}



function lrOpenPage(title,width,pagePath){
	var index = layer.open({
		title:title,
	    type: 2,
	    shadeClose:true,
	    area: [width+"px", "auto"], //宽高
	    content: pagePath
	});
	return index;
}


function lrOpenPage(title,width,height,pagePath){
	var index = layer.open({
		title:title,
	    type: 2,
	    shadeClose:true,
	    area: [width+"px", height+"px"], //宽高
	    content: pagePath
	});
	return index;
}

function lrClose(){
	layer.closeAll();
}

function lrCloseByIndex(index) {
	layer.close(index);
}

/**
 * 发送AJAX请求
 * @param serviceName: action的方法,格式为 package.class.method
 * @param formId: Form的Id
 * @param 其后的参数以一对对“参数名-参数值”的方式
 * @example doFormService("admin.Main.changePwd", "userForm", "oldpwd",1, "newpwd",2)
 */
function doFormService() {
	var params = doFormService.arguments;
	if(params.length < 2 || params.length%2 != 0) {
		alert('参数错误!');
		return;
	}
	var serviceName = params[0];
	var formId = params[1];
	var urlParams = '';
//	urlParams = formToUrl(urlParams, formId);
	urlParams = arrayToUrl(urlParams, params, 2);
	return postFormService(formId,serviceName, urlParams);
}

/**
 * 把Form的所有项生成name1=value1&name2=value2&...的URL参数字符串
 * @private
 * @param urlParams: 传入字符串
 * @param formId: Form的Id
 */
function formToUrl(urlParams, formId) 
{
	var els = document.getElementById(formId).elements;
	for(var i = 0, max = els.length; i < max; i++) 
	{
		var el = els[i];
		var id = el.id;
		var value = el.value;
		if (!id) continue;
		if (urlParams != '')
			urlParams += "&";
		urlParams += id + "=" + value;
	}
	//alert(urlParams);
	return urlParams;
	
}

/**
 * 把数组的所有项生成name1=value1&name2=value2&...的URL参数字符串
 * @private
 * @param urlParams: 传入字符串
 * @param params: 函数所有参数的数组
 * @param start: 从第几个参数开始截取
 */
function arrayToUrl(urlParams, params, start) 
{
	for (var i = start; i < params.length - 1; i = i + 2) 
	{
		if (urlParams != '')
			urlParams += "&";
		urlParams += params[i] + "=" + params[i+1];
	}
	return urlParams;
}

/**
 * 绑定Form
 * @param formId: Form的Id
 * @param data: Json数据
 * @example bindForm("orgForm", jsonObject)
 */
function bindForm(formId, data) {
	var form = document.getElementById(formId);
	
	for (var i = 0; i < form.elements.length;i++) {
		var element = form.elements[i];
		//if (!data[element.id]) continue;
		
		if (data[element.name] == undefined) continue;
		var val = data[element.name];
		switch (element.type) {
		case "number": ;
		case "textarea": ;
		case "text": ;
		case "hidden": ;
		case "password": element.value = val; break;
		case "radio" : 
		case "checkbox" : 
			if (val instanceof Array) element.checked = (val.toString().indexOf(element.value) > -1);//判断val为Array对象时，将val值输出为字符串型 huangwei 2015.11.27
			else element.checked = (element.value ==val);
			break;
		case "select-one" : 
		case "select-multiple" : 
			for (var j = 0; j < element.options.length; j++) {
				var option = element.options[j];
				if (val instanceof Array) {
					option.selected = (val.toString().indexOf(option.value) > -1);//判断val为Array对象时，将val值输出为字符串型 huangwei 2015.11.27
				} else {
					option.selected = (option.value == val);
				}
			}
			break;
		default:
			element.value = val; break;
		}
	}
}

/**
 * 绑定DIV
 * @param divId: DIV的Id
 * @param data: Json数据
 * @example bindDiv("orgDiv", jsonObject)
 */
function bindDiv(divId, data) {
	var div = document.getElementById(divId);
	var aSpan;
	var aImg;
	if(document.querySelectorAll){
    	aSpan = document.querySelectorAll("#"+ divId + " span");
    	aImg = document.querySelectorAll("#"+ divId + " img");
	} else {
	    aSpan = document.getElementById(divId).getElementsByTagName("span");
    	aImg = document.getElementById(divId).getElementsByTagName("img");
	}
	
	for (var i = 0; i < aSpan.length;i++) {
		var span = aSpan[i];
		if (data[span.id] == undefined) continue;
		var val = "无信息！";
		if (data[span.id] != "" ) {
			val = data[span.id];
		}
		span.innerHTML = val;
	}
	
	for (var j = 0; j < aImg.length; j++) {
		var img = aImg[j];
		if (data[img.id] == undefined) continue;
		var val = data[img.id];
		img.src = val;
	}
}

/**
 * 清空form数据
 * @param formId: Form的Id
 * @example bindForm("orgForm")
 */
function emptyForm(formId) {
	var form = document.getElementById(formId);
	
	for (var i = 0; i < form.elements.length;i++) {
		var element = form.elements[i];
		//if (!data[element.id]) continue;
		
		var val = ""
		switch (element.type) {
		case "number": ;
		case "textarea": ;
		case "text": ;
		case "hidden": ;
		case "password": element.value = val; break;
		case "radio" : 
		case "checkbox" : 
			if (val instanceof Array) element.checked = (val.toString().indexOf(element.value) > -1);//判断val为Array对象时，将val值输出为字符串型 huangwei 2015.11.27
			else element.checked = (element.value ==val);
			break;
		case "select-one" : 
		case "select-multiple" : 
			for (var j = 0; j < element.options.length; j++) {
				var option = element.options[j];
				if (val instanceof Array) {
					option.selected = (val.toString().indexOf(option.value) > -1);//判断val为Array对象时，将val值输出为字符串型 huangwei 2015.11.27
				} else {
					option.selected = (option.value == val);
				}
			}
			break;
		default:
			element.value = val; break;
		}
	}
}


//ajax提交form表单
function postFormService(formId,serviceName, urlParams) 
{
	var jsonObject;
 	 $('#'+formId).ajaxSubmit({
		type: "POST",
		url: serviceName.replace(/\./g, "/") + "?"+urlParams,
		dataType: "json",
		async: false,
		success: function(json)
		{
			if(json.success){
				jsonObject = json.message;
			}else{
				//执行失败
				lrError(json.message);
				jsonObject = null;
			} 
			
		}
	});
	return jsonObject;
}

/**
 * 单元格渲染tpl
 * @param {} value
 * @param {} meta
 * @return {}
 */
function renderTpl(value,meta){
	meta.tdAttr = 'data-qtip="'+value+'"';
	return value;
}

/**
 * 
 * @param {} msg
 * @param {} animateTarget
 * @param {} fn
 */
function lrConfirm(msg,func){
	layer.msg(msg, {
	    time: 0 //不自动关闭
	    ,btn: ['确定', '取消']
	    ,yes: function(index){
	        layer.close(index);
	        func(true);
	    }
	    ,no:function(index){
	    	func(false);
	    }
	});
}

/**
 * 
 * @param {} msg
 * @param {} fn
 */
function lrAlert(msg,fn){
	layer.msg(msg, {
		time:1000
	},fn);
}

/**
 * 
 * @param {} msg
 * @param {} time
 * @param {} fn
 */
function lrAlertByTime(msg,time,fn){
	layer.msg(msg, {
		time:time
	},fn);
}

/**
 * 
 * @param {} msg
 * @param {} fn
 */
function lrError(msg,fn){
	layer.msg(msg, {
		time:2000,
		shift:6
	},fn);
}

/**
 * 
 * @param {} msg
 * @param {} time
 * @param {} fn
 */
function lrErrorByTime(msg,time,fn){
	layer.msg(msg, {
		time:time,
		shift:6
	},fn);
}

/**
 * 导出excel
 * @param grid
 * @param sqlid
 * @param type ['single' or 'all']
 */
function exportExcel(grid,sqlid,type,excelName){
	if(grid.getStore().getTotalCount()<=0){
		lrError("没有数据",function(){});
		return;
	}
	var dataIndexes = "";		//数据集
	var columnNames = "";		//表头集
	var columns = grid.columns;
	var column = null;
	for(var i=0;i<columns.length;i++){
		column = columns[i];
		if(column.dataIndex==""){
			continue;
		}
		dataIndexes += column.dataIndex+",";
		columnNames += column.text+",";
	}
	dataIndexes = dataIndexes.substring(0,dataIndexes.length-1);
	columnNames = columnNames.substring(0,columnNames.length-1);
	//参数
	var params = Ext.clone(grid.getStore().proxy.extraParams);
	params.sqlid = sqlid;
	params.page = grid.getStore().currentPage;	//当前页
	params.limit = grid.getStore().pageSize;	//每页条数
	params.dataIndexes = dataIndexes;
	params.columnNames = columnNames;
	params.type = type;
	var result = postService(ctx+"/common/exportExcel",params);
	if(result){
		excelName = excelName==null?"":excelName;
		window.location.href = ctx+"/common/downLoadFile?targetName="+result+"&excelName="+excelName;
	}
}

/**
 * 四舍五入
 * @param {} numberRound 原数字
 * @param {} roundDigit 小数位数
 * @return {} 处理后的数字
 */
function roundFun(numberRound,roundDigit){  
    var	digit;  
    digit=1;  
    digit=Math.pow(10,roundDigit)  
    return	(Math.round(numberRound*digit)/digit);  
} 

function formValidate(formid)
{
	$("#"+formid).validate({
		meta:"validate",
	    invalidHandler: function(form, validator) {
	        $.each(validator.invalid,function(key,value){
            	$("#"+key).focus();
            	$("#"+key).select();
            	layer.tips(value, "#"+key);
	        	return false;
	        }); //这里循环错误map，只报错第一个
	    },
	    errorPlacement:function(error, element) {
	    },
	    onkeyup: false,
	    onfocusout:false
	});
}

function formReset(formId){
	var $form = $("#"+formId);
	$form.get(0).reset();
	$form.find("input[type='hidden']").val("");
}

$.fn.getFormJson = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
}; 

//post方式打开新窗口
function lrWindowOpen(url,args,name){ 
	//创建表单对象 
	var _form = $("<form></form>",{ 
	'id':'tempForm', 
	'method':'post', 
	'action':url, 
	'target':name, 
	'style':'display:none' 
	}).appendTo($("body")); 
	
	//将隐藏域加入表单 
	for(var i in args){ 
	_form.append($("<input>",{'type':'hidden','name':i,'value':args[i]})); 
	} 
	//绑定提交触发事件 
	_form.bind('submit',function(){ 
	window.open("about:blank",name); 
	}); 
	//触发提交事件 
	_form.trigger("submit"); 
	//表单删除 
	_form.remove(); 
} 

function getCodeKey(uri,catCode,dictValue){
	var jsonObject;
 	
	$.ajax({
		type: "POST",
		url: uri+'sysCodeDictController/getKeyByValue',
		data: {
			'catCode':catCode,
			'dictValue':dictValue
		},
		dataType: "json",
		async: false,  
		success: function(json)
		{
			
			jsonObject= json;
		}
	}); 
	return jsonObject;
}

function getCodes(uri,catCode,selectid,defaultValue){
	$.ajax({
		type: "POST",
		url: uri+'sysCodeDictController/getCodes',
		data: {
			'catCode':catCode
		},
		dataType: "json",
		async: false,  
		success: function(json)
		{
			$('#'+selectid).html("");
			var itemm="<option value='0'>请选择...</option>";
			$('#'+selectid).append(itemm);
			$.each( json, function(i, n){
				if (defaultValue == n.dictValue) {
					var item="<option value='"+n.dictValue+"' selected>"+n['dictKey']+"</option>";
				} else {
					var item="<option value='"+n.dictValue+"'>"+n['dictKey']+"</option>";
				}
				$('#'+selectid).append(item);
			});
		}
	}); 
}

function getCodesGive(uri,catCode,selectid,dictValue){
	$.ajax({
		type: "POST",
		url: uri+'sysCodeDictController/getCodes',
		data: {
			'catCode':catCode
		},
		dataType: "json",
		async: false,  
		success: function(json)
		{
			$('#'+selectid).html("");
			getCodeKey(uri,catCode,dictValue)
			var itemm="<option value="+dictValue+">"+getCodeKey(uri,catCode,dictValue)+"</option>";
			$('#'+selectid).append(itemm);
			$.each( json, function(i, n){
				var item="<option value='"+n.dictValue+"'>"+n['dictKey']+"</option>";
				$('#'+selectid).append(item);
			});
		}
	}); 
}


//打开新页签
function loadPage(_zyid, _text, _url) {
    var tabs = window.parent.parent.parent.$("#tabs");
    var header = tabs.children(".tabs_header");
    var container = tabs.children(".tabs_container");
    if (!tabs.find(".tabs_header span[zyid='" + _zyid + "']").length) {
        var _header = "<span zyid='" + _zyid + "' class='active'>" + _text + "<i></i></span>";
        var _container = "<iframe zyid='" + _zyid + "' src='" + _url + "'></iframe>";
        $(header).children().removeClass('active').end().append(_header);
        $(container).children().hide().end().append(_container);
        bindContextMenu(_zyid);
    } else {
        tabs.find(".tabs_header span[zyid='" + _zyid + "']:eq(0)").trigger("click");
    }
}

function bindContextMenu(zyid) {
    var tabs = window.parent.parent.parent.$("#tabs");
	tabs.find(".tabs_header span[zyid='" + zyid + "']:eq(0)").contextMenu('myMenu1', {
	    menuStyle: {
	    },
	    itemStyle: {
	        'border': '0px',
	        'font': "12px/20px '微软雅黑'"
	    },
	    itemHoverStyle: {
	        'border': '0px',
	        'font': "12px/20px '微软雅黑'"
	    },
	    bindings: {
	        'closeCurrent': function (t) {
	            tabs.find(".tabs_header span[zyid='" + zyid + "'] i:eq(0)").trigger('click');
	        },
	        'closeOther': function (t) {
	            tabs.find(".tabs_header span[zyid!='" + zyid + "'] i").trigger('click');
	        },
	        'closeAll': function (t) {
	            tabs.find(".tabs_header span[zyid!='00'] i").trigger('click');
	        },
	        'refreshCurrent': function (t) {
	            tabs.find(".tabs_container iframe[zyid='" + zyid + "']").get(0).contentWindow.location.reload(true);
	        }
	    }
	});
}
//给undefined赋值
function isUndefined(Str, Type) {
    if (Str == undefined || Str == 'undefined') {
        if (Type == "int") {
            Str = 0;
        } else if (Type == "String") {
            Str = "";
        }
    }
    return Str;
}
//给不显示的图片赋值
function listPic(id){
	 $(".img"+id+"").error(function() { 
		 $(".img"+id+"").attr("src", "../../img/zanwu.jpg"); 
		}); 
}

function listPics(id){
	 $(".img"+id+"").error(function() { 
		 $(".img"+id+"").attr("src", "../../../img/zanwu.jpg"); 
		}); 
}

function infoPic(){
	 $(".img").error(function() { 
		 $(".img").attr("src", "../../img/zanwu.jpg"); 
		}); 
}

function infoPics(){
	 $(".img").error(function() { 
		 $(".img").attr("src", "../../../img/zanwu.jpg"); 
		}); 
}
function infomainList(id){
	 	$("#"+"img"+id).error(function() { 
		 $("#"+"img"+id).attr("src", "img/zanwu.jpg"); 
		}); 
}
//暂无数据
function noMessages(list,id,msg){
	if(list.length < 1){
		$("#"+id).append("<div class='weui-loadmore weui-loadmore_line'><span class='weui-loadmore__tips'>暂无数据"+isUndefined(msg,"String")+"</span></div>");
	}
}
//计算年龄
function countAge(birthday){
	var str = birthday.substring(0,4);
	var Age = new Date().getFullYear()-parseInt(str);
	return Age;
}
//jQuery回退
function retreat_a(){
//	history.back();
	history.go(-1);
//	location.reload();
}

//计算时间差
function checkEndTime(startTime, endTime) {
	var start = new Date(startTime.replace("-", "/").replace("-", "/"));
	var end = new Date(endTime.replace("-", "/").replace("-", "/"));
	if (end < start) {
		return false;
	}
	return true;
}

//切割图片取随机一张
function incisionPicture(pic){
	if(undefined !=pic && null !=pic && "" !=pic){
		var array = pic.split("|");
		if(array.length>1){
			
			return array[parseInt(array.length*Math.random())];
		}else{
			return array[0];
		}
		
	}else{
		return "../../img/zanwu.jpg";
	}
	
}

//--------------------------------------------------------------------查询球队类型------------------------------------------------------------------------------

function queryTeamType(teamType){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "../../../JoinTeamController/queryTeamType",
	    dataType : "json",
	        data : {
	            'teamType' : teamType
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.map.name;
		}
	}); 
	return jsonObject;
}

//**************************************************************************获取队伍分类*******************************************************************************
function acquireModels(){
	$.ajax({
		type: "POST",
		 url : "../../teamHomepageController/acquireModel.json",
	    dataType : "json",
	        data : {},
		async: false,  
		success: function(json){
			$.each(json.data.list,function(key,val){
				$("#team_type_ul").append('<li role="presentation"><a href="#class'+val.id+'" aria-controls="home" role="tab" data-toggle="tab">'+val.name+'</a></li>');
				var str ='<div role="tabpanel" class="tab-pane clearfix" id="class'+val.id+'"></div>';
				$("#team_type_div").append(str);
				str = '<ul class="cat-item list-inline clearfix col-sm-12" style="display: block;" id="ul'+val.id+'"></ul>';
				$("#"+"class"+val.id).append(str);
				btnTeamType(val.id);
			});
		$("#team_type_ul li").eq(0).addClass("active");
		$("#team_type_div>div").eq(0).addClass("active");
		}
	});
}
//**************************************************************************获取队伍类型********************************************************************************************
function btnTeamType(pid){
		$.ajax({
			type: "POST",
			 url : "../../teamHomepageController/acquireTeamType.json",
		    dataType : "json",
		        data : {'categoryId':pid},
			async: false,  
			success: function(date){
				$.each(date.data.list,function(k,v){
					str = '<li class="col-lg-2 col-md-3 col-sm-4 col-xs-6" onclick="pitchOn(\''+v.name+'\','+v.id+')" data-dismiss="modal">'
							+'	<div class="profess-tit">'
							+'		<i class="iconfont icon-'+v.spelling+'"></i>'
							+'			<p>'+v.name+'</p>'
							+'	</div>'
							+'</li>';
					$("#"+"ul"+pid).append(str);
				});
			}
		});
}
//**************************************************************************选中点击事件********************************************************************************************
function pitchOn(name,id){
	$("#team_type").val(name);
	$("#teamType").val(id);
}

//***********************************************************************如果List为空则隐藏页码**************************************************************************************
function concealPagination(list){
	if(list.length==0){
		$('.M-box3').hide();
	}
}

//***************************************************************************判断两个字符串日期大小(控件layerdate)*********************************************************************************
function compareDate(start, end) {
	var start = {
		elem : '#' + start,
		format : 'YYYY-MM-DD',
		min : laydate.now(), //设定最小日期为当前日期
		max : '2099-06-16', //最大日期
		istime : false,
		istoday : false,
		choose : function(datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};
	var end = {
		elem : '#' + end,
		format : 'YYYY-MM-DD',
		min : laydate.now(),
		max : '2099-06-16',
		istime: false,
		istoday : false,
		choose : function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
}

function compareDateTime(start, end) {
	var start = {
		elem : '#' + start,
		format : 'YYYY-MM-DD hh:mm:ss',
		min : laydate.now(), //设定最小日期为当前日期
		max : '2099-06-16 23:59:59', //最大日期
		istime : true,
		istoday : false,
		choose : function(datas) {
			end.min = datas.substring(0, 10); //开始日选好后，重置结束日的最小日期
			end.start = datas.substring(0, 10); //将结束日的初始值设定为开始日
		}
	};
	var end = {
		elem : '#' + end,
		format : 'YYYY-MM-DD hh:mm:ss',
		min : laydate.now(),
		max : '2099-06-16 23:59:59',
		istime : true,
		istoday : false,
		choose : function(datas) {
			start.max = datas.substring(0, 10); //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
}

function compareDateTimes(cutOff,start, end) {
	var cutOff = {
			elem : '#' + cutOff,
			format : 'YYYY-MM-DD hh:mm:ss',
			min : laydate.now(), //设定最小日期为当前日期
			max : '2099-06-16 23:59:59', //最大日期
			istime : true,
			istoday : false,
			choose : function(datas) {
				start.min = datas.substring(0, 10); //开始日选好后，重置结束日的最小日期
				end.min = datas.substring(0, 10); //开始日选好后，重置结束日的最小日期
			}
		};
	
	var start = {
		elem : '#' + start,
		format : 'YYYY-MM-DD hh:mm:ss',
		min : laydate.now(), //设定最小日期为当前日期
		max : '2099-06-16 23:59:59', //最大日期
		istime : true,
		istoday : false,
		choose : function(datas) {
			end.min = datas.substring(0, 10); //开始日选好后，重置结束日的最小日期
			end.start = datas.substring(0, 10); //将结束日的初始值设定为开始日
			cutOff.max = datas.substring(0, 10); //结束日选好后，重置开始日的最大日期
		}
	};
	var end = {
		elem : '#' + end,
		format : 'YYYY-MM-DD hh:mm:ss',
		min : laydate.now(),
		max : '2099-06-16 23:59:59',
		istime : true,
		istoday : false,
		choose : function(datas) {
			start.max = datas.substring(0, 10); //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(cutOff);
	laydate(start);
	laydate(end);
}

//获取运动员的场上信息
//从服务器获取值（主页）
function getAttributServer(personId){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "personInfoController/queryLocation.json",
	    dataType : "json",
	        data : {
	            'personId' : personId
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.map.place;
		}
	}); 
	return jsonObject;
}

function competitionState(val,str){
    //将（yyyy-MM-dd HH:mm:ss 转换为时间搓）
    //报名结束时间
    var cutOffDate = Date.parse(val.cut_off_date.replace(new RegExp("-","g"),"/"));
    //开赛时间
    var racingBeginTime = Date.parse(val.racing_begin_time.replace(new RegExp("-","g"),"/"));
    //结束时间
    var racingEndTime = Date.parse(val.racing_end_time.replace(new RegExp("-","g"),"/"));
    //当前时间
    var presentTime = new Date().getTime();
    if(val.match_state == '4'){//手动结束报名标记
    	if(presentTime > racingBeginTime){//已开赛
    		if(presentTime > racingEndTime){//赛事已结束
    			str = str + '<div class="content1" >赛事结束</div>'
    		}else{
    			str = str + '<div class="content1" >比赛中</div>'
    		}
    	}else{//报名已截止
    		str = str + '<div class="content1" >报名结束</div>';
    	}
	}else{//按正常时间计算
		   if(presentTime > cutOffDate){//报名已结束
		    	if(presentTime > racingBeginTime){//已开赛
		    		if(presentTime > racingEndTime){//赛事已结束
		    			str = str + '<div class="content1" >赛事结束</div>'
		    		}else{
		    			str = str + '<div class="content1" >比赛中</div>'
		    		}
		    	}else{//报名已截止
		    		str = str + '<div class="content1" >报名结束</div>';
		    	}
		    }else{//正在报名中
		    	str = str + '<div class="content1" >报名中</div>';
		    }
	}
 
    return str;
}

