import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { makeOk } from '@/util';
import type { DroneData } from '@/api/apitypes';
import { useDrones } from '@/store/droneStore';

vi.mock('@/api/resourcesCalls', () => {
  return {
    getDroneData: async () => {
      return makeOk([{ drone_uuid: 'xxx' }] as DroneData[]);
    },
  };
});

describe('droneStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should fetch all drones', async () => {
    const store = useDrones();
    await store.requestDrones();
    expect(store.droneData == ([{ drone_uuid: 'xxx' }] as DroneData[]));
    expect(store.filteredDrones == ([{}] as DroneData[]));
  });
});
