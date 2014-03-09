package com.wally.pattern.abstractFactory;

public class BlackAnimalAbstractFactoryImpl implements AnimalAbstractFactory {

	@Override
	public Cat createCat() {
		return new BlackCat();
	}

	@Override
	public Pig createPig() {
		return new BlackPig();
	}

}
