<script lang="ts" setup>
import type { Category } from '@prisma/client';

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
    const { data } = await useFetch<Category[]>('/api/categories');
    categories.value = data.value || [];
};

onMounted(() => {
    fetchCategories();
});

const name = ref('');
const description = ref('');

const handleAddNewCategory = async () => {
    await useFetch('/api/categories/add', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            description: description.value
        })
    });

    fetchCategories();
};
</script>

<template>
    <div class="flex">

        <div>
            <h1>Categories</h1>

            <form @submit.prevent="handleAddNewCategory">
                <div>
                    <label for="name">Name</label>
                    <input id="name" required v-model="name" type="text" placeholder="Name" />
                </div>
                <div>
                    <label for="description">Description</label>
                    <input id="description" v-model="description" type="text" placeholder="Description" />
                </div>
                <button type="submit">Add</button>
            </form>

        </div>

        <ul>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td>{{ category.id }}</td>
                        <td>
                            <NuxtLink :to="`/categories/${category.id}`">{{ category.name }}</NuxtLink>
                        </td>
                        <td>{{ category.description }}</td>
                    </tr>
                </tbody>
            </table>
        </ul>
    </div>
</template>