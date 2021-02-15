import {
  CardError,
  ICardErrors,
  ICardInputs,
} from "src/core/payments/cardconnect";

interface ILabelsText {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}
export interface IFormikProps {
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: ICardInputs;
}

export interface IProps {
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  cardErrors: ICardErrors;
  labelsText: ILabelsText;
  handleSubmit: (formData: ICardInputs) => void;
  disabled: boolean;
}

export type CardErrors = CardError[] | null[];

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;

export interface CardConnectInput {
  ccToken: string;
  ccExpiry: string;
}

export interface CCAdditionalCreate_CheckoutAddCC {
  __typename: "CardConnectAdditionalCreate";
}

export interface CCAdditionalCreate {
  checkoutPaymentCreate: CCAdditionalCreate_CheckoutAddCC | null;
}
export interface CCAdditionalCreateVariables {
  ccInput: CardConnectInput;
}
