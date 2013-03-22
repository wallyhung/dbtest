package com.wally.dbpool;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DbConnectionManager {
	private static DbConnectionManager dbConnectionManager = new DbConnectionManager();
	private static Properties properties = new Properties();
	private static DbConnectionPool pool = null;
	static {
		try {
			properties
					.load(DbConnectionManager.class
							.getResourceAsStream("/org/apple/connectionpool/connectionpoll.properties"));
			pool = new DbConnectionPool(properties.getProperty("driverClass")
					.trim(), properties.getProperty("url").trim(), properties
					.getProperty("username").trim(), properties.getProperty(
					"password").trim(), Integer.parseInt(properties
					.getProperty("minConns").trim()),
					Integer.parseInt(properties.getProperty("maxConns").trim()));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static DbConnectionManager getInstance() {
		if (dbConnectionManager != null) {
			return dbConnectionManager;
		} else {
			return new DbConnectionManager();
		}
	}

	public static void main(String[] args) throws SQLException {
		for (int i = 0; i < 23; i++) {
			Connection connection = DbConnectionManager.getInstance()
					.getConnection();
			System.out.println(connection);
			DbConnectionManager.getInstance().close(connection);
		}
		for (int i = 0; i < 10; i++) {
			Connection connection = DbConnectionManager.getInstance()
					.getConnection();
			System.out.println(connection);
			DbConnectionManager.getInstance().close(connection);
		}

	}

	private DbConnectionManager() {
	}

	public void close(Connection conn) throws SQLException {
		if (conn != null) {
			pool.freeConnection(conn);
		}

	}

	// ----------对外提供的方法----------

	// ----------对外提供的方法----------
	public Connection getConnection() {
		return pool.getConnection();
	}

	public void releaseAll() {
		pool.releaseAll();
	}

}
