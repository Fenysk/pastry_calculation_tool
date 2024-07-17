import { Inventory } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const { priceKilo, rawMaterialId, providerId } = await readBody(event);

    const newInventory: Inventory = await prisma.inventory.create({
        data: { priceKilo, rawMaterialId, providerId },
    });

    return newInventory;
});