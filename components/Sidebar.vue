<script lang="ts" setup>

</script>

<template>
    <aside class="bg-yellow-200 flex flex-col gap-4 px-8 py-4">
        <h1>Sidebar</h1>

        <ul>
            <li>
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/raw-materials">Raw Materials</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/categories">Categories</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/providers">Providers</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/inventory">Inventory</NuxtLink>
            </li>
        </ul>
    </aside>
</template>
