import { Category, Inventory, Provider, RawMaterial } from "@prisma/client";
type InventoryWithDetails = Inventory & { RawMaterial: RawMaterial & { Category: Category }, Provider: Provider };

import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
    const inventoryItems: InventoryWithDetails[] = await prisma.inventory.findMany({
        include: {
            RawMaterial: {
                include: {
                    Category: true,
                },
            },
            Provider: true,
        },
    });
    return inventoryItems;
});