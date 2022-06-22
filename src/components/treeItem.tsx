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

export function TreeItem({ node }: TreeItemProps) {
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
        <div className={`rotate ${state.matches("expanded") ? "down" : ""}`}>
          <KeyboardArrowDownIcon />
        </div>
      </div>

      <Collapse in={state.matches("expanded") ? true : false}>
        {state.matches("expanded.loading") && (
          <div className="Loader-container">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={14} />
              <div className="Loader-text">Loading...</div>
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
