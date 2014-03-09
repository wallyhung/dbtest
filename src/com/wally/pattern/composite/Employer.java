package com.wally.pattern.composite;

import java.util.List;

public abstract class Employer {
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public abstract void add(Employer employer);
	public abstract void delete(Employer employer);
	
	public void printInfo()
	{
		System.out.println(name);
	}
	
	
	@SuppressWarnings("rawtypes")
	public List employers;
	
	@SuppressWarnings("rawtypes")
	public List getEmployers()
	{
		return this.employers;
	}
	
	
	
	
	

}
