import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

const entries = require("./entries.json");
store.dispatch({
  type: "SET_ENTRIES",
  entries: entries
});

startServer(store);
