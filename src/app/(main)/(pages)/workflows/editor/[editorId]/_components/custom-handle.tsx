import { useEditor } from "@/providers/editor-provider";
import React, { CSSProperties } from "react";
import { Handle, HandleProps, useStore } from "reactflow";

type Props = HandleProps & { style?: CSSProperties };

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props) => {
  const { state } = useEditor();

  return (
    <Handle
      {...props}
      isValidConnection={(e) => {
        // Count existing edges that have the same source as the current source handle
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source
        ).length;
        // Find the node that matches the source of the connection

        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source
        );
        // Count existing edges that have the same target as the current target handle

        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target
        ).length;
        // Condition to prevent more than one connection to the same target

        if (targetFromHandleInState === 1) return false;
        // Allow multiple outgoing connections if the source node is of type "Condition"

        if (sourceNode?.type === "Condition") return true;
        // Allow connection if there are no existing connections from the source

        if (sourcesFromHandleInState < 1) return true; // Default case: disallow connection

        return false;
      }}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
    />
  );
};

export default CustomHandle;
