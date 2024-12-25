import { View } from "react-native";
import { Text, Spinner } from "@ui-kitten/components";

const BasicLoader = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner />
            <Text style={{marginTop: 10}}>Loading...</Text>
        </View>
    );
}

export default BasicLoader;