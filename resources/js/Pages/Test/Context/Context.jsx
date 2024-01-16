import { createContext, useContext } from "react";

export const TestContext = createContext({});

export const useTestContext = () => useContext(TestContext);
