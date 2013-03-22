package com.wally.pattern.flyweight;

public class FlyweightImpl implements Flyweight {

	@Override
	public void action(int arg) {
		System.out.println("参数值为：" + arg);
	}

}
