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
    <div className="relative flex flex-1 overflow-hidden">
      <div className="flex-1 bg-gray-200">
        <ToolPanel />
        <DataCanvas />
      </div>
      <div className="flex-none w-64 border-l-[1px] border-gray-300 pt-4 text-sm h-full overflow-y-auto">
        <div className="max-h-64 border-b-[1px] border-gray-300 pb-3 mb-3 overflow-y-auto">
          <div className="px-3 py-1 font-semibold">Layers</div>
          <Layers />
        </div>
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
