package com.wally.pattern.decorator;

public class ManDecoratorA extends Decorator 
{
	@Override
	public void eat() {
		super.eat();
		reEat();
		System.out.println(ManDecoratorA.class);
	}
	
	
	public void reEat()
	{
		System.out.println("再吃一餐");
	}

}
