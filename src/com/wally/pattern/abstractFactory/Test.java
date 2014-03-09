package com.wally.pattern.abstractFactory;

public class Test {
	
	public static void main(String[] args) {
		
		
		AnimalAbstractFactory balckAnimal = new BlackAnimalAbstractFactoryImpl();
		Cat blackCat = balckAnimal.createCat();
		Pig blackPig = balckAnimal.createPig();
		blackCat.eat();
		blackPig.eat();
		
		
		AnimalAbstractFactory whiteAnimal = new WhiteAnimalAbstractFactoryImpl();
		Cat whiteCat = whiteAnimal.createCat();
		Pig whitePig = whiteAnimal.createPig();
		whiteCat.eat();
		whitePig.eat();
		
		
		
		
		
		
	}

}
