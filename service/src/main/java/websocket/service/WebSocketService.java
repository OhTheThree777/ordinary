package websocket.service;

import com.github.abel533.sql.SqlMapper;
import mapper.mapper.sys.SysUserMapper;
import mapper.model.sys.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WebSocketService {

	@Autowired
	SqlMapper sqlMapper;
	
	@Autowired
	SysUserMapper sysUserMapper;

	/**
	 * 返回用户的未读消息
	 *
	 * @param userName
	 * @return
	 */
	public List<Map<String, Object>> getUnReadNews(String userId) {
		SysUser sysUser = new SysUser();
		sysUser.setPid(Long.valueOf(userId));
		sysUser = sysUserMapper.selectOne(sysUser);

//		Example example = new Example(TTeamLog.class);
//		Criteria cri = example.createCriteria();
//		cri.andEqualTo("seeflag", "0");
//		cri.andEqualTo("personflag", sysUser.getPersonflag());
//		cri.andEqualTo("occupationId", sysUser.getOccupationId());

		List<Map<String, Object>> tteamLogList = sqlMapper.selectList("select * from t_team_log where seeflag='0' and personflag='" + sysUser.getPersonflag() + "' and occupation_id='" + sysUser.getOccupationId() + "'");

		return tteamLogList;
	}

}
