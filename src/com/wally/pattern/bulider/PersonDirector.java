package com.wally.pattern.bulider;

public class PersonDirector {
	
	public Person constructPerson(PersonBuilder pb) {
        pb.blildHead();
        pb.bulidBody();
        pb.bulidFoot();
        return pb.bulidPerson();
    }


}
