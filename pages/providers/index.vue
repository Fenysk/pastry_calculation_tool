<script lang="ts" setup>
import type { Provider } from '@prisma/client';

const providers = ref<Provider[]>([]);

const fetchProviders = async () => {
    const { data } = await useFetch<Provider[]>('/api/providers');
    providers.value = data.value || [];
};

onMounted(() => {
    fetchProviders();
});

const name = ref('');
const description = ref('');

const handleAddNewProvider = async () => {
    await useFetch('/api/providers/add', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            description: description.value
        })
    });

    fetchProviders();
};
</script>

<template>
    <div class="flex">

        <div>
            <h1>Providers</h1>

            <form @submit.prevent="handleAddNewProvider">
                <div>
                    <label for="name">Name</label>
                    <input id="name" required v-model="name" type="text" placeholder="Name" />
                </div>
                <div>
                    <label for="description">Description</label>
                    <input id="description" required v-model="description" type="text" placeholder="Description" />
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
                    <tr v-for="provider in providers" :key="provider.id">
                        <td>{{ provider.id }}</td>
                        <td>
                            <NuxtLink :to="`/providers/${provider.id}`">{{ provider.name }}</NuxtLink>
                        </td>
                        <td>{{ provider.description }}</td>
                    </tr>
                </tbody>
            </table>
        </ul>
    </div>
</template>
