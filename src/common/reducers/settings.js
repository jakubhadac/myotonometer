const settingsState = {
    language: 'en', defSpeed: 1, defPenetration: 1,
    maxForce: 50, maxSpeed: 10, maxPene: 50,
    indentor: 'S4', units: true

};
const settings = (state = settingsState, action)=>{
    switch (action.type){
        case 'CHANGE_LANGUAGE':
            return {...state, language: action.language };
        case 'CHANGE_SETTINGS':
            return {...state, language: action.language };
        default:
            return state;
    }
};
export default settings;
