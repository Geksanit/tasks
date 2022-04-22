import { createContext } from 'react';

import { TaskStore } from 'features/task';

type Stores = {
  readonly taskStore: TaskStore;
};

const stores: Stores = {
  taskStore: new TaskStore(),
};

const StoreContext = createContext(stores);

export type { Stores };

export { stores, StoreContext };
