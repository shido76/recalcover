import { validate } from 'cnpj'
import CPF from 'cpf'
import ValidaJS from 'valida-js'

ValidaJS.validators['cpf'] = (stateMap, type, name, compareWithValue, defaultValue = '') => {
  return (state) => {
    const isValid = CPF.isValid(state[stateMap]) // Any type of validation here
    /**
     * factoryValidationObj
     * @param {boolean} isValid
     * @param {string} type
     * @param {string} name
     * @return {Object}
     * */
    return ValidaJS.factoryValidationObj(isValid, type, name)
  }
}

ValidaJS.validators['cnpj'] = (stateMap, type, name, compareWithValue, defaultValue = '') => {
  return (state) => {
    const isValid = validate(state[stateMap]) // Any type of validation here
    /**
     * factoryValidationObj
     * @param {boolean} isValid
     * @param {string} type
     * @param {string} name
     * @return {Object}
     * */
    return ValidaJS.factoryValidationObj(isValid, type, name)
  }
}

/*
after that in the createRules you will have that available as:

ValidaJs.rulesCreator(validators, [
  {
    name: 'firstName',
    type: 'newRuleName',
    stateMap: 'firstName'
  }
])
*/

export default ValidaJS.validators