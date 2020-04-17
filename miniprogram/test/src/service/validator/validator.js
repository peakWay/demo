import { schema } from '@/npm/index.js'
import rules from './rules'
import { requiredUserInfoKeys } from './rules'

export function validate(value, cb, {keys = []} = {keys:[]}) {
    let descriptor = getValidateRules(keys.length ? keys : Object.keys(value))
    let validator = new schema(descriptor)

    validator.validate(value, (errors, fields) => {
        if( errors ) {
            return cb(errors)
        }
        return cb(null)
    })
}

export function checkIfRequiredUserInfoFinished (value, cb) {
    let descriptor = getValidateRules(requiredUserInfoKeys)
    let validator = new schema(descriptor)
    validator.validate(value, (errors, fields) => {
        if( errors ) {
            return cb(errors)
        }
        return cb(null)
    })
}

export function getValidateRules(keys = []) {
    let descriptor = {}
    keys.forEach(key => {
        descriptor[key] = rules[key]
    })
    return descriptor
}