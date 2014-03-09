package com.wally.pattern.bulider;

public class Test {
	
	public static void main(String[] args) {
		
		PersonDirector peDirector = new PersonDirector();
		Person man = peDirector.constructPerson(new ManBulider());
		
		System.out.println(man.getHead());
		System.out.println(man.getBody());
		System.out.println(man.getFoot());
	}
	
	

}
