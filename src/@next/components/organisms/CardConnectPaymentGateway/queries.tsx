import gql from "graphql-tag";
import { TypedCCMutation } from "./mutations";

import { CCAdditionalCreate, CCAdditionalCreateVariables } from "../CardConnectForm/types"

const CHECKOUT_ADD = gql`
  mutation CheckoutAddCc($ccToken: String!, $ccExpiry: String!) {
    checkoutAddCc(input: { ccToken: $ccToken, ccExpiry: $ccExpiry }) {
      created
    }
  }
`;

export const TypedCardConnectDataMutation = TypedCCMutation<
  CCAdditionalCreate,
  CCAdditionalCreateVariables
>(CHECKOUT_ADD);