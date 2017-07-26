package websocket.handler;

import common.util.SysConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.*;
import websocket.service.WebSocketService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class SystemWebSocketHandler implements WebSocketHandler {

	private static final Logger logger;

	private static final ArrayList<WebSocketSession> users;

	static {
		users = new ArrayList<>();
		logger = LoggerFactory.getLogger(SystemWebSocketHandler.class);
	}

	@Autowired
	private WebSocketService webSocketService;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		logger.info("connect to the websocket success......");
		users.add(session);
		String userId = session.getAttributes().get(SysConstants.WEBSOCKET_USERID).toString();
		if (userId != null) {
			// 查询未读消息
			List<Map<String, Object>> resultList = webSocketService.getUnReadNews(userId);

			if (resultList.size() > 0) {
				for (Map<String, Object> resultMap : resultList) {
					session.sendMessage(new TextMessage(resultMap.get("info").toString()));
				}
			}
		}
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

		// sendMessageToUsers();
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		if (session.isOpen()) {
			session.close();
		}
		logger.debug("websocket connection closed......");
		users.remove(session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		logger.debug("websocket connection closed......");
		users.remove(session);
	}

	@Override
	public boolean supportsPartialMessages() {
		return false;
	}

	/**
	 * 给所有在线用户发送消息
	 *
	 * @param message
	 */
	public void sendMessageToUsers(TextMessage message) {
		for (WebSocketSession user : users) {
			try {
				if (user.isOpen()) {
					user.sendMessage(message);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 给某个用户发送消息
	 *
	 * @param userId
	 * @param message
	 */
	public void sendMessageToUser(String userId, TextMessage message) {
		for (WebSocketSession user : users) {
			
			if (user.getAttributes().get(SysConstants.WEBSOCKET_USERID).toString().equals(userId)) {
				try {
					if (user.isOpen()) {
						user.sendMessage(message);
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
				break;
			}
		}
	}
}
