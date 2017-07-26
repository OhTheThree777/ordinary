var mainState;
var Against_Id;
var personFlag;
var miss;
var goalsForA;//A队进得分数
var goalsForB;//B队进得分数
var goalsForNumberMiddleA;//A队进球数中间值
var goalsForNumberMiddleB;//B队进球数中间值
$(function(){
	miss = $.session.get("Miss"); //Miss是否具有管理权限的标记
	Against_Id = $.session.get("Against_Id");
	personFlag = $.session.get("personFlag");
    Contestants_GVT();
	mainState = $.session.get("mainState");
//	$.session.remove("mainState");
	$.session.remove("Against_Id");
	var index=layer.load(0, {shade: false}); 
	if(miss == 1){
		$('#mation_ul').append('<button type="button" class="am-btn am-radius am-btn-sm btn-info pull-right" onclick="announce()"><i class=""></i>&nbsp;发布公告</button>');
	}
	//查询当前对阵球队
	$.ajax({
		url:'../../ssContestantsInformationController/selectObjByIdTeam.json',
		data:{'id':Against_Id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			var i = 1;
			$.each(data.data.list,function(k,v){
				var Str = '<li class="text-center"><a data-toggle="tab" href="#table'+i+'"> <img style="width:60px;height:60px;" src='+v.teamEmblem+'><p>'+v.teamName+'</p></a></li>';
				$('#isUl').append(Str);
				$('#isUl li').eq(0).addClass("active");
				i++;
			});
			layer.close(index); 
		}
	});
});


