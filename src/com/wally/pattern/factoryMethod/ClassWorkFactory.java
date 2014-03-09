package com.wally.pattern.factoryMethod;

public class ClassWorkFactory implements WorkFactory {

	@Override
	public Work getWork() {
		return new ClassWork();
	}

}
