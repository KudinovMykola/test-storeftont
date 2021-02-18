import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * CardConnect payment gateway.
 */

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


const CardConnectPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
}: IProps) => {
  const pathPart = "https://boltgw.cardconnect.com:8443/itoke/ajax-tokenizer.html";
  const paramsParts = [
    "frameborder=10px",
    "scrolling=no",
    "useexpiry=true",
    "usecvv=true",
    "cardinputmaxlength=16",
    "css=input%2Cselect%7Bwidth%3A%20522px%3Bpadding%3A%206px%2012px%3Bborder%3A%201px%20solid%20%23E5E7E9%3Bborder-radius%3A%206px%3Boutline%3A%20none%3Bmargin-bottom%3A%2015px%3Bfont-size%3A%2015px%3B%7Dinput%7Bheight%3A%2025px%3B%7Dselect%7Bwidth%3A%20100px%3Bheight%3A%2040px%3B%7Dbody%7Bmargin%3A0%3B%7Dlabel%7Bfont-size%3A%2015px%3Bfont-family%3A%20%22Open%20Sans%22%2C%20Arial%2C%20sans-serif%3Bline-height%3A%2026px%3Bmargin-bottom%3A8px%3Bfont-weight%3A%20bold%3B%7Dbutton%3Afocus%2Cinput%3Afocus%2Ca%3Afocus%2Cselect%3Afocus%7Boutline%3A%20none%20!important%3Bbox-shadow%3A%200%200%200%203px%20lightskyblue%20!important%3B%7D"
  ];

  let ccToken = "";
  let ccExpiry = "";
  
  const getIframeUrl = () => {
    return `${pathPart}?${paramsParts.join("&")}`;
  };

  const handleTokenEvent = () => {
    window.addEventListener(
      "message",
      event => {
        if (event.data !== null) {
          const refreshedData = JSON.parse(event.data);
          
          ccToken = refreshedData.message;
          ccExpiry = refreshedData.expiry;
        } else {
          console.log("NO DATA EVENT");
        }
      },
      false
    );
  };


  return (

    <Mutation 
      mutation={ADD_CC} 
      onCompleted={(data: any) => {

        // Don't know why but checkoutAddCc can be null without onError-calling
        const response = data.checkoutAddCc;
        if (response) {
          processPayment(response.token, response.card);
        } else {
          console.log('checkoutAddCc or cardConnectData is null. Data:');
          console.log(data);
        }
      }}
      onError={(errors: any) =>{
        // TODO Backend Errors handling in ccData-processing 
        console.log(errors);
      }}
      >
      {(addCc: Function) => (
        <S.Form id={formId} ref={formRef} 
          onSubmit={(e: any) => {
            setTimeout(() => {         
              if(!ccToken || !ccExpiry) {
                console.log('Incorrect card data. Try again, please');
                console.log(ccToken);
                console.log(ccExpiry);
              } else {
                addCc({
                  variables: {
                    token: ccToken, 
                    expiry: ccExpiry
                  }
                });
              }
            }, 1000);
          }}>
          <iframe
            title="CardPointeTokenizer"
            id="tokenframe"
            name="tokenframe"
            src={getIframeUrl()}
            frameBorder="10px"
            scrolling="yes"
            width="100%"
            height="100%"
            onLoad={handleTokenEvent}
          />
        </S.Form>
      )}
    </Mutation>
  );
};


export { CardConnectPaymentGateway };
