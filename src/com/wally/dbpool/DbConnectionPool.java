package com.wally.dbpool;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.Vector;
import java.util.logging.Logger;

public 	class DbConnectionPool {

		private final static Logger logger = Logger.getLogger(DbConnectionPool.class.getName());
		private static Vector<Connection> freeConnections = new Vector<Connection>();
		private static Map<String, ConnectionAndStartTime> busyConnectionsMap = Collections.synchronizedMap(new HashMap<String, ConnectionAndStartTime>());
		/**
		 * 计时统计
		 */
		private static Timer timer = new Timer();
		private static long timerCount = 0;
		private static int timeOut = 30;
		static {
			// 另起一个线程
			new Thread(new Runnable() {
				public void run() {
					timer.schedule(new TimerTask() {

						@Override
						public void run() {
							if (LogUtil.isDebug()) {
								logger.info("----------[清除超时的线程进行清除...----------");
							}
							if (LogUtil.isInfo()) {
								System.out.println("----------[清除超时的线程进行清除...----------");
							}

							timerCount++;
							if (timerCount >= 100000000) {
								timerCount = 0;
							}
							if (LogUtil.isDebug()) {
								System.out.println("第" + timerCount + "进行定时清除超时的数据库连接");
							}
							if (LogUtil.isDebug()) {
								System.out.println("----------[清除超时的线程进行清除...----------");
							}
							Set<String> set = busyConnectionsMap.keySet();
							Iterator<String> iterator = set.iterator();
							String connectionAndTimeKeyArray = "";
							int index = 0;
							while (iterator.hasNext()) {
								String connectionClassString = iterator.next();
								ConnectionAndStartTime connectionAndTime = busyConnectionsMap.get(connectionClassString);
								if (new Date().getTime() - connectionAndTime.getStartTime() > timeOut * 1000) {// 大于2分钟
									if (index == 0) {
										connectionAndTimeKeyArray += connectionClassString;
									} else {
										connectionAndTimeKeyArray += "," + connectionClassString;
									}
									index++;
								}

							}
							// 清除
							if (connectionAndTimeKeyArray != null && connectionAndTimeKeyArray != "") {
								String[] connectionClassStringArray = connectionAndTimeKeyArray.split(",");
								for (int i = 0; i < connectionClassStringArray.length; i++) {
									if (busyConnectionsMap.get(connectionClassStringArray[i]) != null) {
										System.out.println("connectionClassStringArray[i]" + connectionClassStringArray[i]);
										busyConnectionsMap.remove(connectionClassStringArray[i]);
										if (LogUtil.isDebug()) {
											System.out.println("清除超时的Connection:" + connectionClassStringArray[i]);
										}
										isUsed--;
									}

								}
							}
							if (LogUtil.isDebug()) {
								System.out.println("当前数据库可用连接" + freeConnections.size());
								System.out.println("----------[清除超时的线程进行清除...----------");
								System.out.println("----------[清除超时的线程成功]----------");
							}

						}
						// 30秒后执行定时操作:每个10秒检查是否超时
					}, 30 * 1000, 10 * 1000);

				}
			}).start();
			if (LogUtil.isInfo()) {
				System.out.println("超时处理Connection线程启动");
			}
			if (LogUtil.isInfo()) {

			}

		}

		private String driverClass;
		private String url;
		private String username;
		private String password;

		private int minConns = 5;
		private int maxConns = 20;
		private static int isUsed = 0;
		private int timeout = 1000;

		// 构建定时器：自动关闭超时的连接.

		/**
		 * 获取连接
		 */
		public static int Try_Time = 0;

		// 只有这个构造方法
		public DbConnectionPool(String driverClass, String url, String username, String password, int minConns, int maxConns) {
			this.driverClass = driverClass;
			this.url = url;
			this.username = username;
			this.password = password;
			this.minConns = minConns;
			this.maxConns = maxConns;
			initConnection();
		}

		private Connection createNewConnection() {

			try {
				Connection conn = null;
				conn = DriverManager.getConnection(url, username, password);
				if (LogUtil.isInfo()) {
					logger.info("创建了一个新的链接");
				}

				if (conn != null) {
					// 注意要在第一次取得连接的时候判断我们填写允许连接数的最大数是否超过数据库本身的允许的连接数
					// 如果当前连接池是空的
					if (freeConnections.size() == 0) {
						DatabaseMetaData metaDatabaseMetaData = conn.getMetaData();
						// 返回数据库允许的最大连接
						int maxConnectionAllowedInDb = metaDatabaseMetaData.getMaxConnections();
						if (LogUtil.isInfo()) {
							logger.info("数据库最大允许的连接数量可能为:" + maxConnectionAllowedInDb);
							logger.info(" (0为不受限制)");
						}
						{
							//连接池配置修正
							if ((maxConnectionAllowedInDb > 0) && (minConns > maxConnectionAllowedInDb)) {
								minConns = 1;
							}
							if ((maxConnectionAllowedInDb > 0) && (maxConns > maxConnectionAllowedInDb)) {
								// 如果连接数量最大值超出数据库允许的数量，重置最大连接值
								maxConns = maxConnectionAllowedInDb;
							}
						}
						
					}
					return conn;
				}
			} catch (SQLException e) {
				if (LogUtil.isInfo()) {
					logger.info("获取数据库连接失败" + e);
				}

			}
			// 使用连接数有可能数据库已经达到最大的连接
			return null;
		}

