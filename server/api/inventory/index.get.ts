import { Inventory, Provider, RawMaterial } from "@prisma/client";
type InventoryWithDetails = Inventory & { RawMaterial: RawMaterial, Provider: Provider };

import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
    const inventoryItems: InventoryWithDetails[] = await prisma.inventory.findMany({
        include: {
            RawMaterial: true,
            Provider: true,
        },
    });
    return inventoryItems;
});