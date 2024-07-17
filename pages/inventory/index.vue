<script lang="ts" setup>
import type { Category, Inventory, Provider, RawMaterial } from '@prisma/client';
import InventoryAddModal from '~/components/Inventory/AddModal.vue';
type InventoryWithDetails = Inventory & { RawMaterial: RawMaterial & { Category: Category }, Provider: Provider };

const inventoryItems = ref<InventoryWithDetails[]>([]);
const showAddModal = ref(false);

const fetchInventoryItems = async () => {
    const { data } = await useFetch<InventoryWithDetails[]>('/api/inventory');
    inventoryItems.value = data.value || [];
};

const handleAddButtonClick = () => showAddModal.value = true;

const onCloseAddModal = () => {
    showAddModal.value = false;
    fetchInventoryItems();
};

onMounted(() => {
    fetchInventoryItems();
});

const searchInput = ref('');

const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredInventoryItems = computed(() => {
    if (!searchInput.value) return inventoryItems.value;
    const searchValue = removeAccents(searchInput.value.toLowerCase());
    const filteredItems = inventoryItems.value.filter(item => 
        removeAccents(item.RawMaterial.name.toLowerCase()).includes(searchValue) ||
        removeAccents(item.RawMaterial.Category.name.toLowerCase()).includes(searchValue)
    );
    
    return !filteredItems.length ? inventoryItems.value : filteredItems;
});

const sortBy = (field: string) => {
    inventoryItems.value.sort((a, b) => {
        let result = 0;
        switch (field) {
            case 'id':
                result = a.id - b.id;
                break;
            case 'name':
                result = a.RawMaterial.name.localeCompare(b.RawMaterial.name);
                break;
            case 'priceKilo':
                result = a.priceKilo - b.priceKilo;
                break;
            case 'provider':
                result = a.Provider.name.localeCompare(b.Provider.name);
                break;
        }
        return result;
    });
};
</script>

<template>
    <div>
        
        <h1>Inventory</h1>
        
        <div class="flex flex-row justify-between">
            <input v-model="searchInput" type="text" placeholder="Search for an item" />
            <button @click="handleAddButtonClick" class="mb-4 rounded bg-blue-500 px-4 py-2 text-white">Add new item to inventory</button>
        </div>

        <ul class="mt-8">
            <table>
                <thead>
                    <tr>
                        <th @click="sortBy('id')">ID</th>
                        <th @click="sortBy('name')">Matière première</th>
                        <th @click="sortBy('provider')">Fournisseur</th>
                        <th @click="sortBy('priceKilo')">Prix au kilo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredInventoryItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>
                            <NuxtLink :to="`/inventory/${item.id}`">{{ item.RawMaterial.name }}</NuxtLink>
                        </td>
                        <td>{{ item.Provider.name }}</td>
                        <td>{{ item.priceKilo }}</td>
                    </tr>
                </tbody>
            </table>
        </ul>

        <InventoryAddModal v-if="showAddModal" @close="onCloseAddModal" />
    </div>
</template>
