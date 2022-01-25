import React from "react";
import IGlobalCtx from "../interfaces/IGlobalCtx";

const defaultValue: IGlobalCtx = {
  mode: "light",
};

const GlobalCtx = React.createContext<IGlobalCtx>(defaultValue);

export const useGlobalCtx = (): IGlobalCtx => {
  const Ctx = React.useContext(GlobalCtx);
  if (!Ctx) {
    throw new Error("useGlobalCtx must be inside of GlobalCtx Provider.");
  }
  return Ctx;
};

export default function GlobalCtxProvider(
  props: React.PropsWithChildren<React.ReactNode>
) {
  return <GlobalCtx.Provider value={defaultValue} {...props} />;
}
