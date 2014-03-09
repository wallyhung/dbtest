package com.wally.pattern.decorator;

public class ManDecoratorB extends Decorator 
{
	@Override
	public void eat() {
		super.eat();
		System.out.println("========================");
		System.out.println(ManDecoratorB.class);
	}

}
