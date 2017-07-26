package common.ftp;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPFileFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * FTP服务器连接，用于访问FTP服务器，实现常用的创建目录、删除目录、上传文件、下载文件等操作。
 * @author qinhuan
 * @version 2013-03-01 17:13:39
 */
public class FtpConection {
	
	/**
	 * 文件上次的缓存区大小
	 */
	private static final int BUF_SIZE = 1024*1024;


	private Logger logger = LoggerFactory.getLogger(FtpConection.class);
	

	private String hostname;
	private Integer port;
	private String username;
	private String password;
	
	FTPClient client;

	/**
	 * 创建一个与FTP服务器的连接。
	 * @param url 服务器IP地址
	 * @param prot 服务端口
	 * @param username 用户名
	 * @param password 密码
	 */
	public FtpConection(String url, Integer prot, String username, String password) {
		this.hostname = url;
		this.port = prot;
		this.username = username;
		this.password = password;
		client = new FTPClient();
		try {
			client.connect(hostname, port);
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("FtpConection:链接FTP服务器发生异常！");
		}
		
		try {
			client.login(username, password);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("FtpConection:登陆FTP服务器发生异常！");
		}
	}
	
	/**
	 * 获得原始的FTPClient对象
	 * @return FTPClient对象
	 */
	public FTPClient getClient() {
		return client;
	}

	/**
	 * 测试连接和登录是否成功
	 * @return Boolean值，true-连接并登录成功，false-连接超时或登录失败。
	 */
	public boolean isConnected() {
		boolean result = false;
        int reply = client.getReplyCode();
//		String replyString = client.getReplyString();
        String info = null;
        switch (reply) {
		case 0:
//			System.out.println(reply);  
//			System.out.println("连接超时！");  
//			System.out.println(replyString); 
			info = "连接超时！";
			break;
		case 230:
//			System.out.println(reply);  
//			System.out.println("连接成功，登陆成功！");  
//			System.out.println(replyString); 
			info = "连接成功，登陆成功！";
			result = true;
			break;
		case 530:
//			System.out.println(reply);  
//			System.out.println("用户名或密码错误！");  
//			System.out.println(replyString); 
			info = "用户名或密码错误！";
			break;
		}
        logger.info(info);
		return result;
	}
	
	/**
	 * 创建目录
	 * @param path 目录的地址（如：a\b\c）
	 * @return Boolean值，true-创建成功，false-创建失败（目录存在或路径错误）。
	 * @throws IOException
	 */
	public boolean createDirectory(String path) throws IOException {
		return client.makeDirectory(path);
	}
	
	/**
	 * 删除目录，当目录不为空时，同时递归删除目录下所有文件夹和文件。
	 * @param path 被删除的服务器目录路径（如：a\b\c\）。
	 * @return Boolean值，true-删除成功，false-删除失败（目录不存在）。
	 * @throws IOException 
	 */
	public boolean deleteDirectory(String path) throws IOException {
		boolean result = true;
		
		FTPFile directory = client.mlistFile(path);
		if (directory == null) {
			logger.info("FtpConection:被删除的文件夹不存在。");
			return false;
		}
		if (directory.isDirectory()) {
			FTPFile[] files = client.mlistDir(path);
			for (FTPFile f : files) {
				if (f.isFile()) {
					client.deleteFile(path + "\\" + f.getName());
					logger.info("FtpConection:删除文件" + path + "\\" + f.getName());
				}
				if (f.isDirectory()) {
					deleteDirectory(path + "\\" + f.getName());
				}
			}
			client.removeDirectory(path);
			logger.info("FtpConection:删除目录" + path);
		} else {
			logger.info("FtpConection:被删除的不是目录。");
			result = false;
		}

		return result;
	}
	
	/**
	 * 上传文件
	 * @param localPath 本地文件路径（含文件名）
	 * @param serverPath FTP服务器存储路径（含文件名）
	 * @return Boolean值，true-上传成功，false-上传失败（文件存在或目录错误）。
	 * @throws IOException
	 */
	public boolean uploadFiles(String localPath, String serverPath) throws IOException {
		boolean result = false;

		client.setFileType(FTP.BINARY_FILE_TYPE);
		client.enterLocalPassiveMode();
		client.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
		client.setBufferSize(BUF_SIZE);
		
		InputStream local = null;
		try {
			local = new FileInputStream(localPath);
			result = client.storeFile(serverPath, local);
		} finally {
			if (local != null) {
				local.close();
			}
		}
	
		return result;
	}

	/**
	 * 下载文件
	 * @param serverPath FTP服务器文件路径（含文件名）
	 * @param localPath 本地存储文件路径（含文件名）
	 * @return Boolean值，true-下载成功，false-下载失败（文件目录不存在或文件不存在）。
	 * @throws IOException
	 */
	public boolean downloadFile(String serverPath, String localPath) throws IOException {
		boolean result = false;

		client.setFileType(FTP.BINARY_FILE_TYPE);
		client.enterLocalPassiveMode();
		client.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
		client.setBufferSize(BUF_SIZE);
		
		OutputStream local = null;
		try {
			local = new FileOutputStream(localPath);
			result = client.retrieveFile(serverPath, local);
		} finally {
			try {
				local.close();
			} catch (Exception e) {
				// 本地目录不存在，下载失败。
				logger.error("FTP 下载文件在本地保存出现异常，本地路径不存在！");
				return false;
			}
		}
		
		return result;
	}
	
