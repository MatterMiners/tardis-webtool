import {
  render,
  screen,
  fireEvent,
  type RenderResult,
} from '@testing-library/vue';
import SelectWidget from '@/components/util/SelectWidget.vue';
import { isCollapsed } from './util';

describe('SelectWidget', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(SelectWidget, {
      props: {
        data: ['foo', 'bar'],
        label: 'XXX',
      },
    });
  });

  test('renders correctly', () => {
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText('XXX')).toBeTruthy();
  });

  selectWidgetTests(['foo', 'bar']);

  test('emits click event', async () => {
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.click(screen.getByText('foo'));
    expect(renderResult.emitted().clickedItem).toBeTruthy();
  });
});

export function selectWidgetTests(data: string[]) {
  test('is collapsed initially', () => {
    isCollapsed();
  });

  test('is expanded when clicked', async () => {
    await fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getByText(data[0])).toBeTruthy();
    expect(screen.getByText(data[1])).toBeTruthy();
  });

  test('is collapsed when clicked again', async () => {
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.click(screen.getByRole('button'));
    isCollapsed();
  });

  // Not sure if this really clicks outside the button
  test('is collapsed when clicked outside', async () => {
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.click(document.body);
    isCollapsed();
  });
}
