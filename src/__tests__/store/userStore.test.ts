import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { makeOk, makeStrError } from '@/util';
import { useUsers } from '@/store/userStore';
import * as users from '@/api/userCalls';
import { useFilters } from '@/store/filterStore';
import { useDrones } from '@/store/droneStore';

vi.mock('@/api/userCalls', () => {
  return {
    loginUser: async (username: string, password: string) => {
      return makeOk({ scopes: ['resource:get'], user_name: username });
    },
    logoutUser: async () => {
      return makeOk('Success at loggin out');
    },
  };
});

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('login', async () => {
    // can't really test cookie per design as it is http-only
    // test real login in E2E tests or in component tests
    vi.spyOn(users, 'loginUser');
    const store = useUsers();
    await store.login('test', 'test');
    expect(store.loggedIn).toBe(true);
    expect(store.userData).toEqual({
      scopes: ['resource:get'],
      user_name: 'test',
    });
    expect(users.loginUser).toHaveBeenCalledWith('test', 'test');
  });

  test('logout', async () => {
    vi.spyOn(users, 'logoutUser');

    const store = useUsers();
    const filters = useFilters();
    const drones = useDrones();

    // this will have to be adjusted so it always includes all stores
    vi.spyOn(store, '$reset');
    vi.spyOn(filters, '$reset');
    vi.spyOn(drones, '$reset');

    await store.login('test', 'test');
    await store.logout();
    expect(store.loggedIn).toBe(false);

    expect(store.$reset).toHaveBeenCalled();
    expect(filters.$reset).toHaveBeenCalled();
    expect(drones.$reset).toHaveBeenCalled();

    expect(users.logoutUser).toHaveBeenCalled();
  });

  test('logout without login', async () => {
    const store = useUsers();
    await store.logout();
    expect(store.loggedIn).toBe(false);
  });

  test('login with rest error', async () => {
    // make sure logout succeeds if rest api call fails
    const store = useUsers();
    vi.spyOn(users, 'logoutUser').mockImplementation(async () => {
      return makeStrError('api call failed');
    });
    await store.logout();
  });

  test('hasScopes', async () => {
    const store = useUsers();
    await store.login('test', 'test');
    expect(store.hasScopes(['resource:get'])).toBe(true);
    expect(store.hasScopes(['resource:get', 'resource:post'])).toBe(false);
  });
});
