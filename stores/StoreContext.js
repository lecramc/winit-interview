// stores/StoreContext.js
import { createContext, useContext } from 'react';
import mobxStore from './AppStore';

const StoreContext = createContext(mobxStore);

export const useStore = () => useContext(StoreContext);

export default StoreContext;
 