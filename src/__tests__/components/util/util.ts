import { screen } from '@testing-library/vue';

export function isCollapsed() {
  expect(screen.queryByRole('list')).toBeFalsy();
  expect(screen.queryByText('foo')).toBeNull();
  expect(screen.queryByText('bar')).toBeNull();
}
