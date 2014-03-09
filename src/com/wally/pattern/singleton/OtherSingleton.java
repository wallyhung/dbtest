package com.wally.pattern.singleton;

public class OtherSingleton {
	
	public OtherSingleton() {
	}
	
	private final static OtherSingleton instance = new OtherSingleton();
	
	public static OtherSingleton getInstance()
	{
		return instance;
	}

}
