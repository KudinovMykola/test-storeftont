import {ICardData, IFormError} from "@types";

export interface IProps {
    /**
     * Form reference on which payment might be submitted.
     */
    formRef?: React.RefObject<HTMLFormElement>;
    /**
     * Form id on which payment might be submitted.
     */
    formId?: string;
    /**
     * Method called after the form is submitted. Passed token attribute will be used to create payment.
     */
    processPayment: (token: string, cardData: ICardData) => void;
    /**
     * Initially selected status/token
     */
    initialStatus?: string;
    /**
     * Errors returned by the payment gateway.
     */
    errors?: IFormError[];
    /**
     * Method called when gateway error occured.
     */
    onError: (errors: IFormError[]) => void;
}

export interface CreditCard {
    brand: string;
    firstDigits: string;
    lastDigits: string;
    expMonth: number;
    expYear: number;
}

export interface CreateAddCC_cardConnectAdditionalCreate {
    __typename: "CardConnectAdditionalCreate";

    token: string;

    card: CreditCard;

}

export interface CreateAddCC {
    checkoutAddCc: CreateAddCC_cardConnectAdditionalCreate | null
}

export interface CreateAddCCVariables {
    token: string;
    expiry: string;
}
  