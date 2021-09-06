import { LOGIN, LOGOUT, REGISTER } from "../actions/type";

const defaultValue = {
    id: "",
    name: "",
    email: "",
    token: ""
}

export default function user(state = defaultValue, action = {}) {
    switch (action.type) {
        case (LOGIN): {
            return action.data;
        }
        case (REGISTER): {
            return action.data;
        }
        case (LOGOUT): {
            return defaultValue;
        }
        default:
            return state;
    }
}