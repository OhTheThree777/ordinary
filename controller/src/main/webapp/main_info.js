var personFlag;
var teamFlag;
var occupationId;
var personRacging;
var teamSign;
$(function(){
    personFlag = $.session.get("personFlag");
    teamFlag = $.session.get("teamFlag");
    occupationId = $.session.get("occupationId");
    teamSign = $.session.get("teamSign");
    personRacging = $.session.get("personRacging");
    teamSign = $.session.get("teamSign")
    if (personFlag != null) {
        if (personFlag == "1") {
          //首页大图标
            var Str1;
                if (teamFlag == "0") {
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="join_team()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">强强联手、干翻对手</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">加入球队</div>'
                    + '<div class="widget-statistic-description">与好友一起踢球，找寻儿时的乐趣</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="invite_list();">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">运动红人</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">邀请信息</div>'
                    + '<div class="widget-statistic-description">展现球队邀请信息，你在圈里有多火~'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-support"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                    + '<div class="widget widget-success am-cf">'
                    + '<div class="widget-statistic-header">维护个人信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">信息维护</div>'
                    + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-primary am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>';
                } else {
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_team()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">队员一条心，齐力得冠军</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">我的球队</div>'
                    + '<div class="widget-statistic-description">查看球队相关信息</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_competition()">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">我的赛事</div>'
                    + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-support"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                    + '<div class="widget widget-success am-cf">'
                    + '<div class="widget-statistic-header">维护个人信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">信息维护</div>'
                    + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-primary am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>';
                }
                $("#datubiao").append(Str1);
        } else if (personFlag == "2") {
          //首页大图标
            var Str1;
                if (teamFlag == "0" && teamSign == "0") {
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="creat_team()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">建球队、招兵马</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">创建球队</div>'
                    + '<div class="widget-statistic-description">建立属于自己王朝的球队</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="join_team()">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">强强联手、干翻对手</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">加入球队</div>'
                    + '<div class="widget-statistic-description">与好友一起踢球，找寻儿时的乐趣</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="invite_list()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">运筹帷幄</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">邀请信息</div>'
                    + '<div class="widget-statistic-description">查看那些队伍邀请了你！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-purple am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>'
                }else if(teamSign != "0"){
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_team()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">队员一条心，齐力得冠军</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">我的球队</div>'
                    + '<div class="widget-statistic-description">查看球队相关信息</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                    if (personRacging == "0") {
                        Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="join_competition()">'
                        + '<div class="widget widget-purple am-cf">'
                        + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                        + '<div class="widget-statistic-body">'
                        + '<div class="widget-statistic-value">加入赛事</div>'
                        + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                        + '</div>'
                        + '<span class="widget-statistic-icon am-icon-support"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    } else {
                        Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_competition()">'
                        + '<div class="widget widget-purple am-cf">'
                        + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                        + '<div class="widget-statistic-body">'
                        + '<div class="widget-statistic-value">我的赛事</div>'
                        + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                        + '</div>'
                        + '<span class="widget-statistic-icon am-icon-support"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    }
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">维护个人信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">信息维护</div>'
                    + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-purple am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>'
                }else{
                	 Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_team()">'
                         + '<div class="widget widget-primary am-cf">'
                         + '<div class="widget-statistic-header">队员一条心，齐力得冠军</div>'
                         + '<div class="widget-statistic-body">'
                         + '<div class="widget-statistic-value">我的球队</div>'
                         + '<div class="widget-statistic-description">查看球队相关信息</div>'
                         + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                         + '</div>'
                         + '</div>'
                         + '</div>'
                         + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_competition()">'
                         + '<div class="widget widget-purple am-cf">'
                         + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                         + '<div class="widget-statistic-body">'
                         + '<div class="widget-statistic-value">我的赛事</div>'
                         + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~</div>'
                         + '<span class="widget-statistic-icon am-icon-support"></span>'
                         + '</div>'
                         + '</div>'
                         + '</div>'
                         + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                         + '<div class="widget widget-primary am-cf">'
                         + '<div class="widget-statistic-header">维护个人信息</div>'
                         + '<div class="widget-statistic-body">'
                         + '<div class="widget-statistic-value">信息维护</div>'
                         + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                         + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                         + '</div>'
                         + '</div>'
                         + '</div>';
//                         + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                         + '<div class="widget widget-purple am-cf">'
//                         + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                         + '<div class="widget-statistic-body">'
//                         + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                         + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                         + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                         + '</div>'
//                         + '</div>'
//                         + '</div>'
                }
                if(teamSign !="0"){
                	Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-6" onclick="invite_list()">'
                    + '<div class="widget widget-info am-cf">'
                    + '<div class="widget-statistic-header">邀请信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">邀请信息</div>'
                    + '<div class="widget-statistic-description">查看那些队员和教练被你邀请了！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-6" onclick="quit_team_list()">'
                    + '<div class="widget widget-dar am-cf">'
                    + '<div class="widget-statistic-header">退队列表</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">退队信息</div>'
                    + '<div class="widget-statistic-description">查看那些队员和教练进行了退队申请！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                }
                $("#datubiao").append(Str1);
        } else if (personFlag == "3") {
          //首页大图标
            var Str1;
                if (teamFlag == "0") {
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="hot_competition()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">获悉全球最热门的赛事</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">热门赛事</div>'
                    + '<div class="widget-statistic-description">关注热门赛事，体验美好人生~</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="competition_invite()">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">查看有哪些赛事邀请了你</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">赛事邀请</div>'
                    + '<div class="widget-statistic-description">体现自我价值的时候到了~'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-support"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">维护个人信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">信息维护</div>'
                    + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-primary am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>'
                } else {
                    Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="hot_competition()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">获悉全球最热门的赛事</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">热门赛事</div>'
                    + '<div class="widget-statistic-description">关注热门赛事，体验美好人生~</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="competition_course()">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">获悉赛事最新进展</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">赛事进程</div>'
                    + '<div class="widget-statistic-description">查看下一次展现自我的时刻'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-support"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                    + '<div class="widget widget-primary am-cf">'
                    + '<div class="widget-statistic-header">维护个人信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">信息维护</div>'
                    + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
//                    + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                    + '<div class="widget widget-primary am-cf">'
//                    + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                    + '<div class="widget-statistic-body">'
//                    + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                    + '<div class="widget-statistic-description">关注圈内事件，获悉第一手资料！</div>'
//                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                    + '</div>'
//                    + '</div>'
//                    + '</div>'
                }
                $("#datubiao").append(Str1);
        } else if (personFlag == "4") {
          	//首页大图标
            var Str1;
            if (occupationId == "undefined") {
                Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="creat_team()">'
                + '<div class="widget widget-primary am-cf">'
                + '<div class="widget-statistic-header">建球队、招兵马</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">创建球队</div>'
                + '<div class="widget-statistic-description">建立属于自己王朝的球队</div>'
                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="hot_competition()">'
                + '<div class="widget widget-purple am-cf">'
                + '<div class="widget-statistic-header">查看全部热门赛事</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">热门赛事</div>'
                + '<div class="widget-statistic-description">群雄对抗，谁与争锋</div>'
                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="message_maintain()">'
                + '<div class="widget widget-primary am-cf">'
                + '<div class="widget-statistic-header">维护个人信息</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">信息维护</div>'
                + '<div class="widget-statistic-description">整理个人信息，让更多的人看到你的优点！</div>'
                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                + '</div>'
                + '</div>'
                + '</div>';
//                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                + '<div class="widget widget-primary am-cf">'
//                + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                + '<div class="widget-statistic-body">'
//                + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                + '<div class="widget-statistic-description">关注圈内事件，获取第一手资料！</div>'
//                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                + '</div>'
//                + '</div>'
//                + '</div>'
            } else {
                Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="team_manage()">'
                + '<div class="widget widget-primary am-cf">'
                + '<div class="widget-statistic-header">队员一条心，齐力得冠军</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">球队管理</div>'
                + '<div class="widget-statistic-description">管理球队相关信息</div>'
                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                + '</div>'
                + '</div>'
                + '</div>';
                if (personRacging == "0") {
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="join_competition()">'
                    + '<div class="widget widget-purple am-cf">'
                    + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">加入赛事</div>'
                    + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-support"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                } else {
                	  Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="join_competition()">'
                      + '<div class="widget widget-purple am-cf">'
                      + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                      + '<div class="widget-statistic-body">'
                      + '<div class="widget-statistic-value">加入赛事</div>'
                      + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                      + '</div>'
                      + '<span class="widget-statistic-icon am-icon-support"></span>'
                      + '</div>'
                      + '</div>'
                      + '</div>';
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="my_competition()">'
                    + '<div class="widget widget-success am-cf">'
                    + '<div class="widget-statistic-header">个人魅力，勇夺冠军</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">我的赛事</div>'
                    + '<div class="widget-statistic-description">展现自我价值，挑战一切不可能~'
                    + '</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-6" onclick="invite_list()">'
                    + '<div class="widget widget-info am-cf">'
                    + '<div class="widget-statistic-header">邀请信息</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">邀请信息</div>'
                    + '<div class="widget-statistic-description">查看那些队员和教练被你邀请了！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                    Str1 = Str1 + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-6" onclick="quit_team_list()">'
                    + '<div class="widget widget-dar am-cf">'
                    + '<div class="widget-statistic-header">退队列表</div>'
                    + '<div class="widget-statistic-body">'
                    + '<div class="widget-statistic-value">退队信息</div>'
                    + '<div class="widget-statistic-description">查看那些队员和教练进行了退队申请！</div>'
                    + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                  
                }
                
//                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                + '<div class="widget widget-primary am-cf">'
//                + '<div class="widget-statistic-header">知己知彼，百战不殆</div>'
//                + '<div class="widget-statistic-body">'
//                + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                + '<div class="widget-statistic-description">关注圈内事件，获取第一手资料！</div>'
//                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                + '</div>'
//                + '</div>'
//                + '</div>'
            }
            $("#datubiao").append(Str1);
        } else if(personFlag == "5") { //主办方
        	//首页大图标
            var Str1;
            if (occupationId != "undefined") {
                Str1 = '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="creat_competition()">'
                + '<div class="widget widget-primary am-cf">'
                + '<div class="widget-statistic-header">开启传奇盛世赛事</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">创建赛事</div>'
                + '<div class="widget-statistic-description">群雄对抗，谁与争锋</div>'
                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="competition_manage()">'
                + '<div class="widget widget-purple am-cf">'
                + '<div class="widget-statistic-header">掌握大局、统筹一切</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">赛事管理</div>'
                + '<div class="widget-statistic-description">管理创建的赛事信息'
                + '</div>'
                + '<span class="widget-statistic-icon am-icon-support"></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="sponsor_manage()">'
                + '<div class="widget widget-primary am-cf">'
                + '<div class="widget-statistic-header">主办方信息维护</div>'
                + '<div class="widget-statistic-body">'
                + '<div class="widget-statistic-value">主办方信息</div>'
                + '<div class="widget-statistic-description">管理主办方信息，让更多球队了解你！'
                + '</div>'
                + '<span class="widget-statistic-icon am-icon-support"></span>'
                + '</div>'
                + '</div>'
                + '</div>';
//                + '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4" onclick="circle_matter()">'
//                + '<div class="widget widget-primary am-cf">'
//                + '<div class="widget-statistic-header">了解赛事相关信息</div>'
//                + '<div class="widget-statistic-body">'
//                + '<div class="widget-statistic-value">圈里那些事儿</div>'
//                + '<div class="widget-statistic-description">关注圈内事件，获取第一手资料！</div>'
//                + '<span class="widget-statistic-icon am-icon-credit-card-alt"></span>'
//                + '</div>'
//                + '</div>'
//                + '</div>'
            }
            $("#datubiao").append(Str1);
        }
    }
    
    //异步加载主页热门球队
    $.ajax({
        url:'teamIndexController/main_team',
        type:"post",
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            $.each(data.data.list,function(key,val){
                var str='<tr class="gradeX">'
                +'<td><img id="img'+val.id+'" src='+val.teamEmblem+' class="tpl-table-line-img" alt="" onclick="detailed('+val.id+')"></td>'
                +'<td class="am-text-middle">'+isUndefined(val.teamName,"String")+'</td>'
                +'<td class="am-text-middle">'+isUndefined(val.teamBulidTime.substring(0,10),"String")+'</td>'
                +'<td class="am-text-middle">'
                +'  <div class="tpl-table-black-operation">';
                if (teamFlag == "0" && personFlag != "3" && personFlag != "4" && personFlag != "5")  {
                    str = str + '      <a href="javascript:;" onclick="join('+val.id+')"> <i class="am-icon-pencil"></i>加入球队'
                }
                str = str + '      </a> <a href="javascript:;" onclick="detailed('+val.id+')"> <i class="am-icon-pencil"></i>详细信息'
                +'      </a>'
                +'  </div>'
                +'</td>'
            +'</tr>';
                $("#main_team").append(str);
                infomainList(val.id);
            });
            }
      });
    
    //异步加载主页热门球员
    $.ajax({
        url:'teamIndexController/main_pople',
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            $.each(data.data.list,function(key,val){
                var str=$('<li>'
                            +'<img alt="" onclick="details('+val.id+')" class="am-circle" id="img'+val.id+'" src='+val.personPic+'>'
                            +'<div>'
                            +'  <h3>姓名：'+isUndefined(val.personName,"String")+'</h3>'
                            +'      <span>状态：<i id="i'+val.id+'" class="">'+getCodeKey('','athlete_state',''+val.personState+'')+'</i></span> <br />' 
                            +'      <span>年龄：'+countAge(isUndefined(val.personBirthday,"String"))+'</span><br />' 
                            +'      <span>位置：'+isUndefined(getAttributServer(val.id),"String")+'</span>'
                            +'  </div>'
                            +'</li>');
                $("#main_pople").append(str);
                if(1==val.personState){
                	$("#i"+val.id).addClass("current_state");
                }else if(2==val.personState){
                	$("#i"+val.id).addClass("am-badge am-badge-secondary am-round");
                }else if(3==val.personState){
                	$("#i"+val.id).addClass("am-badge am-badge-secondary am-round am-badge-danger");
                }
                infomainList(val.id);
            });
        }
    });
    
//  //异步加载主页热门赛事
//    $.ajax({
//        url:'teamIndexController/main_object',
//        data:{},
//        async:true,
//        cache:false,
//        dataType:"json",
//        success:function(data){
// //       	 noMessage(data,"main_project");
//            $.each(data.data.list,function(key,val){
//                var str=$('<li class="col-md-3 col-sm-6 col-xs-12">'
//			        		+'	<div class="event_box">'
//			        		+'		<a href="javascript:;">'
//			        		+'			<img img id="img'+val.id+'" src='+val.propagateUrlPhoto+' onclick="particulars_object('+val.id+')">'
//			        		+'			<div class="v-overlay"></div>'
//			        		+'			<div class="content">'
//			        		+'				<h4>'+val.projectName+'</h4>'
//			        		+'				<i class="glyphicon glyphicon-time"><em>'+val.matchBeginDate+'</em></i>'
//			        		+'				<div class="csrs"><i class="am-icon-users am-icon-sm"></i>&nbsp;参赛类型：'+val.matchType+'</div>'
//			        		+'			</div>'
//			        		+'			<div class="content1" onclick="particulars_object('+val.id+')">查看详情</div>'
//			        		+'		</a>'
//			        		+'	</div>'
//			        		+'</li>');
//                $("#main_project").append(str);
//                infomainList(val.id);
//            });
//        }
//    });
    
  //异步加载主页热门项目
    $.ajax({
        url:'teamIndexController/main_racing',
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            $.each(data.data.list,function(key,val){
            	var str = '';
            	var str = str + '<li class="col-md-3 col-sm-6 col-xs-12" onclick="particulars_racing('+val.id+')">'
		                		+'	<div class="event_box">'
		                		+'		<a href="javascript:;">'
		                		+'			<img class="" src='+incisionPicture(val.racing_pic)+'>'
		                		+'			<div class="v-overlay"></div>'
		                		+'			<div class="content">'
		                		+'				<h4>'+val.racing_name+'</h4>'
		                		+'				<i class="glyphicon glyphicon-time">开始时间:<em>'+val.racing_begin_time.substring(0,10)+'</em></i><br>'
		                		+'				<i class="glyphicon glyphicon-time">结束时间:<em>'+val.racing_end_time.substring(0,10)+'</em></i>'
		                		+'				<div class="csrs"><i class="am-icon-users am-icon-sm"></i>&nbsp;参赛人数：'+isUndefined(val.attend_number,"String")+'</div>'
		                		+'			</div>'
            					+'			<div class="content1" >查看详情</div>';
            	str = competitionState(val,str);
                str = str + '</a>'
        		+'	</div>'
        		+'</li>';
                $("#main_project").append(str);
                infomainList(val.id);
            });
        }
    });
    			
    
    //异步加载主页最牛教练
    $.ajax({
        url:'teamIndexController/main_coach',
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            $.each(data.data.list,function(key,val){
                var str=$('<li onclick="coach_details('+val.id+')">'
                            +'<div class="am-gallery-item">'
                            +'  <a href="javascript:;">'
                            +'      <div class="customer-case-img" ><img id="img'+val.id+'" src='+val.coach_portrait+' /></div>'
                            +'      <h3 class="am-gallery-title">'+isUndefined(val.name,"String")+'</h3>'
                            +'          <div class="am-gallery-desc gallery-words">'+isUndefined(val.personProp,"String")+'</div>'
                            +'  </a>'
                            +'</div>'
                        +'</li>');
                $("#main_coach").append(str);
                infomainList(val.id);
                
            });
        }
    });
});

