<template>
    <div class="relative top-48 justify-self-center text-center">
        <h1 class="text-6xl font-extrabold">403 Forbidden</h1>
        <h2 class="my-2 text-3xl italic font-semibold">
            {{ $route.redirectedFrom?.path }}
        </h2>
        <h3 class="text-2xl">Insufficient permissions</h3>
    </div>
</template>
