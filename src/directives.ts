export const clickOutsideDirective = {
  created(
    element: {
      clickOutsideEvent: {
        (event: { target: any }): void;
        (this: HTMLElement, ev: MouseEvent): any;
      };
      contains: (arg0: any) => any;
    },
    binding: { value: () => void }
  ) {
    element.clickOutsideEvent = (event: { target: any }) => {
      //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) {
        binding.value(); // run callback function
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent);
  },
  unmounted(element: {
    clickOutsideEvent: (this: HTMLElement, ev: MouseEvent) => any;
  }) {
    document.body.removeEventListener('click', element.clickOutsideEvent);
  },
};
