package com.wally.pattern.singleton;

public class Singleton {
	
	private static Singleton instance = null;
	
	public Singleton() {
	}
	
	public static synchronized Singleton getInstance()
	{
		if(instance == null)
		{
			instance = new Singleton();
		}
		
		return instance;
	}
	
	public static void main(String[] args) {
		
		
		Singleton singleton = Singleton.getInstance();
		Singleton singleton1 = Singleton.getInstance();
		
		System.out.println(singleton == singleton1);
		
	}

}
