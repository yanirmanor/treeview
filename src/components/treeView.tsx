import { getNodeDepth } from "../utils";
import { TreeItem } from "./treeItem";
import { TreeViewProps, TreeItemInterface } from "../interfaces/treeview";
import { memo } from "react";

export function TreeViewRender({ treeData }: TreeViewProps) {
  return (
    <div className="TreeView-container">
      {treeData.map((node, index) => {
        const depth = getNodeDepth(node.id);
        return (
          <div style={{ paddingLeft: `${depth * 10}px` }} key={index}>
            <TreeItem node={node} />
          </div>
        );
      })}
    </div>
  );
}

export const TreeView = memo(TreeViewRender);
