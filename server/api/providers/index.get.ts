import prisma from "~/server/data/prisma";
import { Provider } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const providers: Provider[] = await prisma.provider.findMany();
    return providers;
});