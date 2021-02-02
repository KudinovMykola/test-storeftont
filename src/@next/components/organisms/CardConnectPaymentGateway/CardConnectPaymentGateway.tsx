import React from "react";

import { IProps } from "./types";

import { CardConnectForm } from "@components/organisms/CardConnectForm"

import {
  cardconnectPayment,
  ErrorData,
  ICardInputs,
  ICardPaymentInput,
  PaymentData
} from "@temp/core/payments/cardconnect";

import * as S from "./styles";
import {maybe, removeEmptySpaces} from "@temp/core/utils";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const CardConnectPaymentGateway: React.FC<IProps> =({
  processPayment,
  formRef,
  formId,
  postalCode,
}, IProps) => {

  const tokenize = async (creditCard: ICardPaymentInput) => {
    const cardData = cardconnectPayment(creditCard) as PaymentData
    return cardData
  };

  const handleSubmit = async (formData: ICardInputs) => {
    const creditCard: ICardPaymentInput = {
      billingAddress: { postalCode },
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    };
    const payment = await tokenize(creditCard)
    if (payment?.token) {
      console.log('sending')
      console.log(payment)
      processPayment(payment?.token, {
        brand: payment?.ccType,
        firstDigits: null,
        lastDigits: payment?.lastDigits,
        expMonth: null,
        expYear: null,
      });
    }
  };

  const [cardErrors] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );

  return (
    <S.Wrapper datatype="cardconnectPaymentGateway">
      <CardConnectForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "ExpiryDate",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
    </S.Wrapper>
  )
}

export { CardConnectPaymentGateway }