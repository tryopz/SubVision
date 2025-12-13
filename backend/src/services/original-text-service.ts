import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export const createOriginalText = async (originalText: string, sourceLang: string) => {
    return await prisma.originalText.create({
        data: {
            text: originalText,
            sourceLang: sourceLang
        },
    });
};
