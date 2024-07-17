import prisma from "~/server/data/prisma";
import { Category, RawMaterial } from "@prisma/client";
type RawMaterialWithCategory = RawMaterial & { Category: Category };

export default defineEventHandler(async (event) => {
    const rawMaterials: RawMaterialWithCategory[] = await prisma.rawMaterial.findMany({
        include: {
            Category: true
        }
    });
    return rawMaterials;
});