		/**
		 * 释放连接入连接池
		 */
		public synchronized void freeConnection(Connection conn) throws SQLException {
			if (conn != null && !conn.isClosed()) {
				freeConnections.add(conn);
				busyConnectionsMap.remove(conn.toString().trim());
				if (isUsed >= 1) {
					isUsed--;
				}
				notifyAll();
				if (LogUtil.isInfo()) {
					logger.info("释放连接!");
				}

			}

		}

		public synchronized Connection getConnection() {
			if (LogUtil.isInfo()) {
				System.out.println("[系统报告]:已用 " + isUsed + " 个连接，空闲连接个数 " + freeConnections.size());
			}
			// ==========第一种情况
			if (freeConnections.size() >= 1) {
				if (LogUtil.isInfo) {
					System.out.println("[it has free connections]");
				}

				Connection conn = freeConnections.firstElement();
				try {
					if (conn.isClosed() || conn == null) {
						// 新的连接代替无效连接
						conn = createNewConnection();
					}
				} catch (SQLException e) {
					conn = createNewConnection();
				}
				freeConnections.removeElementAt(0);
				isUsed++;
				// 记住内存地址
				busyConnectionsMap.put(conn.toString().trim(), new ConnectionAndStartTime(conn, new Date().getTime()));
				return conn;
			}

			if (freeConnections.size() <= 0) {
				if (LogUtil.isInfo()) {
					System.out.println("[now it is getting connection from db]");
				}

				// ==========第二种情况.1
				if (isUsed < maxConns) {
					Connection conn = createNewConnection();
					if (conn != null) {
						isUsed++;
						busyConnectionsMap.put(conn.toString().trim(), new ConnectionAndStartTime(conn, new Date().getTime()));
						return conn;
					} else {
						// 再次自身调用自己:可能已经有空的连接存在
						return getConnection();
					}

				}
				// ==========第二种情况.2
				if (isUsed >= maxConns) {
					if (LogUtil.isInfo) {
						System.out.println("it has no more connections that is allowed for use");
					}

					Try_Time++;
					if (LogUtil.isInfo) {
						System.out.println("***[第" + Try_Time + "尝试从新获取连接]***");
					}

					if (Try_Time > 10) {
						// throw new RuntimeException("***[从新获取数据库连接的失败次数过多]***");
						// 多次不能获得连接则返回null
						if (LogUtil.isInfo()) {
							System.out.println("重复尝试获取数据库连接10次...???等待解决问题");
						}
						return null;
					}
					// 连接池已满
					long startTime = System.currentTimeMillis();
					try {
						wait(timeout);
					} catch (InterruptedException e) {
						// e.printStackTrace();
					}
					if (new Date().getTime() - startTime > timeout) {
						if (LogUtil.isInfo()) {
							logger.info("***[没有可获取的链接，正在重试...]***");
						}

						// 再次自身调用自己
						Connection conn = getConnection();
						if (conn != null) {
							busyConnectionsMap.put(conn.toString(), new ConnectionAndStartTime(conn, new Date().getTime()));
							return conn;
						} else {
							// 再次自身调用自己
							return getConnection();
						}
					}
				}

			}
			return null;

		}

		private synchronized void initConnection() {
			try {
				Class.forName(driverClass); // 加载驱动
				for (int i = 0; i < minConns; i++) {
					Connection conn = createNewConnection();
					if (conn != null) {
						freeConnections.add(conn);
					} else {
						throw new RuntimeException("获取的数据库连接为null");
					}

				}
				if (LogUtil.isInfo()) {
					logger.info("初始化数据库" + minConns + "个连接放入连接池\n");
				}

			} catch (ClassNotFoundException e) {
				if (LogUtil.isInfo()) {
					logger.info("驱动无法加载，请检查驱动是否存在，driver: " + driverClass + e + "\n");
				}
			}
		}

		public synchronized void releaseAll() {
			Enumeration<Connection> enums = freeConnections.elements();
			while (enums.hasMoreElements()) {
				try {
					enums.nextElement().close();
				} catch (SQLException e) {
					if (LogUtil.isInfo()) {
						logger.info("关闭链接失败" + e);
					}

				}
			}
			freeConnections.removeAllElements();
			busyConnectionsMap.clear();
			if (LogUtil.isInfo()) {
				logger.info("释放了所有的连接");
			}

		}
}


