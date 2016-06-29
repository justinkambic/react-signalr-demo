import camelcaseKeys from 'camelcase-keys';

export default function camelize(json) {
    for (var k in json)
    {
        if (typeof json[k] == "object" && json[k] !== null)
            json[k] = camelize(json[k]); 
    }
    return camelcaseKeys(json);
};
