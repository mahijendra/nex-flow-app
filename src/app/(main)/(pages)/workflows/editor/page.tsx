import { ConnectionsProvider } from "@/providers/connections-providers";
import EditorProvider from "@/providers/editor-provider";
import React from "react";
import EditorCanvas from "./[editorId]/_components/editor-canvas";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;
