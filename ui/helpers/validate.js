import {errors} from './notifiers'

const validateRule = (rule, field) => {
    switch(rule) {
        case 'required':
            if (field.value.length == 0) {
                errors.add(`Le champs ${field.displayName} ne doit pas etre vide`)
                field.error = true
            }
        break
    }
}

const validate = field => {
    field.error = false
    if (field.rules)
        field.rules.forEach(rule => validateRule(rule, field))
}

export default validate
