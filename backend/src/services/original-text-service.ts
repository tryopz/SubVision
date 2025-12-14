import { prisma } from "../client";

export const createOriginalText = async (originalText: string, sourceLang: string) => {
    return await prisma.originalText.create({
        data: {
            text: originalText,
            sourceLang: sourceLang
        },
    });
};

export const getOriginalTextByText = async (text: string, sourceLang: string) => {
    return await prisma.originalText.findFirst({
        where: {
            text: text,
            sourceLang: sourceLang
        },
    });
}

export const updateOriginalText = async (id: number, updatedAt: Date) => {
    return await prisma.originalText.update({
        where: { id: id },
        data: { updatedAt: updatedAt },
    });
}

export const deleteOriginalText = async (id: number) => {
    return await prisma.originalText.delete({
        where: { id: id },
    });
}