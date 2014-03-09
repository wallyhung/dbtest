package com.wally.pattern.composite;

public class Programmer extends Employer 
{
    public Programmer() {
	}	
    
    public Programmer(String name) {
    	setName(name);
    	employers = null;
   	}

	@Override
	public void add(Employer employer) {

	}

	@Override
	public void delete(Employer employer) {

	}

}
