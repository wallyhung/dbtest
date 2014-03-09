package com.wally.pattern.bulider;

public class ManBulider implements PersonBuilder {

    Person person;
    
    public ManBulider() 
    {
        person = new Man();
    }
    
    @Override
    public void blildHead() {
    	person.setHead("建造男人的头");
    }
    
    @Override
    public void bulidBody() {
    	person.setBody("建造男人的身体");
    }
    
    @Override
    public void bulidFoot() {
    	person.setFoot("建造男人的脚");
    }
    
    @Override
    public Person bulidPerson() {
    	return person;
    }
    
}

