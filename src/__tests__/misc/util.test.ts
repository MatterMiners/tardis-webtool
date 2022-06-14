import { makeError, makeOk, makeStrError, unwrap, unwrapLog } from '@/util';
import * as util from '@/util';
import { test, describe, expect, vi } from 'vitest';

describe('Result<T>', () => {
  test('makeStrError', () => {
    const r = makeStrError('error');
    expect(r).toEqual({ ok: false, err: new Error('error') });
  });

  test('makeError', () => {
    const r = makeError(new Error('error'));
    expect(r).toEqual({ ok: false, err: new Error('error') });
  });

  test('makeOk', () => {
    const r = makeOk('ok');
    expect(r).toEqual({ ok: true, val: 'ok' });
  });

  test('unwrapOk', () => {
    const r = makeOk('ok');
    expect(unwrap(r)).toEqual('ok');
  });

  test('unwrapThrows', () => {
    const r = makeError(new Error('error'));
    expect(() => unwrap(r)).toThrow('error');
  });

  test('unwrapLog', () => {
    const r = makeError(new Error('error'));
    unwrapLog(r);
    expect(unwrapLog(r)).toBeUndefined();
  });

  test('expectThrows', () => {
    const r = makeError(new Error('error'));
    expect(() => util.expect(r, 'error')).toThrow('error');
  });

  test('expectOk', () => {
    const r = makeOk('ok');
    expect(util.expect(r, 'error')).toEqual('ok');
  });

  test('handleOk', () => {
    const r = makeOk('ok');
    const ok = vi.fn();
    util.handle(r, ok, () => {});
    expect(ok).toHaveBeenCalled();
  });

  test('handleError', () => {
    const r = makeError(new Error('error'));
    const error = vi.fn();
    util.handle(r, () => {}, error);
    expect(error).toHaveBeenCalled();
  });
});
