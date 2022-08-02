<template>
  <div
    class="text-slate-900 self-stretch sm:m-5 text-center bg-white rounded shadow-md flex flex-col space-y-3 p-5"
  >
    <h1 class="text-3xl">Title Page</h1>
    <h2 class="text-2xl">
      This page can be customized in the
      <code>/src/views/LandingPage.vue</code> file
    </h2>
    <p>
      Put all your html code inside the
      <code>template</code>-tag
    </p>
    <p>
      Style can be customized using either <span>Tailwind CSS</span> or regular
      CSS. Make sure to apply the <code>scoped</code> attribute to the
      <code>style</code>-tag
    </p>
    <div class="flex space-x-5 justify-center">
      <button
        class="bg-[#42B883] hover:bg-[#33a06f] text-white transition-colors py-2 px-4 w-fit self-center rounded-lg"
      >
        <a href="https://vuejs.org/">Vue3</a>
      </button>
      <button
        class="bg-sky-400 hover:bg-sky-500 text-white transition-colors py-2 px-4 w-fit self-center rounded-lg"
      >
        <a href="https://tailwindcss.com/">TailwindCSS</a>
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
code {
  @apply bg-gray-200 text-slate-700 p-0.5 rounded;
}
</style>
