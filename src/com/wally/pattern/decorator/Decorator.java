package com.wally.pattern.decorator;

public abstract class Decorator implements Person
{
	protected Person person;
	

	@Override
	public void eat() {
		person.eat();
	}


	public void setPerson(Person person) {
		this.person = person;
	}
	

}
