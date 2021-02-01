export interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
}

export type CardError = { field?: string; message: string } | null;

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



