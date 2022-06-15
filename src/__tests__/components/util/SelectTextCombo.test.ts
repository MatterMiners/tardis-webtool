import { selectWidgetTests } from './SelectWidget.test';

import {
  render,
  screen,
  fireEvent,
  cleanup,
  type RenderResult,
} from '@testing-library/vue';
import SelectTextCombo from '@/components/util/SelectTextCombo.vue';

describe('SelectTextCombo', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(SelectTextCombo, {
      props: {
        data: [
          { label: 'foo', type: 'fooType' },
          { label: 'bar', type: 'barType' },
        ],
        label: 'XXX',
      },
    });
  });

  test('renders correctly with default values', () => {
    cleanup();
    render(SelectTextCombo, {
      props: {
        data: [],
      },
    });

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText('Select')).toBeTruthy();
    expect(screen.getByRole('searchbox')).toBeTruthy();
  });

  test('renders correctly', () => {
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText('XXX')).toBeTruthy();
    expect(screen.getByRole('searchbox')).toBeTruthy();
  });

  selectWidgetTests(['foo', 'bar']);

  test('list items disabled when no input', async () => {
    // Not ideal way to test but I couldt find a better way to do this
    await fireEvent.click(screen.getByRole('button'));
    expect(
      screen.getByText('foo').className?.includes('pointer-events-none')
    ).toBeTruthy();
  });

  test('list items enabled when input', async () => {
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.update(screen.getByRole('searchbox'), 'baz');
    expect(
      screen.getByText('foo').className?.includes('pointer-events-none')
    ).toBeFalsy();
  });

  test('emits click event with text', async () => {
    await fireEvent.update(screen.getByRole('searchbox'), 'baz');
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.click(screen.getByText('foo'));
    expect(renderResult.emitted().clickedItem[0]).toEqual([
      { type: 'fooType', text: 'baz' },
    ]);
  });
});