//----------------------------------------------------列表更多跳转----------------------------------------------------
//跳转更多热门球队页面
$("#more_pop_team").click(function(){
    window.location.href="web/team/team-list.html";
});

//跳转更多热门球员页面
$("#more_pop_person").click(function(){
    window.location.href="web/person/person-list.html";
    $.session.set("Anna","0");
});

//跳转更多热门球员页面
function morePerson(){
	window.location.href="web/person/person-list.html";
    $.session.set("Anna","0");
}

//跳转更多热门教练页面
$("#more_pop_coach").click(function(){
    window.location.href="web/coach/coach-list.html";
});

//----------------------------------------------------列表查看详情----------------------------------------------------
//主页教练详细信息
function coach_details(coach_id){
	$.cookie("coach_id",null,{expires: 7,path: '/'});
    $.cookie("coach_id",coach_id,{expires: 7,path: '/'});
    window.location.href="web/coach/coach-infor.html";
}

//主页查看赛事详情
function particulars_object(object_id){
	$.session.set("Project_Id", object_id);
    window.location.href="web/ss/object_auxiliary.html";
}

//更多页面项目详情
function particulars_racing(racing_id){
	$.session.remove("Project_Id");
	$.session.set("Racing_Id", racing_id);
	//获取赛事基本信息用来判断（跳转页面）
	var index = layer.load(0, { shade : false });
	$.ajax({
		type:"post",
		url:'ssRacingController/findRacingById_z.json',
		data:{'id':racing_id,},
		dataType:"json",
		success:function(data){
		layer.close(index);
		//miss 是否具有管理权
		//Anna(0:赛事报名中，1：报名已截止，2：赛事开始，3：赛事结束)
			var miss = data.data.map.miss;
			//详细页面用来判断是否具有管理权
			$.session.set("Miss", miss);
			var Anna = data.data.map.Anna;
			if(Anna == 0 || Anna == 1){
				window.location.href="web/ss/apply_main.html";//报名页
			}else if(Anna == 2){
				window.location.href="web/ft/against_main.html";//对阵图页面
			}else if(Anna == 3){
				window.location.href="http://www.chinaisport.com/a/chengjigonggao/";//织梦成绩公告页
			}
		}
	});
}

