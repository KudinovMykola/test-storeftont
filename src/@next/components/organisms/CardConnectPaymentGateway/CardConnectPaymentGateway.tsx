import React from "react";

import { IProps } from "./types";
import * as S from "./styles";
import {CreditCardForm} from "@components/organisms";
import {ErrorData} from "@temp/core/payments/cardconnect";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const handleSubmit = async () => void {
}

const CardConnectPaymentGateway: React.FC<IProps> =({
  formRef,
  formId,
}, IProps) => {

  const [cardErrors] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );

  return (
    <S.Wrapper datatype="cardconnectPaymentGateway">
      <CreditCardForm
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