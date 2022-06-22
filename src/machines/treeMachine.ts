import { createMachine } from "xstate";
import { TreeItemInterface } from "../interfaces/treeview";

export const history = new Map();

export const treeItemMachine = createMachine(
  {
    id: "treeItem",
    initial: "collapsed",
    schema: {
      events: {} as { type: "TOGGLE"; node: TreeItemInterface },
      services: {} as {
        fetchData: {
          data: TreeItemInterface[];
        };
      },
    },
    tsTypes: {} as import("./TreeMachine.typegen").Typegen0,
    context: {
      children: [] as TreeItemInterface[],
      selectedItem: "0",
    },
    states: {
      collapsed: {
        on: {
          TOGGLE: {
            target: "expanded",
            actions: "setSelectedItem",
          },
        },
      },
      expanded: {
        initial: "loading",
        states: {
          loading: {
            invoke: {
              src: "fetchData",
              onDone: [
                {
                  target: "success",
                  actions: "setData",
                },
              ],
              onError: [
                {
                  target: "error",
                },
              ],
            },
          },
          success: {},
          error: {},
        },
        on: {
          TOGGLE: {
            target: "collapsed",
          },
        },
      },
    },
  },
  {
    actions: {
      setSelectedItem: (context, event) => {
        context.selectedItem = event.node.id;
      },
      setData: (context, event) => {
        history.set(context.selectedItem, event.data);
        context.children = event.data;
      },
    },
  }
);
