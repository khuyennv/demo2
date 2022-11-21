import { Injectable } from "@nestjs/common";

import langs from "../i18n/index";

@Injectable()
export class MessageComponent {
    static langs: Map<string, Map<string, string>>
    static languageDefault = "vi"

    static init(): void {
        MessageComponent.langs = langs
    }

    /**
     * @param {string} message
     * @param {string} language } language
     * @returns string
     */
    static lang(message: string, language: string = null): string {
        const lang = language ? language : MessageComponent.languageDefault

        if (MessageComponent.langs && MessageComponent.langs.has(lang)) {
            return MessageComponent.langs.get(lang).get(message) ?? message
        }

        return message
    }
}
