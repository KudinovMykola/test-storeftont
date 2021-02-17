import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * CardConnect payment gateway.
 * TODO replace url values as env var.
 */

const ADD_CC = gql`
  mutation addCc($token: String!, $expiry: String!, $methodId: Method!){
    checkoutAddCc(
      input: {
        ccToken: $token,
        ccExpiry: $expiry,
        methodId: $methodId
      }
    ) {
      cardConnectData {
        token
      }
    }
  }
`;

const CardConnectPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
}: IProps) => {
  const pathPart = "https://boltgw.cardconnect.com:8443/itoke/ajax-tokenizer.html";
  const paramsParts = [
    "useexpiry=true",
    "usecvv=true",
    "cardinputmaxlength=16",
    "css=input%2Cselect%7Bwidth%3A%20522px%3Bpadding%3A%206px%2012px%3Bborder%3A%201px%20solid%20%23E5E7E9%3Bborder-radius%3A%206px%3Boutline%3A%20none%3Bmargin-bottom%3A%2015px%3Bfont-size%3A%2015px%3B%7Dinput%7Bheight%3A%2025px%3B%7Dselect%7Bwidth%3A%20100px%3Bheight%3A%2040px%3B%7Dbody%7Bmargin%3A0%3B%7Dlabel%7Bfont-size%3A%2015px%3Bfont-family%3A%20%22Open%20Sans%22%2C%20Arial%2C%20sans-serif%3Bline-height%3A%2026px%3Bmargin-bottom%3A8px%3Bfont-weight%3A%20bold%3B%7Dbutton%3Afocus%2Cinput%3Afocus%2Ca%3Afocus%2Cselect%3Afocus%7Boutline%3A%20none%20!important%3Bbox-shadow%3A%200%200%200%203px%20lightskyblue%20!important%3B%7D",
  ];
  // I'm not sure that this is correct init values
  let ccToken: string = "";
  let ccExpiry: string = "";
  let ccMethod: string= "";
  // user can select method from some selector-input
  // let ccMethod: int

  const getIframeUrl = () => {
    return `${pathPart}?${paramsParts.join("&")}`;
  };

  const putIframeVars = (eventJson: any) => {
    ccToken = eventJson.message;
    ccExpiry = eventJson.expiry;
  };

  const handlerMethod = () => {
    const method: any = document.getElementById("methodselector");
    if (method){
      ccMethod = method.options[method.selectedIndex].value;
    }
  };

  const handleTokenEvent = () => {
    window.addEventListener(
      "message",
      event => {
        // TODO validate refreshedData as obj with non-empty strings message and expiry
        // Error block
        const refreshedData = JSON.parse(event.data);
        if (refreshedData.expiry && refreshedData.message) {
          putIframeVars(refreshedData);
        }
      },
      false
    );
  };



  return (
    /* TODO 
    * add selector input after iframe for ccMethod
    * ensure that the form submits the given after updating and validating the data of the iframe in the function
    * ensure that the form submits the given after select method id
    * add error block
    */
    <Mutation mutation={ADD_CC}>
      {(addCc: Function) => (
        <S.Form
          id={formId}
          ref={formRef}
          onSubmit={(e: any) => {
            /* TODO:
            * delete preventDefault after finish with this Gateway
            * clear any logs
            */

            // TODO: this function will
            // - send method id 
            // - get token from API

            setTimeout(() => {
              if (ccToken && ccExpiry && ccMethod) {
                addCc({
                  variables: {token: ccToken, expiry: ccExpiry, methodId: ccMethod}
                });
              }
              if (!ccToken || !ccExpiry) {
                alert("Missing Card Data");
              }
              if (!ccMethod) {
                alert("Missing Payment Method")
              }
            }, 2000)

            //TODO token from ADD CC must be here
            processPayment(ccToken);
          }}>
          <iframe
            title="CardPointeTokenizer"
            id="tokenframe"
            name="tokenframe"
            src={getIframeUrl()}
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            onLoad={handleTokenEvent}
          />
          <S.Label >
            Payment Method
          </S.Label>
          <S.Select
            id="methodselector"
            defaultValue=""
            onChange={handlerMethod}
          >
            <option value="">--</option>
            <option value="JCB">JCB</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="DISCOVERY">DISCOVERY</option>
            <option value="AMEX">AMEX</option>
            <option value="VISA">VISA</option>
          </S.Select>

        </S.Form>
      )}
    </Mutation>
  );
};


export { CardConnectPaymentGateway };
