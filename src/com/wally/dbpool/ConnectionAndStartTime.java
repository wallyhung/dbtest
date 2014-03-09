package com.wally.dbpool;

import java.sql.Connection;

public class ConnectionAndStartTime {
	private Connection conn;

	private long startTime;

	public ConnectionAndStartTime(Connection conn, long startTime) {
		super();
		this.conn = conn;
		this.startTime = startTime;
	}

	public Connection getConn() {
		return conn;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

}
