package com.wally.login58;

public class Test {
	
	
	private static int deep(int input)
	{
		int local;
		if(input == 100) return 1;
		if(input % 3 == 0) local = input++;
		else local = ++input;
		return deep(local + 1) + 1;
	}
	
	public static void main(String[] args) {
//		System.out.println(deep(0));
		
		for (int i = 0; i < 100; i++) {
			System.out.println("deff("+i+")的值为：---" + deep(i));
		}
	}
	

}
