<script lang="ts">
import { clickOutsideDirective } from '@/directives';
import { defineComponent } from 'vue';
import ColoredSlotButton from './util/ColoredSlotButton.vue';

export default defineComponent({
  props: {
    loggedIn: {
      required: true,
      type: Boolean,
    },
    filterOn: {
      required: true,
      type: Boolean,
    },

    expanded: {
      required: true,
      type: Boolean,
    },
  },
  components: { ColoredSlotButton },
});
</script>

<template>
  <nav
    class="flex flex-col sm:flex-row sm:block items-center fixed sm:static h-min bg-white sm:bg-transparent space-y-4 sm:space-y-0 right-0 top-20 w-20 sm:w-fit py-4 sm:py-0 sm:pr-4 sm:space-x-3 shadow-xl sm:shadow-none rounded-bl"
    :class="{ hidden: !expanded }"
  >
    <router-link :to="{ name: 'dronetable' }">
      <ColoredSlotButton btnColorClass="greenbtn" :disabled="!loggedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="navbarbtn"
        >
          <path
            d="M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 160H128V96H64V160zM448 96H192V160H448V96zM64 288H128V224H64V288zM448 224H192V288H448V224zM64 416H128V352H64V416zM448 352H192V416H448V352z"
          />
        </svg>
      </ColoredSlotButton>
    </router-link>

    <router-link :to="{ name: 'dashboard' }">
      <ColoredSlotButton btnColorClass="greenbtn" :disabled="!loggedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="navbarbtn"
        >
          <!-- eslint-disable-next-line max-len -->
          <!-- Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM152 96H64V160H152V96zM208 160H296V96H208V160zM448 96H360V160H448V96zM64 288H152V224H64V288zM296 224H208V288H296V224zM360 288H448V224H360V288zM152 352H64V416H152V352zM208 416H296V352H208V416zM448 352H360V416H448V352z"
          />
        </svg>
      </ColoredSlotButton>
    </router-link>

    <ColoredSlotButton
      btnColorClass="yellowbtn"
      :disabled="!loggedIn"
      @click="$emit('toggle-filter')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="navbarbtn"
      >
        <path
          d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z"
        />
      </svg>
    </ColoredSlotButton>

    <ColoredSlotButton
      btnColorClass="yellowbtn"
      @click="$emit('update-clicked')"
      :disabled="!loggedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="navbarbtn"
      >
        <path
          d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
        />
      </svg>
    </ColoredSlotButton>

    <router-link :to="{ name: 'login' }">
      <ColoredSlotButton btnColorClass="bluebtn" :disabled="loggedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="navbarbtn"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"
          />
        </svg>
      </ColoredSlotButton>
    </router-link>

    <ColoredSlotButton
      btnColorClass="redbtn"
      @click="$emit('logoutClicked')"
      :disabled="!loggedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="navbarbtn"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"
        />
      </svg>
    </ColoredSlotButton>
  </nav>
</template>
