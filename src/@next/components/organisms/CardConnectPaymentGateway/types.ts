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
  
  