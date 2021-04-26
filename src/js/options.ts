import "materialize-css/dist/js/materialize.min";
import {AutoInit, toast} from "materialize-css";

import * as publicInstances from "../assets/public-instances.json";

import {getConfiguration, updateConfiguration} from "./modules/configuration";
import localizeHTMLPage from "./modules/localizeHTMLPage";
import translate from "./modules/translate";

localizeHTMLPage();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener("DOMContentLoaded", async () => {
    const $form = document.querySelector("form") as HTMLFormElement;
    const $skipSegments = document.getElementById("skip_segments") as HTMLInputElement;
    const $quality = document.getElementById("quality") as HTMLInputElement;
    const $api = document.getElementById("api") as HTMLSelectElement;
    const $viewDocs = document.getElementById("view_docs") as HTMLAnchorElement;

    const {
        skipSegments,
        quality,
        api,
    } = await getConfiguration();
    $form.classList.remove("disabled");

    $skipSegments.checked = skipSegments;
    $quality.value = quality.toString();

    const getInstanceId = (api): number => publicInstances.instances.findIndex(instance => instance.url === api.url);
    const updateApiDocsLink = () => {
        const newApi = publicInstances.instances[$api.value];
        $viewDocs.href = `${newApi.url}/docs`;
    };

    // Initialize api select
    (() => {
        publicInstances.instances.forEach((instance, index) => {
            const $option = document.createElement("option") as HTMLOptionElement;
            $option.value = index.toString();
            $option.innerText = `${instance.name} (${instance.url})`;
            $api.appendChild($option);
        });
        $api.value = getInstanceId(api).toString();
        $api.onchange = updateApiDocsLink;
    })();

    $form.onsubmit = (event) => {
        event.preventDefault();
        $form.classList.add("disabled");

        const selectedAPI = publicInstances.instances[$api.value];

        updateConfiguration({
            quality: Number($quality.value),
            skipSegments: $skipSegments.checked,
            api: selectedAPI,
        })
            .then(() => {
                toast({
                    html: translate("optionsPage_form_save_toast"),
                });
                setTimeout(() => {
                    window.close();
                }, 700);
            })
            .catch(() =>
                toast({
                    html: translate("optionsPage_form_save_error"),
                }))
            .finally(() => {
                $form.classList.remove("disabled");
            });
    };

    updateApiDocsLink();

    AutoInit();
});
