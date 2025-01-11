import { createContext } from "react";

export const userDefaultValue = {
    user: {
        email: '',
        firstName: '',
        lastName: ''
    },
    setUser: () => null
}

type User = {
    firstName: string;
    lastName: string;
    email: string;
}
type Context = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<{
        email: string;
        firstName: string;
        lastName: string;
    }>>
}

const UserContext = createContext<Context>(userDefaultValue);

export default UserContext;