//A队table
function isA(){
	var index=layer.load(0, {shade: false});
	//加载数据
	$('#tableA')
			.bootstrapTable(
					{
						url : '../../ssContestantsInformationController/main.json',
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',//设置为服务器端分页
						pageNumber : 1,
						striped : true, //是否显示行间隔色
						search : false, //显示搜索框
						toolbar : '#toolbar', //工具按钮用哪个容器
						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
						selectItemName:'btSelectItem',
						showExport : false,
						exportDataType : 'basic',
						advancedSearch : true,
						uniqueId : "id",
						idField:"id",
						clickToSelect:true,
						singleSelect:true,
						strictSearch : true,
						queryParams : function(params) {
							params.id = Against_Id;
							params.Anna = "A";
							return params;
						},
						columns : [
								{
									align : 'center',
									width:50,
									checkbox:true
								},
								{
									field : 'personPic',
									title : '头像',
									align : 'center',
									formatter : function(value, row,
											index) {
										var html="<img src='"+value+"' style='width:65px;height:65px;'>";
										return html;
									}
									
								},
								{
									field : 'personName',
									title : '姓名',
									align : 'center',
								},
								{
									field : 'personNumber',
									title : '球衣号码',
									align : 'center',
									sortable : true,
									formatter : function(value, row,
											index) {
										var html='<span class="am-badge am-badge-secondary am-round">' + value + '</span>';
										return html;
									}
								},
								{
									field : 'place',
									title : '位置',
									align : 'center',
								},
								{
									field : 'goalsForNumber',
									title : '进球数',
									align : 'center',
									sortable:true,
									editable: {
					                    type: 'number',
					                    title: '进球数',
					                    min:0,
					                    max:goalsForA,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var goalsForNumber = parseInt(v);
					                        if (goalsForNumber <0) return '必须等于零，或是正整数';
					                    }
								}
									
								},
								{
									field : 'yellowCardNumber',
									title : '黄牌次数',
									align : 'center',
									sortable : true,
									editable: {
					                    type: 'number',
					                    title: '黄牌次数',
					                    min:0,
					                    max:2,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var yellowCardNumber = parseInt(v);
					                        if (yellowCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
								},
								{
									field : 'redCardNumber',
									title : '红牌次数',
									align : 'center',
									sortable:true,
									editable: {
					                    type: 'number',
					                    title: '红牌次数',
					                    min:0,
					                    max:1,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var redCardNumber = parseInt(v);
					                        if (redCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
								},{
									field : 'playingTime',
									title : '上场时间（分钟）',
									align : 'center',
									sortable : true,
									editable: {
					                    type: 'number',
					                    title: '上场时间（分钟）',
					                    min:0,
					                    max:90,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var yellowCardNumber = parseInt(v);
					                        if (yellowCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
									
								}],
								onEditableSave: function (field, row, oldValue, $el) {
									if(field == "goalsForNumber"){
										goalsForNumberMiddleA += parseInt(oldValue);
										if(row.goalsForNumber > goalsForNumberMiddleA){
											swal({
												title : "提示",
												text : "必须小于等于"+goalsForNumberMiddleA+"！",
												type : "error",
												confirmButtonText : "确定"
											},function(){
												$('#tableA').bootstrapTable('refresh');
											});
										}else{
											editTableG(row);
										}
									}else{
										editTableG(row);
									}
								   }

					});
	layer.close(index);
}

//B队table
function isB(){
	var index=layer.load(0, {shade: false});
	//加载数据
	$('#tableB')
			.bootstrapTable(
					{
						url : '../../ssContestantsInformationController/main.json',
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',//设置为服务器端分页
						pageNumber : 1,
						striped : true, //是否显示行间隔色
						search : false, //显示搜索框
						toolbar : '#toolbar', //工具按钮用哪个容器
						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
						selectItemName:'btSelectItem',
						showExport : false,
						exportDataType : 'basic',
						advancedSearch : true,
						uniqueId : "id",
						idField:"id",
						clickToSelect:true,
						singleSelect:true,
						strictSearch : true,
						queryParams : function(params) {
							params.id = Against_Id;
							params.Anna = "B";
							return params;
						},
						columns : [
								{
									align : 'center',
									width:50,
									checkbox:true
								},
								{
									field : 'personPic',
									title : '头像',
									align : 'center',
									formatter : function(value, row,
											index) {
										var html="<img src='"+value+"' style='width:65px;height:65px;'>";
										return html;
									}
									
								},
								{
									field : 'personName',
									title : '姓名',
									align : 'center',
								},
								{
									field : 'personNumber',
									title : '球衣号码',
									align : 'center',
									sortable : true,
									formatter : function(value, row,
											index) {
										var html='<span class="am-badge am-badge-secondary am-round">' + value + '</span>';
										return html;
									}
								},
								{
									field : 'place',
									title : '位置',
									align : 'center',
								},
								{
									field : 'goalsForNumber',
									title : '进球数',
									align : 'center',
									sortable:true,
									editable: {
					                    type: 'number',
					                    title: '进球数',
					                    min:0,
					                    max:goalsForB,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var goalsForNumber = parseInt(v);
					                        if (goalsForNumber <0) return '必须等于零，或是正整数';
					                    }
								}
									
								},
								{
									field : 'yellowCardNumber',
									title : '黄牌次数',
									align : 'center',
									sortable : true,
									editable: {
					                    type: 'number',
					                    title: '黄牌次数',
					                    min:0,
					                    max:2,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var yellowCardNumber = parseInt(v);
					                        if (yellowCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
								},
								{
									field : 'redCardNumber',
									title : '红牌次数',
									align : 'center',
									sortable:true,
									editable: {
					                    type: 'number',
					                    title: '红牌次数',
					                    min:0,
					                    max:1,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var redCardNumber = parseInt(v);
					                        if (redCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
									
								},{
									field : 'playingTime',
									title : '上场时间（分钟）',
									align : 'center',
									sortable : true,
									editable: {
					                    type: 'number',
					                    title: '上场时间（分钟）',
					                    min:0,
					                    max:90,
					                    validate: function (v) {
					                        if (isNaN(v)) return '必须是数字';
					                        var yellowCardNumber = parseInt(v);
					                        if (yellowCardNumber <0) return '必须等于零，或是正整数';
					                    }
								}
								}],
								onEditableSave: function (field, row, oldValue, $el) {
									if(field == "goalsForNumber"){
										goalsForNumberMiddleB += parseInt(oldValue);
										if(row.goalsForNumber > goalsForNumberMiddleB){
											swal({
												title : "提示",
												text : "必须小于等于"+goalsForNumberMiddleB+"！",
												type : "error",
												confirmButtonText : "确定"
											},function(){
												$('#tableB').bootstrapTable('refresh');
											});
										}else{
											editTableG(row);
										}
									}else{
										editTableG(row);
									}
								    }

					});
	layer.close(index);
}


//A队table
function isA_z(){
	var index=layer.load(0, {shade: false});
	//加载数据
	$('#tableA')
			.bootstrapTable(
					{
						url : '../../ssContestantsInformationController/main.json',
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',//设置为服务器端分页
						pageNumber : 1,
						striped : true, //是否显示行间隔色
						search : false, //显示搜索框
						toolbar : '#toolbar', //工具按钮用哪个容器
						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
						selectItemName:'btSelectItem',
						showExport : false,
						exportDataType : 'basic',
						advancedSearch : true,
						uniqueId : "id",
						idField:"id",
						clickToSelect:true,
						singleSelect:true,
						strictSearch : true,
						queryParams : function(params) {
							params.id = Against_Id;
							params.Anna = "A";
							return params;
						},
						columns : [
								{
									align : 'center',
									width:50,
									checkbox:true
								},
								{
									field : 'personPic',
									title : '头像',
									align : 'center',
									formatter : function(value, row,
											index) {
										var html="<img src='"+value+"' style='width:65px;height:65px;'>";
										return html;
									}
									
								},
								{
									field : 'personNumber',
									title : '球衣号码',
									align : 'center',
									sortable : true,
									formatter : function(value, row,
											index) {
										var html='<span class="am-badge am-badge-secondary am-round">' + value + '</span>';
										return html;
									}
								},
								{
									field : 'place',
									title : '位置',
									align : 'center',
								},
								{
									field : 'personName',
									title : '姓名',
									align : 'center',
								},
								{
									field : 'goalsForNumber',
									title : '进球数',
									align : 'center',
									sortable:true,
								},
								{
									field : 'yellowCardNumber',
									title : '黄牌次数',
									align : 'center',
									sortable : true,
								},
								{
									field : 'redCardNumber',
									title : '红牌次数',
									align : 'center',
									sortable:true,
								},{
									field : 'playingTime',
									title : '上场时间（分钟）',
									align : 'center',
									sortable : true,
								}],
					});
	layer.close(index);
}

//B队table
function isB_z(){
	var index=layer.load(0, {shade: false});
	//加载数据
	$('#tableB')
			.bootstrapTable(
					{
						url : '../../ssContestantsInformationController/main.json',
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',//设置为服务器端分页
						pageNumber : 1,
						striped : true, //是否显示行间隔色
						search : false, //显示搜索框
						toolbar : '#toolbar', //工具按钮用哪个容器
						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
						selectItemName:'btSelectItem',
						showExport : false,
						exportDataType : 'basic',
						advancedSearch : true,
						uniqueId : "id",
						idField:"id",
						clickToSelect:true,
						singleSelect:true,
						strictSearch : true,
						queryParams : function(params) {
							params.id = Against_Id;
							params.Anna = "B";
							return params;
						},
						columns : [
								{
									align : 'center',
									width:50,
									checkbox:true
								},
								{
									field : 'personPic',
									title : '头像',
									align : 'center',
									formatter : function(value, row,
											index) {
										var html="<img src='"+value+"' style='width:65px;height:65px;'>";
										return html;
									}
									
								},
								{
									field : 'personName',
									title : '姓名',
									align : 'center',
								},
								{
									field : 'personNumber',
									title : '球衣号码',
									align : 'center',
									sortable : true,
									formatter : function(value, row,
											index) {
										var html='<span class="am-badge am-badge-secondary am-round">' + value + '</span>';
										return html;
									}
								},
								{
									field : 'place',
									title : '位置',
									align : 'center',
								},
								{
									field : 'goalsForNumber',
									title : '进球数',
									align : 'center',
									sortable:true,
								},
								{
									field : 'yellowCardNumber',
									title : '黄牌次数',
									align : 'center',
									sortable : true,
								},
								{
									field : 'redCardNumber',
									title : '红牌次数',
									align : 'center',
									sortable:true,
								},{
									field : 'playingTime',
									title : '上场时间（分钟）',
									align : 'center',
									sortable : true,
								}],
					});
	layer.close(index);
}
//头部展现
function Contestants_GVT() {
    $.ajax({
        type : "post",
        url : '../../layAgainstController/Contestants_GVT.json',
        data : { 'againstId' : Against_Id },
        dataType : "json",
        success : function(data) {
        	//得分数初始化
        	goalsForA = data.data.obj.coAScore;
        	goalsForB = data.data.obj.coBScore;
        	//进球数初始化
        	goalsForNumberMiddleA = goalsForA - querySum("A");
//        	alert(goalsForA);
//        	alert(goalsForNumberMiddleA);
            goalsForNumberMiddleB = goalsForB - querySum("B");
            ergodic_GVT(data);
            if(mainState == 1 || personFlag == 5){
        		isA();
        		isB();
        	}else if(mainState == 0){
        		isA_z();
        		isB_z();
        	}
        }
    });
}
// 数据加载
function ergodic_GVT(data) {
    // 设置模版
    $("#div_contestants_top").setTemplateElement("template_contestants_top").processTemplate(data.data.obj);
}
//*******************************************************************************发布公告*******************************************************************************************
function announce(){
	$.session.set("Against_Id",Against_Id)
	//公告预览
	 var announceLayer = layer.open({
	        type : 2,
	        title : '公告预览',
	        shadeClose : true,
	        shade : false,
	        maxmin : true, // 开启最大化最小化按钮
	        area : [ '90%', '90%' ],
	        content :'notice_preview.html',
	        end : function() { // 此处用于演示
	        }
	    });
}

//查询各队进球总数
function querySum(X){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "../../ssContestantsInformationController/selectSum.json",
	        data : {
	        	'id' : Against_Id,'middle':X
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.map.goals_for_number;
		}
	}); 
	return jsonObject;
}

//行内修改保存
function editTableG(row){
	var index=layer.load(0, {shade: false});
    $.ajax({
        type: "post",
        url: "../../ssContestantsInformationController/update.json",
        data: row,
        dataType: 'JSON',
        success: function (data, status) {
            if (status == "success") {
                //alert('提交数据成功');
            	layer.close(index);
            	goalsForNumberMiddleA = goalsForNumberMiddleA -row.goalsForNumber;
            	goalsForNumberMiddleB = goalsForNumberMiddleB -row.goalsForNumber;
            }
        },
        error: function () {
        	layer.close(index);
            alert('编辑失败');
        },
        complete: function () {

        }

    });
}
