var RacingId = $.session.get("Racing_Id");
$(document).ready(function(){
	getCodes("../../", 'site_type', 'siteTypes');
	
	$("#racingId").val(RacingId);
	//赛事设置
	competition();
	//组别
	algorithmType();
});

//===========================================赛事设置==================================================
function competition() {
    var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url : '../../ssRacingProductController/findProductByUser.json',
		type : 'POST',
		dataType : 'JSON',
		data : {racingId : RacingId},
		success : function(data) {
            layer.close(index);
			$.each(data.data.list, function(index, value) {
        		$("#productId").append('<option value="' + value.id + '">' + value.productName + '</option>');
			});
		}
	});
}
	
function cProduct() {
	var productId = $("#productId option:selected").val();
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url : '../../layMatchController/findTeamInfo.json',
		type : 'POST',
		dataType : 'JSON',
		data : {
		    productId : productId,
		    racingId : RacingId
		},
		success : function(data) {
            layer.close(index);
			$("#tbody_spec_data").empty();
			$.each(data.data.list, function(index, value) {
				$("#tbody_spec_data").append('<tr id="tr_' + value.id + '"><td>' + value.team_name + '</td><td>' + value.team_leader + '</td> <td class="text-navy"><i class="glyphicon glyphicon-export" onclick="selectTeam(\'' + value.id + '\', \'' + value.team_name + '\', \'' + value.team_leader + '\')"></i></td></tr>');
			});
		},
		error : function() {
			lrError("获取球队信息失败，服务器错误！");
		}
	});
}
//===========================================场地设置==================================================
function addnewsite() {
	$('#div_add_site').append($('#div_site').clone());
}
//===========================================组别设置==================================================
function addnewgroup(){
	$('#div_add_group').append($('#div_group').clone());
}

//===========================================比赛名单==================================================
//编排类型展现
function algorithmType() {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/findAlgorithmType.json",
        success : function(data) {
            layer.close(index);
            $.each(data.data.list, function(index, value) {
                $("#algorithmType").append('<option id="' + value.useTeamNum + '" value="' + value.id + '">' + value.title + '</option>');
            });
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}
// 编排算法展现
function algorithms(row) {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/findAlgorithm.json?typeId=" + $(row).val(),
        success : function(data) {
            layer.close(index);
            $("#algorithm").children().remove();
            $.each(data.data.list, function(index, value) {
                $("#algorithm").append('<option id="' + value.useTeamNum + '" value="' + value.id + '">' + value.title + '</option>');
            });
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

//显示对应的组别地址
function GroupDiv(DivName, num) {
	$("#TeamGroups .panel").hide();
	$("#" + num).show();
	$("#numId").val(num);
}

//将队伍放入组别中
function selectTeam(teamId, teamName, teamLeader) {
	var numId = $("#numId").val();
	if (numId != "") {
        var groupInfo = $("#groupInfo_" + numId).val();
    	var teamNum = $("#algorithm option:selected").attr("id");
        
        if (groupInfo.split(",").length < teamNum) {
            if (groupInfo == "") {
                groupInfo = teamId;
            } else {
                groupInfo = groupInfo + "," + teamId;
            }
            
            $("#tr_" + teamId).remove();
        	$("#groupInfo_" + numId).val(groupInfo);
        	$("#spec_data_" + numId).append('<li style="margin-right: 15px;" id="button_' + numId + '"><a class="btn btn-primary" onclick="selectUpTeam(\'' + teamId + '\', \'' + teamName + '\', \'' + teamLeader + '\')">' + teamName + '</a></li> ');
        } else {
            lrError("该组别已录入最大队伍数！选选择其他组别或者换一种合适的算法！");
        }
	} else {
	    lrError("请选择组别");
	}
}

//将队伍放回待选区
function selectUpTeam(teamId, teamName, teamLeader) {
	var numId = $("#numId").val();
	var groupInfo = $("#groupInfo_" + numId).val();
	if (groupInfo.indexOf(teamId) > 0) {
		groupInfo = groupInfo.replace("," + teamId, "");
	} else {
		if (groupInfo.length == teamId.length) {
			groupInfo = groupInfo.replace(teamId, "");
		}
	}
	$("#groupInfo_" + numId).val(groupInfo);
	$("#tbody_spec_data").append('<tr id="tr_' + teamId + '"><td>' + teamName + '</td><td>' + teamLeader + '</td> <td class="text-navy"><i class="glyphicon glyphicon-export" onclick="selectTeam(\'' + teamId + '\', \'' + teamName + '\', \'' + teamLeader + '\')"></i></td></tr>');
	$("#button_" + numId).remove();
}