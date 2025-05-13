import { createContext } from "react";

export const userDefaultValue = {
    user: {
        email: '',
        firstName: '',
        lastName: '',
        id: '',
        storeId: 0,
        accountType: ''
    },
    setUser: () => null
}

type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    storeId: number;
    accountType: string;
}
type Context = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        storeId: number;
        accountType: string;
    }>>
}

const UserContext = createContext<Context>(userDefaultValue);

export default UserContext;

