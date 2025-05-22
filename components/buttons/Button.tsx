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
    total?: number,
    loading?: boolean
}

const Button = (Props: Props) => {
    const processOrderHandler = () => {
        if (Props?.onPressHandler) Props.onPressHandler();
    }
    return (
        <TouchableOpacity 
            onPress={processOrderHandler}
            style={style.container}
            disabled={Props?.loading}
            >
            {
                <View style={[styles.flexColumns, style.buttonWrapper]}>
                    <View>
                        <Text style={[styles.textColorWhite, {fontFamily: 'Inter_400Regular', fontSize: 14}]}>{Props.title}</Text>
                    </View>
                    <View>
                        <View style={styles.flexColumns}>
                            <Text style={style.textItemQuantity}>{Props?.itemCount || 0} items</Text>
                            <Text style={style.textAmount}>{formatAmount(Number(Props?.total))}</Text>
                            {
                                Props?.loading ? <Ionicons name="sync" size={20} color="#fff" /> : <Ionicons name="arrow-forward-outline"  size={18} color={'#fff'}/>
                            }
                        </View>
                    </View>
                </View>
            }
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
        color: '#fff',
        marginRight: 5,
        fontFamily: 'Inter_400Regular'
    },
    textAmount: {
        color: '#fff',
        fontSize: 18,
        marginRight: 10,
        fontFamily: 'Inter_700Bold'
    }
});

export default Button;