import { Button, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

const GenericErrorMessage = () => {
    return (
        <View style={style.container}>
            <Text style={style.text}>Opps something went wrong. Please try again later</Text>
            <Button style={style.button}>Try Again</Button>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        padding: 20,
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20
    },
    button: {
        width: 150
    }
});

export default GenericErrorMessage;