//主页查看运动员详情
function details(person_id){
	$.cookie("person_details_id",null,{expires: 7,path: '/'});
    $.cookie('person_details_id', person_id,{expires: 7,path: '/'});
    window.location.href="web/person/person-infor.html";
}

//主页跳转球队详情
function detailed(team_id){
	$.cookie('team_details_id', null,{expires: 7, path: '/' });
    $.cookie('team_details_id', team_id,{expires: 7, path: '/' });
    window.location.href="web/team/my_team/tean-infor-manage.html";
}

//----------------------------------------------------热门球队功能键----------------------------------------------------
//主页申请加入球队
function join(team_id){
    swal({// 弹出提示框提示用户是否确认删除
        title : "确定要申请该球队吗？",
        text : "马上提交申请，确定要这样做么！",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        closeOnConfirm : true,
        closeOnCancel : true
    }, function(isConfirm) {
        if (isConfirm) {
         //   swal.close()
        	var load = layer.load(0, {shade : false});
            $.ajax({
                type:"POST",
                url:'JoinTeamController/join_team',
                data:{row_teamId : team_id},
                dataType:"json",
                success:function(data){
                    if (1==data.status){
                    	swal({
     					   title:"加入球队!",
     					   text:"球队申请已递交到该球队",
     					   type:"success",
     					   confirmButtonText:"确定"
     				   });
                    }else{
                    	swal({
     					   title:"已申请该球队!",
     					   text:data.msg,
     					   type:"error",
     					   confirmButtonText:"确定"
     				   });
                    }
                    layer.close(load);
                }
            });
        }
    });
}

