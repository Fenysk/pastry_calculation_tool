import { Category } from "@prisma/client";
import prisma from "~/server/data/prisma";

export default defineEventHandler(async (event) => {
    const categories: Category[] = await prisma.category.findMany();
    return categories;
});