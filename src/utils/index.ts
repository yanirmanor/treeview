export const randomNumBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const nodeSeparator = ".";
export const getNodeDepth = (nodeId: string) =>
  nodeId.split(nodeSeparator).length;