//----------------------------------------------------侧边栏----------------------------------------------------
//主页
function index_main() {
    window.location.href="main_info.html";
}

//邀请列表
function invite_list() {
    var personflag = $.session.get("personFlag");
    if(4==personflag || teamSign !="0"){
         window.location.href="web/index/invite_list_team.html";
    }else{
         window.location.href="web/index/invite_list.html";
    }
   
}

//退队列表
function quit_team_list(){
    window.location.href="web/index/quit_team_list.html";
}

//加入球队
function join_team() {
    window.location.href="web/team/team-list.html";
};

//我的球队
function my_team() {
	$.cookie('team_details_id', "",{expires: 7, path: '/' });
    window.location.href="web/team/my_team/tean-infor-manage.html";
}

//主办方管理
function sponsor_manage() {
	window.location.href="web/ss/sponsor_main.html";
}

//创建赛事
function creat_competition() {
	add_racing();
	//window.location.href="web/ss/front_project_main.html";
}

//赛事管理
function competition_manage() {
//	window.location.href="web/ss/sponsor_homepage.html";
	window.location.href="web/ss/sponsor_homepage_new.html";
}

//加入赛事
function join_competition() {
//	window.location.href="web/ss/object_list.html";
	window.location.href="web/ss/racing_list.html";
}

