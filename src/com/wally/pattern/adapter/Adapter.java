package com.wally.pattern.adapter;

public class Adapter implements Target {
	
	private Adaptee adaptee;
	
	public Adapter(Adaptee adaptee) {
		this.adaptee = adaptee;
	}
	
	public Adapter() {
	}
	
	
	public void adapterMethod() {
        System.out.println("Adapter method!");
    }

	@Override
	public void adapteeMethod() {
		adaptee.adapteeMethod();
	}

}
