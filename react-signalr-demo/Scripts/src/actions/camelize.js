import camelcaseKeys from 'camelcase-keys';

/**
 * Will take any json property that is capitalized
 * and return it in camelCase.
 * @param { Object } json The json to be mutated.
 * @returns { Object } The "camelized" json.
 */
export default function camelize(json) {
    for (const key in json) {
        if (typeof json[key] === 'object' && json[key] !== null) {
            json[key] = camelize(json[key]);
        }
    }

    return camelcaseKeys(json);
}
