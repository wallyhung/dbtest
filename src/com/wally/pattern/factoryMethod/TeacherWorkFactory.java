package com.wally.pattern.factoryMethod;

public class TeacherWorkFactory implements WorkFactory {

	@Override
	public Work getWork() {
		return new TeacherWork();
	}

}
