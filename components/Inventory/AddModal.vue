<script lang="ts" setup>
import type { Provider, RawMaterial } from '@prisma/client';

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
    emit('close');
};

const emit = defineEmits(['close']);
const handleClickOutside = (event: MouseEvent) => {
    const modal = document.getElementById('add-modal');
    if (modal && !modal.contains(event.target as Node)) emit('close');    
};
</script>
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="handleClickOutside">
        <div id="add-modal" class="bg-white p-6">
            <h1 class="mb-4 text-xl">Add New Inventory Item</h1>

            <form @submit.prevent="handleAddNewItem">
                <div>
                    <label for="rawMaterialId">Raw Material</label>
                    <select id="rawMaterialId" v-model="rawMaterialId" required>
                        <option v-for="material in rawMaterials" :key="material.id" :value="material.id">{{ material.name }}</option>
                    </select>
                    <p v-if="rawMaterials.find(material => material.id === rawMaterialId)?.description">({{ rawMaterials.find(material => material.id === rawMaterialId)?.description }})</p>
                </div>
                <div>
                    <label for="providerId">Provider</label>
                    <select id="providerId" v-model="providerId" required>
                        <option v-for="provider in providers" :key="provider.id" :value="provider.id">{{ provider.name }}</option>
                    </select>
                    <p v-if="providers.find(provider => provider.id === providerId)?.description">({{ providers.find(provider => provider.id === providerId)?.description }})</p>
                </div>
                <div>
                    <label for="priceKilo">Price Kilo</label>
                    <div class="relative">
                        <input id="priceKilo" required v-model="priceKilo" type="number" placeholder="Price Kilo" class="pl-8" />
                        <span class="absolute left-2 top-1/2 -translate-y-1/2 transform">€</span>
                    </div>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    </div>
</template>
