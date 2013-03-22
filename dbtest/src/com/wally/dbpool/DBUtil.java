package com.wally.dbpool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtil {

	// ==================================================
	public static Connection getConnection() {

		Connection conn = null;
		conn = DbConnectionManager.getInstance().getConnection();
		return conn;

	}

	// ==================================================
	/**
	 * 建立PreparedStatement实例
	 */
	public static PreparedStatement createPreparedStatement(Connection conn,
			String sql) throws SQLException {
		try {
			if (sql != null && conn != null) {
				PreparedStatement pstmt = conn.prepareStatement(sql);
				if (pstmt != null) {
					return pstmt;
				}
			}
		} catch (SQLException e) {
			throw e;

		}
		return null;

	}

	/**
	 * pstmt更新操作
	 */
	public static int pstmtExcuteUpdate(PreparedStatement pst)
			throws SQLException {
		try {
			if (pst != null) {
				return pst.executeUpdate();
			}
		} catch (SQLException e) {
			throw e;

		}
		return 0;

	}

	// ==================================================

	// ==================================================
	/**
	 * pstmt查询操作
	 */
	public static ResultSet pstmtExcuteQuery(PreparedStatement pst)
			throws SQLException {
		try {
			if (pst != null) {
				ResultSet rs = pst.executeQuery();
				if (rs != null) {
					return rs;
				}
			}
		} catch (SQLException e) {
			throw e;
		}
		return null;
	}

	// ====================================================

	// ====================================================
	public static void close(Connection conn) throws SQLException {
		DbConnectionManager.getInstance().close(conn);
	}

	public static void close(PreparedStatement pst) throws SQLException {
		if (pst != null) {
			try {
				pst.close();
			} catch (SQLException e) {
				throw e;
			}
		}
	}

	public static void close(ResultSet rs) throws SQLException {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				throw e;
			}
		}
	}

	// =========================================================
	/**
	 * 快速关闭资源ResultSet rs, PreparedStatement pstmt, Connection conn
	 */
	public static void close(ResultSet rs, PreparedStatement pst,
			Connection conn) throws SQLException {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				throw e;
			}
		}
		if (pst != null) {
			try {
				pst.close();
			} catch (SQLException e) {
				throw e;
			}
		}
		if (conn != null) {
			DbConnectionManager.getInstance().close(conn);
		}

	}

	/**
	 * 快速关闭资源ResultSet rs, PreparedStatement pstmt
	 */
	public static void close(ResultSet rs, PreparedStatement pst)
			throws SQLException {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				throw e;
			}
		}
		if (pst != null) {
			try {
				pst.close();
			} catch (SQLException e) {
				throw e;
			}
		}

	}

	/**
	 * 快速关闭资源PreparedStatement pstmt, Connection conn
	 */
	public static void close(PreparedStatement pst, Connection conn)
			throws SQLException {
		if (pst != null) {
			try {
				pst.close();
			} catch (SQLException e) {
				throw e;
			}
		}
		if (conn != null) {
			DbConnectionManager.getInstance().close(conn);
		}

	}

	// =========================================================

	// =========================================================
	/**
	 * 事务处理
	 */
	public static void rollback(Connection conn) throws SQLException {
		if (conn != null) {
			try {
				conn.rollback();
			} catch (SQLException e) {
				throw e;
			}
		}
	}

	public static void commit(Connection conn) throws SQLException {
		if (conn != null) {
			try {
				conn.commit();
			} catch (SQLException e) {
				throw e;
			}
		}
	}

	public static void setCommit(Connection conn, Boolean value)
			throws SQLException {
		if (conn != null) {
			try {
				conn.setAutoCommit(value);
			} catch (SQLException e) {
				throw e;
			}
		}
	}

	public static void main(String[] args) throws SQLException {

		for (int i = 0; i < 10; i++) {
			Connection conn = DbConnectionManager.getInstance().getConnection();
			System.out.println(conn);
			DbConnectionManager.getInstance().close(conn);
		}

	}

}
