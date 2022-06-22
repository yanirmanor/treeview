export interface TreeItemInterface {
  id: string;
  label: string;
  description?: string;
  children?: TreeItemInterface[];
}

export interface TreeItemProps {
  node: TreeItemInterface;
}

export interface TreeViewProps {
  treeData: TreeItemInterface[];
}
