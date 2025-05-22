import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
}
console.log(`graphql url`, process.env.EXPO_PUBLIC_GRAPHQL_URL);
const httpLink = createHttpLink({
    uri: 'http://192.168.254.102:4000'
    //uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
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
    cache: new InMemoryCache(),
});

export default client;