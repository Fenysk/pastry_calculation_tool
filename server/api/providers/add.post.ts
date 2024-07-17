import { Provider } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const { name, description } = await readBody(event);

    const newProvider: Provider = await prisma.provider.create({
        data: { name, description },
    });

    return newProvider;
});