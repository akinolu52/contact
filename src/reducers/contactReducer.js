import * as actionTypes from '../actions/actionType';
// const formatOutput = (data) => {
//     let result = data.reduce((r, e) => {
//         let group = e.first_name[0];
//         if(!r[group]) r[group] = {group, children: [e]};
//         else r[group].children.push(e);
//         return r;
//     }, {});
//     return Object.values(result);
// };

const deleteContact = (state, id) => {
    return state.filter((data, i) => i !== id )
};

const createContact = (prevState, newState) => {
    return [
        ...prevState, Object.assign({}, newState) 
    ];
};

const updateContact = (state, action) => {
    let newState = deleteContact(state, action.id);
    return createContact(newState, action.contact);
};

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.CREATE_CONTACT:
            return createContact(state, action.contact);

        case actionTypes.EDIT_CONTACT:
            return updateContact(state, action);

        case actionTypes.DELETE_CONTACT:
            return deleteContact(state, action.id);

        case actionTypes.STAR_CONTACT:
            return updateContact(state, action);

        case actionTypes.SEARCH_CONTACT:
            let name = action.name.toLowerCase();
            let newState = state;
            if (name === "") {
                return state;
            }
            else{
                let contacts = newState.filter(function(el) {
                    let el_name = el.first_name+" "+el.last_name;
                    let searchValue = el_name.toLowerCase();
                    return searchValue.indexOf(name) !== -1;
                });
                return contacts;
            }

        default:
            return state;
    }
};
