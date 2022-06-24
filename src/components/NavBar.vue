<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import ColoredSlotButton from '@/components/util/ColoredSlotButton.vue';
import { useDrones } from '@/store/droneStore';
import { useUsers } from '@/store/userStore';
import FilterBar from '@/components/FilterBar.vue';
import NavButtons from './NavButtons.vue';
import NavBarExpandButton from './util/NavBarExpandButton.vue';

export default defineComponent({
  setup() {
    const userStore = useUsers();
    const droneStore = useDrones();

    const { loggedIn } = storeToRefs(userStore);
    return { loggedIn, userStore, droneStore };
  },
  data() {
    return {
      filterOn: false,
      navButtonsExpanded: false,
      sideBarExpanded: false,
    };
  },
  watch: {
    loggedIn(newValue: boolean) {
      if (!newValue) {
        this.filterOn = false;
      }
    },
  },
  components: { ColoredSlotButton, FilterBar, NavButtons, NavBarExpandButton },
});
</script>

<template>
  <section
    class="flex justify-between items-center bg-white sticky h-20 top-0 z-20 w-full"
    :class="{ 'shadow-md': !filterOn }"
  >
    <router-link to="/">
      <img
        src="@/assets/TARDIS_logo.svg"
        alt="Tardis Logo"
        class="relative h-10 sm:mr-4 ml-5"
      />
    </router-link>

    <h1
      class="text-3xl italic font-bold text-slate-700 hidden sm:block sm:mr-auto"
    >
      WebTool
    </h1>
    <p class="text-xl sm:mr-3">Latest Error</p>

    <NavBarExpandButton
      @click="sideBarExpanded = !sideBarExpanded"
      :class="{ 'shadow-lg': sideBarExpanded }"
      class="sm:hidden"
    />

    <NavButtons
      :loggedIn="loggedIn"
      :filterOn="filterOn"
      class="z-30"
      :expanded="sideBarExpanded"
      @logout-clicked="userStore.logout()"
      @update-clicked="droneStore.requestDrones()"
      @toggle-filter="filterOn = !filterOn"
    />
  </section>
  <FilterBar
    v-show="filterOn"
    :shown="filterOn"
    class="z-10"
    :class="{ 'border-t border-slate-200': filterOn }"
  />
</template>
