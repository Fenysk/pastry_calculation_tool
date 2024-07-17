<script lang="ts" setup>
import type { Category, RawMaterial } from '@prisma/client';
type RawMaterialWithCategory = RawMaterial & { Category: Category };

const rawMaterials = ref<RawMaterialWithCategory[]>([]);

const fetchRawMaterials = async () => {
    const { data } = await useFetch<RawMaterialWithCategory[]>('/api/rawMaterials');
    rawMaterials.value = data.value || [];
};

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
    const { data } = await useFetch<Category[]>('/api/categories');
    categories.value = data.value || [];
};

onMounted(() => {
    fetchRawMaterials();
    fetchCategories();
});

const name = ref('');
const description = ref('');
const categoryId = ref('');

const handleAddNewRawMaterial = async () => {
    await useFetch('/api/rawMaterials/add', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            categoryId: +categoryId.value
        })
    });

    fetchRawMaterials();
};
</script>

<template>
    <div class="flex">

        <div>
            <h1>Raw Materials</h1>

            <form @submit.prevent="handleAddNewRawMaterial">
                <div>
                    <label for="name">Name</label>
                    <input id="name" required v-model="name" type="text" placeholder="Name" />
                </div>
                <div>
                    <label for="description">Description</label>
                    <input id="description" v-model="description" type="text" placeholder="Description" />
                </div>
                <div>
                    <label for="category">Category</label>
                    <select id="category" required v-model="categoryId">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
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
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rawMaterial in rawMaterials" :key="rawMaterial.id">
                        <td>{{ rawMaterial.id }}</td>
                        <td>
                            <NuxtLink :to="`/raw-materials/${rawMaterial.id}`">{{ rawMaterial.name }}</NuxtLink>
                        </td>
                        <td>{{ rawMaterial.description }}</td>
                        <td>{{ rawMaterial.Category.name }}</td>
                    </tr>
                </tbody>
            </table>
        </ul>
    </div>
</template>
