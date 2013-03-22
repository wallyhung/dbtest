package com.wally.exception.example;

import com.wally.exception.PaymentCode;
import com.wally.exception.SystemException;



public class SystemExceptionExample {

	public static void main(String[] args) {
		try {
			throw new SystemException(PaymentCode.CREDIT_CARD_EXPIRED);
		} catch (SystemException e) {
			if (e.getErrorCode() == PaymentCode.CREDIT_CARD_EXPIRED) {
				System.out.println("Credit card expired");
			}
		}
	}

}
