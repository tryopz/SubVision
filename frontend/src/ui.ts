import { JSONMODEL, updateData } from "./data-service";

export function initUi(data: JSONMODEL): void {
    setupDataList(data.language)
    setupButtonGroup(data.languageSource, data.languageTarget)
    setupAutoDetectButton();
}

function setupDataList(language: string[]): void {
    const dataListSource = document.getElementById("language-available-source");
    const dataListTarget = document.getElementById("language-available-target");

    console.log("DataList Source:", dataListSource); // DEBUG
    console.log("DataList Target:", dataListTarget);

    if (!dataListSource || !dataListTarget) return;

    language.forEach(lang => {
        console.log(lang)
        const optionSource = document.createElement("option");
        optionSource.value = lang;
        dataListSource.appendChild(optionSource);

        const optionTarget = document.createElement("option");
        optionTarget.value = lang;
        dataListTarget.appendChild(optionTarget);
    });

    const inputSource = document.getElementById("language-choice-source") as HTMLInputElement;
    const inputTarget = document.getElementById("language-choice-target") as HTMLInputElement;

    if (inputSource) {
        inputSource.addEventListener("change", (e) => {
            const value = (e.target as HTMLInputElement).value;
            
            if (language.includes(value)) {
                onSourceLanguageChange(value);
            } else {
                console.warn(`"${value}" is not in the language list`);
                inputSource.value = "";
            }
        });
    }

    if (inputTarget) {
        inputTarget.addEventListener("change", (e) => {
            const value = (e.target as HTMLInputElement).value;
            
            if (language.includes(value)) {
                onTargetLanguageChange(value);
            } else {
                console.warn(`"${value}" is not in the language list`);
                inputTarget.value = "";
            }
        });
    }
}

function setupButtonGroup(languageSource: string[], languageTarget: string[]): void {
    const buttonGroupSource = document.getElementsByClassName("button-group")[0] as HTMLElement;
    const buttonGroupTarget = document.getElementsByClassName("button-group")[1] as HTMLElement;

    for (let i = 0; i < 3; i++) {
        const buttonSource = document.createElement("button");
        buttonSource.textContent = languageSource[i];
        buttonSource.addEventListener("click", () => handleSourceLanguageClick(languageSource[i]));
        buttonGroupSource.appendChild(buttonSource);

        const buttonTarget = document.createElement("button");
        buttonTarget.textContent = languageTarget[i];
        buttonTarget.addEventListener("click", () => handleTargetLanguageClick(languageTarget[i]));
        buttonGroupTarget.appendChild(buttonTarget);
    }
}

function setupAutoDetectButton(): void {
    const autoButton = document.getElementById("auto-button");
    if (!autoButton) return;

    autoButton.addEventListener("click", () => {
        handleAutoDetect();
    });
}

function handleSourceLanguageClick(language: string): void {
    const sourceInput = document.getElementById("language-choice-source") as HTMLInputElement;
    if (sourceInput) {
        sourceInput.value = language;
    }

    onSourceLanguageChange(language);
}

function handleTargetLanguageClick(language: string): void {
    const targetInput = document.getElementById("language-choice-target") as HTMLInputElement;
    if (targetInput) {
        targetInput.value = language;
    }

    onTargetLanguageChange(language);
}

function handleAutoDetect(): void {
    console.info("Starting auto-detection...");

    const sourceInput = document.getElementById("language-choice-source") as HTMLInputElement;
    if (sourceInput) {
        sourceInput.value = "Auto";
        sourceInput.placeholder = "Detecting language...";
    }

    onSourceLanguageChange("auto");
}

async function onSourceLanguageChange(language: string): Promise<void> {
    console.info(`Source language changed to: ${language}`);
    await updateData("source", language)
}

async function onTargetLanguageChange(language: string): Promise<void> {
    console.info(`Target language changed to: ${language}`);
    await updateData("target", language)
}
