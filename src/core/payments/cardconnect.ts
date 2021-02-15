import { utf8Encode } from "string-encode";

export interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
  creditCard: any;
}

export interface ICardInputs {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

export type CardError = { field?: string; message: string } | null;

export interface ICardPaymentInput {
  billingAddress: {
    postalCode?: string;
  };
  number: string;
  cvv: string;
  expirationDate: string;
}

export interface ICardErrors {
  cvv: CardError;
  expirationMonth: CardError;
  expirationYear: CardError;
  number: CardError;
}

export interface ErrorData {
  fieldErrors: ICardErrors;
  nonFieldError?: string;
}

export const cardconnectPayment = (cCard?: any) => {
  const lastDigits = cCard.number.slice(-4);
  const ccType = cCard.cvv;
  const token = btoa(utf8Encode(cCard.number));
  const creditCard = {
    brand: null,
    firstDigits: cCard.number.slice(4),
    lastDigits: cCard.number.slice(-4),
    expMonth: null,
    expYear: null,
  };
  return { lastDigits, ccType, token, creditCard };
};


