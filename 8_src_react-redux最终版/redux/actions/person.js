import {ADD_PERSON} from '../constant';

export const createAppPersonAction = (person) => ({type: ADD_PERSON, data: person})
