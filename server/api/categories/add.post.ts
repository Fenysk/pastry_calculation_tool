import { Category } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const { name, description } = await readBody(event);

    const newCategory: Category = await prisma.category.create({
        data: { name, description },
    });

    return newCategory;
});