	/**
	 * 删除FTP服务器上的指定路径的文件
	 * @param serverPath 要删除的文件在服务器上的路径（如：files\a.txt）。
	 * @return Boolean值，true-删除成功，false-删除失败（文件不存在或路径为目录）。
	 * @throws IOException 
	 */
	public boolean deleteServerFile(String serverPath) throws IOException {
		boolean result = false;
		
		FTPFile mlistFile = client.mlistFile(serverPath);
		if (mlistFile == null) {
			logger.info("被删除的文件在服务器上不存在。（" + serverPath + "）");
			return result;
		} else if(mlistFile.isDirectory()) {
			logger.info("指定的路径为目录，无法删除。（" + serverPath + "）");
			return result;
		}
		
		result = client.deleteFile(serverPath);
		
		return result;
	}
	
	/**
	 * 重命名FTP服务器上的文件或目录
	 * @param from 原名称
	 * @param to 更改名称
	 * @return Boolean值，true-修改成功，false-修改失败。
	 * @throws IOException
	 */
	public boolean rename(String from, String to) throws IOException {
		FTPFile mlistFile = client.mlistFile(from);
		if (mlistFile == null) {
			logger.info("重命名的源文件或原目录不存在。（" + from + "）");
			return false;
		}

		return client.rename(from, to);
	}
	
	/**
	 * 获得指定文件或目录的信息
	 * @param serverPath 服务器路径
	 * @return 对应文件的FTPFile对象（null表示文件不存在）。
	 * @throws IOException
	 */
	public FTPFile findOne(String serverPath) throws IOException {
		return client.mlistFile(serverPath);
	}
	/**
	 * 获得指定文件或目录的信息
	 * @param serverPath 服务器路径
	 * @return 对应文件的FTPFile对象（null表示文件不存在）。
	 * @throws IOException
	 */
	public boolean isfindFile(String serverPath) throws IOException {
		return client.listFiles(serverPath).length>0?true:false;
	}
	
	/**
	 * 获得指定目录下的所有文件和目录（对象数组）
	 * @param serverPath 服务器路径
	 * @return FTPFile文件对象数组（无文件返回空数组）。
	 * @throws IOException
	 */
	public FTPFile[] list(String serverPath) throws IOException {
		FTPFile mlistFile = client.mlistFile(serverPath);
		if (mlistFile == null || !mlistFile.isDirectory()) {
			logger.info("指定的路径不是一个有效的目录路径。（" + serverPath + "）");
			return null;
		}
		
		return client.listFiles(serverPath);
	}
	
	/**
	 * 获得指定目录下的所有目录对象数组
	 * @param serverPath 服务器路径
	 * @return FTPFile文件对象数组（无文件返回空数组）。
	 * @throws IOException
	 */
	public FTPFile[] listDir(String serverPath) throws IOException {
		FTPFile mlistFile = client.mlistFile(serverPath);
		if (mlistFile == null || !mlistFile.isDirectory()) {
			logger.info("指定的路径不是一个有效的目录路径。（" + serverPath + "）");
			return null;
		}
		
		return client.listDirectories(serverPath);
	}
	
	/**
	 * 获得指定目录下的所有文件对象数组，可以设置多个扩展名限制，扩展名不区分大小写。
	 * @param serverPath 服务器路径
	 * @param suffixes 可变参数，要筛选的文件扩展名（如：".png",".jpej",".gif"）。
	 * @return FTPFile文件对象数组（无文件返回空数组）。
	 * @throws IOException
	 */
	public FTPFile[] listFiles(String serverPath, final String ... suffixes) throws IOException {
		FTPFile[] result;

		result = client.listFiles(serverPath, new FTPFileFilter() {
			
			@Override
			public boolean accept(FTPFile file) {
				if (file.isFile()) {
					// 当suffixes为null时，即用户没有设置扩展名限制，则全部返回true。
					if (suffixes == null || suffixes.length == 0) {
						return true;
					}
					
					String name = file.getName();
					String suffix = null;
					try {
						suffix = name.substring(name.lastIndexOf('.'));
						suffix = suffix.toLowerCase();
					} catch (Exception e) {
						// 数组下标可能越界，原因是文件或目录名有没有扩展名（即名字中没有'.'），可以忽略。
						// e.printStackTrace();
					}
					for (String s : suffixes) {
						if (s.toLowerCase().equals(suffix)) {
							return true;
						}
					}
				}
				return false;
			}
		});
		
		return result;
	}
	
	/**
	 * 退出已登录的FTP用户
	 * @return Boolean值，true-退出成功，false-退出失败（连接为登录）。
	 * @throws IOException
	 */
	public boolean logout() throws IOException {
		return client.logout();
	}
}
