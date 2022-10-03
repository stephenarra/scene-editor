import React from "react";
import { StoreProvider } from "../utils/useStore";

import DataCanvas from "./DataCanvas";
import Layers from "./Layers";
import Detail from "./Detail";
import Header from "./Header";
import ToolPanel from "./ToolPanel";

const Document = () => (
  <div className="flex flex-col w-screen h-screen">
    <div className="flex-none h-12 shadow">
      <Header />
    </div>
    <div className="relative flex flex-1">
      <div className="flex-1 bg-gray-200">
        <ToolPanel />
        <DataCanvas />
      </div>
      <div className="flex-none w-64 border-l-[1px] border-gray-300 pt-4 text-sm">
        <Layers />
        <div className="divider"></div>
        <Detail />
      </div>
    </div>
  </div>
);

const Wrapper = ({ id }: { id: string }) => (
  <StoreProvider id={id}>
    <Document />
  </StoreProvider>
);

export default Wrapper;
