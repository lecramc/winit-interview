import { types, flow } from 'mobx-state-tree';

const OptionsStore = types
  .model('OptionsStore', {
    courts: types.optional(types.array(types.frozen()), []),
    counties: types.optional(types.array(types.frozen()), []),
    violations: types.optional(types.array(types.frozen()), []),
  })
  .actions((self) => ({
    fetchOptions: flow(function* fetchOptions(data) {
      self.courts.replace(data.courts || []);
      self.counties.replace(data.counties || []);
      self.violations.replace(data.violations || []);
    }),
  }));

export default OptionsStore;