//我的赛事
function my_competition() {
    window.location.href="web/ss/my_racing_list.html";
}

//热门赛事
function hot_competition() {
//	window.location.href="web/ss/object_list.html";
	window.location.href="web/ss/racing_list.html";
}

//热门项目
function single_project() {
	window.location.href="web/ss/racing_list.html";
}

//赛事邀请
function competition_invite() {
	window.location.href="web/index/invite_list_racing.html";
};

//赛事进程
function competition_course() {
    window.location.href="web/referee/referee_homepage_new.html";
}

//创建球队
function creat_team() {
  layer.open({
      type: 2,
      title: '创建球队',
      shadeClose: true,
      shade: false,
      maxmin: true, //开启最大化最小化按钮
      area: ['90%', '90%'],
      content:'web/team/create_team.html'
  });
}

//球队管理页面
function team_manage() {
$.cookie('team_details_id', "",{expires: 7, path: '/' });
var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
 $.ajax({
     url:'teamHomepageController/selectManageTeam.json',
     data:{'id':$.cookie('team_details_id')},
     type:"post",
     dataType:"json",
     success:function(data){
         if(0==data.status){
             swal({
                 title : "您还没有创建自己的球队!",
                 text : "请创建自己的球队",
                 type : "info",
                 confirmButtonText : "确定"
             });
             
         }else{
             window.location.href="web/team/my_team/tean-infor-manage.html";
         } 
         layer.close(index);
     }
 });
}

