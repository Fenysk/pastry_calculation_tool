<script lang="ts" setup>
import type { Inventory, Provider, RawMaterial } from '@prisma/client';
type InventoryWithDetails = Inventory & { RawMaterial: RawMaterial, Provider: Provider };

const inventoryItems = ref<InventoryWithDetails[]>([]);

const fetchInventoryItems = async () => {
    const { data } = await useFetch<InventoryWithDetails[]>('/api/inventory');
    inventoryItems.value = data.value || [];
};

const rawMaterials = ref<RawMaterial[]>([]);

const fetchRawMaterials = async () => {
    const { data } = await useFetch<RawMaterial[]>('/api/rawMaterials');
    rawMaterials.value = data.value || [];
};

const providers = ref<Provider[]>([]);

const fetchProviders = async () => {
    const { data } = await useFetch<Provider[]>('/api/providers');
    providers.value = data.value || [];
};

onMounted(() => {
    fetchInventoryItems();
    fetchRawMaterials();
    fetchProviders();
});

const priceKilo = ref(0);
const rawMaterialId = ref(0);
const providerId = ref(0);

const handleAddNewItem = async () => {
    await useFetch('/api/inventory/add', {
        method: 'POST',
        body: JSON.stringify({
            priceKilo: priceKilo.value,
            rawMaterialId: rawMaterialId.value,
            providerId: providerId.value
        })
    });

    fetchInventoryItems();
};
</script>

<template>
    <div class="flex">

        <div>
            <h1>Inventory</h1>

            <form @submit.prevent="handleAddNewItem">
                <div>
                    <label for="rawMaterialId">Raw Material</label>
                    <select id="rawMaterialId" v-model="rawMaterialId">
                        <option v-for="material in rawMaterials" :key="material.id" :value="material.id">{{
                            material.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="providerId">Provider</label>
                    <select id="providerId" v-model="providerId">
                        <option v-for="provider in providers" :key="provider.id" :value="provider.id">{{ provider.name
                            }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="priceKilo">Price Kilo</label>
                    <div class="relative">
                        <input id="priceKilo" required v-model="priceKilo" type="number" placeholder="Price Kilo"
                            class="pl-6" />
                        <span
                            class="absolute left-2 top-1/2 -translate-y-1/2 transform font-bold text-gray-500">€</span>
                    </div>
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
                        <th>Price Kilo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in inventoryItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>
                            <NuxtLink :to="`/inventory/${item.id}`">{{ item.RawMaterial.name }}</NuxtLink>
                        </td>
                        <td>{{ item.priceKilo }}</td>
                    </tr>
                </tbody>
            </table>
        </ul>
    </div>
</template>
