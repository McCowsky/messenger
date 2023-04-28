"use client";
import { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
interface ToasterProviderProps {}

const ToasterProvider: FunctionComponent = () => {
  return <Toaster />;
};

export default ToasterProvider;
