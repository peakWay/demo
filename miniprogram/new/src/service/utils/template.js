
export function parseTemplate(template, data) {
    if( template.split('|').length == 2 ) {
        let sexTemps = template.split('|')

        let templateMan = sexTemps[0],
            templateGirl = sexTemps[1]

        template = data.sex == 1 ? templateMan : templateGirl
    }

    for( let key in data ) {
        template = template.replace('${' + key + '}', data[key] || key)
    }
    return template
}