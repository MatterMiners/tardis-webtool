import { it } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import '@/api/interceptors';
import { useUsers } from '@/store/userStore';
import { createTestingPinia } from '@pinia/testing';
import { setupMswSetup } from '../helpers/mswServerSetup';

const server = setupServer(
  rest.get('/unauthorized', (req, res, ctx) => {
    return res(ctx.status(401));
  }),

  rest.get('/api/resource/expired', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ detail: 'Signature has expired' }));
  }),

  rest.get('/api/failed/logout', (req, res, ctx) => {
    return res(ctx.status(401));
  })
);

const pinia = createTestingPinia({});
const loginStore = useUsers(pinia);

describe('interceptors', () => {
  beforeAll(() => {
    setupMswSetup(server);
  });

  it('should refresh session', async () => {
    expect(res.data).toEqual({});
  });
});
