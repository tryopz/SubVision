import { resolveResource } from '@tauri-apps/api/path';
import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export interface JSONMODEL {
    source: string;
    target: string;
    shortcut: string;
    languageSource: string[];
    languageTarget: string[];
    language: string[];
}

const USER_FILE = 'subvision_user.json';
const DEFAULT_FILE = 'subvision_default.json';

export async function initUserFile(): Promise<void> {
    try {
        const fileExists = await exists(USER_FILE, {
            baseDir: BaseDirectory.AppLocalData
        });

        if (!fileExists) {
            console.info('User file missing, creating...');

            try {
                await mkdir('', {
                    baseDir: BaseDirectory.AppLocalData,
                    recursive: true
                });
            } catch (mkdirError) {
                console.log('Directory might already exist');
            }

            const resourcePath = await resolveResource(`resources/${DEFAULT_FILE}`);
            const defaultContent = await readTextFile(resourcePath);

            await writeTextFile(USER_FILE, defaultContent, {
                baseDir: BaseDirectory.AppLocalData
            });

            console.info('User file created successfully');
        }
    } catch (error) {
        console.error('Error initializing user file:', error);
        throw new Error(`Failed to initialize user file: ${error}`);
    }
}

export async function readData(): Promise<JSONMODEL> {
    try {
        await initUserFile();

        const content = await readTextFile(USER_FILE, {
            baseDir: BaseDirectory.AppLocalData
        });

        const data: JSONMODEL = JSON.parse(content);

        if (!data.source || !data.target || !Array.isArray(data.language)) {
            throw new Error('Invalid JSON structure');
        }

        return data;
    } catch (error) {
        console.error('Error reading data:', error);
        throw new Error(`Failed to read data: ${error}`);
    }
}

export async function updateData<K extends keyof JSONMODEL>(
    key: K,
    value: JSONMODEL[K]
): Promise<void> {
    try {
        const currentData = await readData();

        currentData[key] = value;

        await writeTextFile(
            USER_FILE,
            JSON.stringify(currentData, null, 2),
            { baseDir: BaseDirectory.AppLocalData }
        );

        console.info(`Updated ${key} successfully`);
    } catch (error) {
        console.error(`Error updating ${key}:`, error);
        throw new Error(`Failed to update ${key}: ${error}`);
    }
}

export async function updateMultipleData(
    updates: Partial<JSONMODEL>
): Promise<void> {
    try {
        const currentData = await readData();

        const updatedData = { ...currentData, ...updates };

        await writeTextFile(
            USER_FILE,
            JSON.stringify(updatedData, null, 2),
            { baseDir: BaseDirectory.AppLocalData }
        );

        console.info('Updated multiple fields successfully');
    } catch (error) {
        console.error('Error updating multiple fields:', error);
        throw new Error(`Failed to update data: ${error}`);
    }
}

export async function resetToDefault(): Promise<void> {
    try {
        const resourcePath = await resolveResource(`resources/${DEFAULT_FILE}`);
        const defaultContent = await readTextFile(resourcePath);

        await writeTextFile(USER_FILE, defaultContent, {
            baseDir: BaseDirectory.AppLocalData
        });

        console.info('User file reset to default');
    } catch (error) {
        console.error('Error resetting to default:', error);
        throw new Error(`Failed to reset to default: ${error}`);
    }
}

export async function addLanguage(lang: string, array: "languageSource" | "languageTarget"): Promise<void> {
    try {
        const data = await readData();

        if (!data.language.includes(lang)) {
            data.language.push(lang);
            await updateData(array, data.language);
            console.info(`Language ${lang} added to ${array}`);
        } else {
            console.info(`Language ${lang} already exists in ${array}`);
        }
    } catch (error) {
        console.error('Error adding language:', error);
        throw new Error(`Failed to add language: ${error}`);
    }
}

export async function removeLanguage(lang: string, array: "languageSource" | "languageTarget"): Promise<void> {
    try {
        const data = await readData();
        const filteredLanguages = data.language.filter(l => l !== lang);

        if (filteredLanguages.length !== data.language.length) {
            await updateData(array, filteredLanguages);
            console.info(`Language ${lang} removed from ${array}`);
        } else {
            console.info(`Language ${lang} not found in ${array}`);
        }
    } catch (error) {
        console.error('Error removing language:', error);
        throw new Error(`Failed to remove language: ${error}`);
    }
}

export async function hasLanguage(lang: string): Promise<boolean> {
    try {
        const data = await readData();
        return data.language.includes(lang);
    } catch (error) {
        console.error('Error checking language:', error);
        throw new Error(`Failed to check language: ${error}`);
    }
}

export async function getValue<K extends keyof JSONMODEL>(
    key: K
): Promise<JSONMODEL[K]> {
    try {
        const data = await readData();
        return data[key];
    } catch (error) {
        console.error(`Error getting ${key}:`, error);
        throw new Error(`Failed to get ${key}: ${error}`);
    }
}

export async function fileExists(): Promise<boolean> {
    try {
        return await exists(USER_FILE, {
            baseDir: BaseDirectory.AppLocalData
        });
    } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
    }
}