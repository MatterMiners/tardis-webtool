import { useFilters } from '@/store/filterStore';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { makeOk } from '@/util';
import { getAllSites } from '@/api/filterCalls';

vi.mock('@/api/filterCalls', () => {
  return {
    getAllStates: async (useCache: boolean) => {
      return makeOk(['state1', 'state2']);
    },
    getAllSites: async (useCache: boolean) => {
      return makeOk(['site1', 'site2']);
    },
    getAllMachineTypes: async (useCache: boolean) => {
      return makeOk(['type1', 'type2']);
    },
  };
});

describe('filterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should fetch all filters', async () => {
    const store = useFilters();
    await store.fetchAll();
    expect(store.allStates).toEqual(['state1', 'state2']);
    expect(store.allSites).toEqual(['site1', 'site2']);
    expect(store.allMachineTypes).toEqual(['type1', 'type2']);
  });

  test('fetch only empty filters', async () => {
    const store = useFilters();
    store.allSites = ['site1'];
    await store.fetchAll();
    expect(store.allSites).toEqual(['site1']);
    expect(store.allMachineTypes).toEqual(['type1', 'type2']);
    expect(store.allStates).toEqual(['state1', 'state2']);
  });
});
