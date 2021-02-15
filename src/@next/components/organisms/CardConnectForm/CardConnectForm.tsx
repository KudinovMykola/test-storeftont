import { Formik } from "formik";
import React from "react";

import { CardConnectFormContent } from "./CardConnectFormContent";
import { TypedCardConnectDataMutation } from "../CardConnectPaymentGateway/queries"
import { IProps } from "./types";

const INITIAL_CARD_VALUES_STATE = {
  ccCsc: "",
  ccExp: "",
  ccNumber: "",
};

export const CardConnectForm: React.FC<IProps> = ({
  handleSubmit,
  ...props
}: IProps) => {
  return (
    <TypedCardConnectDataMutation>
      {(checkoutAddCC) => {
        return (
          <Formik
            initialValues={INITIAL_CARD_VALUES_STATE}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              checkoutAddCC({variables: {ccInput: { ccExpiry: "0225", ccToken: "tokencc654896465"}} })
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <CardConnectFormContent
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                {...props}
              />
            )}
          </Formik>
        )
      }}
    </TypedCardConnectDataMutation>
  );
};
