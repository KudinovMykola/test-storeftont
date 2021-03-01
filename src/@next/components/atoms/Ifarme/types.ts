import React from "react";

export interface IProps extends React.IframeHTMLAttributes<HTMLDivElement> {
  onLoad?: () => void;
}