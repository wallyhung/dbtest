package com.wally.pattern.abstractFactory;

public class WhiteAnimalAbstractFactoryImpl implements AnimalAbstractFactory {

	@Override
	public Cat createCat() {
		return new WhiteCat();
	}

	@Override
	public Pig createPig() {
		return new WhitePig();
	}

}
