import { JSONMODEL } from "./data-service";

export function initUi(data: JSONMODEL): void {
    data.language.forEach((lang, index) => {
        addLanguageToDatalist(lang);
        if (index > 2) return;
        addButtonToGroup(lang);
    });
}

function addLanguageToDatalist(label: string) {
    const datalist = document.getElementById("language-available") as HTMLDataListElement;
    if (!datalist) return;

    const option = document.createElement("option");
    option.value = label;
    datalist.appendChild(option);
}

function addButtonToGroup(label: string) {
    const buttonGroupSource = document.getElementsByClassName("button-group")[0] as HTMLElement;
    const buttonGroupTarget = document.getElementsByClassName("button-group")[1] as HTMLElement;
    if (!buttonGroupSource || !buttonGroupTarget) return;

    const buttonSource = document.createElement("button");
    const buttonTarget = document.createElement("button");
    buttonSource.textContent = label;
    buttonTarget.textContent = label;
    buttonGroupSource.appendChild(buttonSource);
    buttonGroupTarget.appendChild(buttonTarget)
}
