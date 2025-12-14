import { prisma } from "../client";

export const createTranslation = async (translatedText: string, alternative: boolean, targetLang: string, originalTextId: number) => {
    return await prisma.translation.create({
        data: {
            text: translatedText,
            alternative: alternative,
            targetLang: targetLang,
            originalTextId: originalTextId
        },
    });
};

export const getTranslationsByOriginalTextId = async (originalTextId: number) => {
    return await prisma.translation.findMany({
        where: {
            originalTextId: originalTextId
        },
    });
}

export const getTranslationByOriginalTextId = async (originalTextId: number) => {
    return await prisma.translation.findFirstOrThrow({
        where: {
            originalTextId: originalTextId,
            alternative: false
        },
    });
}

export const getAlternativesTranslation = async (originalTextId: number) => {
    return await prisma.translation.findMany({
        where: {
            originalTextId: originalTextId,
            alternative: true
        },
    });
}

export const updateTranslation = async (id: number, translatedText: string, updatedAt: Date) => {
    return await prisma.translation.update({
        where: { id: id },
        data: { text: translatedText, updatedAt: updatedAt },
    });
}

export const deleteTranslation = async (id: number) => {
    return await prisma.translation.delete({
        where: { id: id },
    });
}