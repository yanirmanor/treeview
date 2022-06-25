import { useMachine } from "@xstate/react";
import { Collapse } from "@mui/material";
import { randFileName, randFileType } from "@ngneat/falso";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { treeItemMachine, history } from "../machines/treeMachine";
import { randomNumBetween } from "../utils";
import { TreeView } from "./treeView";
import { TreeItemProps } from "../interfaces/treeview";
import { motion } from "framer-motion";
import { memo } from "react";

const variantsLoaderText = {
  show: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  hide: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const variantsRotation = {
  rotateUp: {
    rotate: 180,
    transition: { duration: 0.3 },
  },
  rotateDown: {
    rotate: 0,
    transition: { duration: 0.3 },
  },
};

export function TreeItemRender({ node }: TreeItemProps) {
  console.log("render TreeItem");
  const { label, description } = node;

  const [state, send] = useMachine(treeItemMachine, {
    services: {
      fetchData: (context, event) => {
        if (
          event.node.id === context.selectedItem &&
          history.get(context.selectedItem)
        ) {
          return new Promise((resolve, reject) => {
            resolve(history.get(context.selectedItem));
          });
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              Array.from({
                length: randomNumBetween(2, 5),
              }).map((_, index) => ({
                id: `${node.id}.${index}`,
                label: randFileName(),
                description: randFileType(),
                children: [],
              }))
            );
          }, 1000);
        });
      },
    },
  });

  return (
    <div className="TreeItem-container">
      <div
        className="TreeItem-row"
        onClick={() => {
          return send({ type: "TOGGLE", node });
        }}
      >
        <div className="TreeItem-row-text">
          <div>{label}</div>
          {description && <div className="description">{description}</div>}
        </div>
        <motion.div
          variants={variantsRotation}
          animate={`${state.matches("expanded") ? "rotateUp" : "rotateDown"}`}
        >
          <KeyboardArrowDownIcon />
        </motion.div>
      </div>

      <Collapse in={state.matches("expanded") ? true : false}>
        {state.matches("expanded.loading") && (
          <div className="Loader-container">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={14} />
              <motion.div
                initial="hide"
                variants={variantsLoaderText}
                animate={state.matches("expanded.loading") ? "show" : "hide"}
                className="Loader-text"
              >
                Loading...
              </motion.div>
            </Box>
          </div>
        )}
        {state.matches({ expanded: "success" }) && (
          <TreeView treeData={state.context.children} />
        )}
      </Collapse>
    </div>
  );
}

export const TreeItem = memo(TreeItemRender);
