import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
}

const httpLink = createHttpLink({
    // uri: 'http://172.20.10.2:3333/',
    uri: 'http://192.0.0.2:3333'
});


const authLink = setContext(async (root: any, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: await getToken()
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;