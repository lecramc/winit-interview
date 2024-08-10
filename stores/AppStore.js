// stores/AppStore.js
import { types } from 'mobx-state-tree';
import ThemeStore from '@/stores/ThemeStore';
import AttorneyStore from '@/stores/AttorneyStore';
import AttorneyPriceMapStore from '@/stores/AttorneyPriceMapStore';
import OptionsStore from '@/stores/OptionsStore';

const AppStore = types.model('AppStore', {
  attorney: types.optional(AttorneyStore, {}),
  attorneyPriceMap: types.optional(AttorneyPriceMapStore, {}),
  theme: types.optional(ThemeStore, {}),
  options: types.optional(OptionsStore, {
    courts: [],
    counties: [],
    violations: [],
  }),
});

const initialStore = {
  attorney: {},
  attorneyPriceMap: {},
  theme: {},
  options: {
    courts: [],
    counties: [],
    violations: [],
  },
};

export const createStore = (data = {}) => AppStore.create({ ...initialStore, ...data });

const store = createStore();
export default store;
