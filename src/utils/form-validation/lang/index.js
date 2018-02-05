import { LANGUAGE } from '../../../config/language'
import { validation as ENGLISH } from './en'
import { validation as THAI } from './th'

const lang = () => {
  switch(LANGUAGE) {
    case 'th':
      return THAI
    case 'en':
      return ENGLISH
    default:
      return ENGLISH
  }
}

export default lang()