import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export const createTranslation = async (translatedText: string, targetLang: string, originalTextId: number) => {
    return await prisma.translation.create({
        data: {
            text: translatedText,
            targetLang: targetLang,
            originalTextId: originalTextId
        },
    });
};