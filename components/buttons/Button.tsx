import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import styles, { primaryColor } from "@/app/styles/style";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "@/app/utils/utils";

type Props = {
    onPressHandler?: () => void;
    title?: string;
    itemCount?: number,
    total?: number
}

const Button = (Props: Props) => {
    const processOrderHandler = () => {
        if (Props?.onPressHandler) Props.onPressHandler();
    }
    return (
        <TouchableOpacity 
            onPress={processOrderHandler}
            style={style.container}>
            <View style={[styles.flexColumns, style.buttonWrapper]}>
                <View>
                    <Text style={styles.textColorWhite}>{Props.title}</Text>
                </View>
                <View>
                    <View style={styles.flexColumns}>
                        <Text style={style.textItemQuantity}>{Props?.itemCount || 0} items</Text>
                        <Text style={style.textAmount}>{formatAmount(Number(Props?.total))}</Text>
                        <Ionicons name="arrow-forward-outline"  size={18} color={'#fff'}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        paddingRight: 20, 
        paddingLeft: 20
    },
    buttonWrapper: {
        padding:15,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: primaryColor, 
        alignItems:'center',
        width: '100%',
        borderRadius: 35,
    },
    textItemQuantity: {
        fontSize: 13,
        fontWeight: 300,
        color: '#fff',
        marginRight: 5
    },
    textAmount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 700,
        marginRight: 10
    }
});

export default Button;