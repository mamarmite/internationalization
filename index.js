import Dictionary from "./src/Dictionnary";

/**
 *
 */
class LangManager {

    static _instance;
    dictionaries = [];

    /**
     *
     */
    constructor() {
        this.dictionaries.push(new Dictionary("base"));
    }

    /**
     * Singleton
     * @return {*}
     */
    static getInstance() {
        if (LangManager._instance === undefined || LangManager._instance === null) {
            LangManager._instance = new LangManager();
        }
        return LangManager._instance;
    }

}


export const lang = Dictionary.getInstance([
    "base",
    "organisations",
    "persons",
    "projects",
    "taxonomies",
    "events",
    "errors",
    "messages",
]);