//圈里那些事儿
function circle_matter() {
 alert("圈里那些事儿");
}

//个人信息维护
function message_maintain() {
    window.location.href="web/index/Infor_mod.html";
}

//热门球队
function hot_team() {
    window.location.href="web/team/team-list.html";
}

//热门球员
function hot_person() {
    window.location.href="web/person/hot_athletes.html";
}

//最牛教练
function hot_coach() {
    window.location.href="web/coach/coach-list.html";
}

//金哨裁判
function hot_referee() {
    window.location.href="web/referee/referee-list.html";
}

//----------------------------------------------------列表栏----------------------------------------------------
// 最牛教练
$("#coach-list").click(function(){
	$.session.set("Anna","0");
    window.location.href="web/coach/coach-list.html";
});

//**********************************************************************************竞赛项目添加**********************************************************************
function add_racing() {
	if(checkJurisdiction()=="1"){
		var index_main = layer.open({
			type : 2,
			title : '添加竞赛项目',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '100%', '100%' ],
			content : 'web/ss/racing_add.html',
			cancel: function(){
				 window.location.reload();//刷新当前页面.
			  }
		});
	}else{
		swal({
			title :"您还没有通过主办方审批",
			text : "不能创建竞赛活动！",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
}



//********************************************************************************查询主办方是否通过审批******************************************************************
//从服务器获取值
function checkJurisdiction(){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "ssSponsorController/checkJurisdiction.json",
	    dataType : "json",
	        data : {},
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.obj.approvalFlag;
		}
	}); 
	return jsonObject;
}
