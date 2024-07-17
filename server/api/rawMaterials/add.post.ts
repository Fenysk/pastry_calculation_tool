import { RawMaterial } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const { name, description, categoryId } = await readBody(event);

    const newRawMaterial: RawMaterial = await prisma.rawMaterial.create({
        data: { name, description, categoryId },
    });

    return newRawMaterial;
});