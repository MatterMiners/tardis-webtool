import FilterWidget from '@/components/FilterWidgets/FilterWidget.vue';
import {
  render,
  screen,
  fireEvent,
  type RenderResult,
} from '@testing-library/vue';

describe('FilterWidget', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(FilterWidget, {
      props: {
        label: 'Test',
      },
    });
  });

  test('renders correctly', () => {
    expect(screen.getByText('Test')).toBeTruthy();
  });

  test("emits 'deleteFilter' when clicked", async () => {
    const deleteButton = screen.getByRole('button');
    await fireEvent.click(deleteButton);
    expect(renderResult.emitted().deleteFilter).toBeTruthy();
  });
});
