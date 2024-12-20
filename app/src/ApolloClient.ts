import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://192.168.1.3:3333/'
});

const authLink = setContext((root: any, { headers }) => {
    const token = '';
    return {
        headers: {
            ...headers,
            authorization: ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;