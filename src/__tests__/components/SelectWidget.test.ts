import { render, screen, fireEvent } from '@testing-library/vue';
import SelectWidget from '@/components/util/SelectWidget.vue';
import { appendFile } from 'fs';

test('renders correctly', () => {
  render(SelectWidget, {
    props: {
      data: ['foo', 'bar'],
      label: 'XXX',
    },
  });

  expect(screen.getByText(/XXX/)).toBeTruthy();
});
