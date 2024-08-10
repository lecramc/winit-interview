// stores/AttorneyStore.js
import { types, flow } from 'mobx-state-tree';
import Attorney from './models/Attorney';

const AttorneyStore = types
  .model('AttorneyStore', {
    attorneys: types.array(Attorney),
  })
  .actions((self) => ({
    fetchAttorneys: flow(function* fetchAttorneys() {
      try {
        const res = yield fetch('/api/attorney-data');
        const data = yield res.json();
        if (data.success) {
          self.attorneys.replace(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch attorneys:', error);
      }
    }),
    createAttorney: flow(function* createAttorney(attorney) {
      try {
        const res = yield fetch('/api/attorney-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attorney),
        });
        const data = yield res.json();
        if (data.success) {
          self.attorneys.push(data.data);
        }
      } catch (error) {
        console.error('Failed to create attorney:', error);
      }
    }),
    updateAttorney: flow(function* updateAttorney(attorney) {
      try {
        const res = yield fetch(`/api/attorney-data/${attorney._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attorney),
        });
        const data = yield res.json();
        if (data.success) {
          const index = self.attorneys.findIndex((a) => a._id === attorney._id);
          if (index !== -1) {
            self.attorneys[index] = data.data;
          }
        }
      } catch (error) {
        console.error('Failed to update attorney:', error);
      }
    }),
    deleteAttorney: flow(function* deleteAttorney(attorney) {
      try {
        const res = yield fetch(`/api/attorney-data?id=${attorney._id}`, {
          method: 'DELETE',
        });
        const data = yield res.json();
        if (data.success) {
          self.attorneys = self.attorneys.filter((a) => a._id !== attorney._id);
        }
      } catch (error) {
        console.error('Failed to delete attorney:', error);
      }
    }),
  }));

export default AttorneyStore;
