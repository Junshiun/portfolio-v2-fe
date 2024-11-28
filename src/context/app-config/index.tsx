"use client";
import React, { createContext, useContext } from "react";
import { TAppConfigProps } from "./type";

const AppConfigContext = createContext<TAppConfigProps>({});

export const AppConfigProvider = (props: {
  children: React.ReactNode;
  data: TAppConfigProps;
}) => {
  return (
    <AppConfigContext.Provider value={props.data}>
      {props.children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfigContext = () => useContext(AppConfigContext);
