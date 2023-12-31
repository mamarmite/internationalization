/**
 * String management for internationalization in the app.
 * This is a dictionary design pattern. We instanciate the object, load an object as a dictionnary, applay all the keys to the dictionary scope and
 * Then we can access to dictionary.stringKey directly without having to use, dictionary.base.stringKey
 *
 * When we would need to optmize this, we could need to use po/mo instead, and this package can be useful : https://lingui.js.org/
 */
export default class Dictionary {

    static _instance;

    language;
    dictionary;
    dictionaries = [];
    dictionaryFiles = [];
    dictionaryPath = "./";
    filepath;

    constructor(file, lang="fr-ca")
    {
        //will need some refactor to load multiple file.
        this.language = lang;
        this.filepath = `${this.dictionaryPath}${this.language}/`;

        if (typeof file === "string") {
            this.loadDictionary(file);
        }

        if (typeof file === "object" && Array.isArray(file)) {
            this.setDictionaryFiles(file);
        }
    }

    static getInstance(file, lang="fr-ca") {
        if (StringDictionary._instance === undefined || StringDictionary._instance === null) {
            StringDictionary._instance = new StringDictionary(file, lang);
        }
        return StringDictionary._instance;
    }


    setLanguage(lang) {
        this.language = lang;
        this.filepath = `./${this.language}/`;
        this.loadDictionary(file);
    }


    setDictionaryFiles(files) {
        this.dictionaryFiles = files;
        this.loadDictionaries();
    }


    loadDictionaries() {
        if (this.dictionaries.length === 0 && this.dictionaryFiles.length > 0)
        {
            for (const dictionaryFile of this.dictionaryFiles) {
                this.loadDictionary(dictionaryFile);
            }
        } else {
            for (const dictionary of this.dictionaries) {
                this.setDictionary(dictionary);
            }
        }
    }


    loadDictionary(filename) {
        const dictionary = require(this.filepath + filename + ".js");
        const dictionaryObject = dictionary[filename];
        if (dictionaryObject) {
            this.setDictionary(dictionaryObject);
        }
    }


    setDictionary(dictionnary) {
        this.dictionary = dictionnary;
        this.dictionaries.push(dictionnary);
        this.setAliases(dictionnary);
    }


    /**
     * Without alias
     * @param key
     * @return {*}
     */
    getString(key) {
        //return this.dictionary[key] ?? key;//this must be reimplemented for multiple files.
    }


    /**
     *
     */
    setAliases(dictionary) {
        for (const key in dictionary) {
            this.syncDictionaryString(key, dictionary, dictionary[key]);
        }
    }


    /**
     * Set all the properties into this scope
     * @param property
     * @param dictionary
     * @param string
     * @return {*}
     */
    syncDictionaryString(property, dictionary, string) {
        Object.defineProperty(this, property, {
            value: string,
            enumerable: true,
            configurable: true,
        });
    }
}