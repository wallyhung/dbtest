package com.wally.pattern.factoryMethod;

public class Test {
	
	
	public static void main(String[] args) {
		
		WorkFactory classWorkFactory = new ClassWorkFactory();
		Work classWork = classWorkFactory.getWork();
		classWork.doWork();
		

		WorkFactory teacherWorkFactory = new TeacherWorkFactory();
		Work teacherWork = teacherWorkFactory.getWork();
		teacherWork.doWork();

		
	}

}
