import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";
import { CreateAddCC, CreateAddCCVariables } from "./types"


const ADD_CC = gql`
  mutation addCc($token: String!, $expiry: String!){
    checkoutAddCc(
      input: {
        ccToken: $token,
        ccExpiry: $expiry
      }
    ) {
      token,
      card {
        brand,
        firstDigits,
        lastDigits,
        expMonth,
        expYear  
      }
    }
  }
`;

export const TypedAddCcMutation = TypedMutation<
  CreateAddCC,
  CreateAddCCVariables
>(ADD_CC)