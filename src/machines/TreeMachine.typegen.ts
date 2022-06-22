// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setSelectedItem: "TOGGLE";
    setData: "done.invoke.treeItem.expanded.loading:invocation[0]";
  };
  internalEvents: {
    "done.invoke.treeItem.expanded.loading:invocation[0]": {
      type: "done.invoke.treeItem.expanded.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchData: "done.invoke.treeItem.expanded.loading:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "fetchData";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchData: "TOGGLE";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "collapsed"
    | "expanded"
    | "expanded.loading"
    | "expanded.success"
    | "expanded.error"
    | { expanded?: "loading" | "success" | "error" };
  tags: never;
}
