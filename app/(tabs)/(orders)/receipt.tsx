import { View } from "react-native";
import styles from "@/app/styles/style";
import { Text, Divider, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import OrderContext from "./context/ordersContext";
import { useRouter } from "expo-router";
import { routes } from "@/app/types/routes";

const Receipt = () => {
    const { order, orderTotal, resetState, newOrder } = useContext(OrderContext);
    const route = useRouter();

    const newOrderButtonHandler = () => {
        if (resetState) resetState();
        route.navigate({pathname: routes.orders as any});
    }

    return (
        <View style={[styles.container, {borderRadius: 10}]}>
            <View style={style.receiptWrapper}>
                <Text style={style.header} category="h6">Order Complete!</Text>
                <Text style={style.subTitle}>{order?.cart?.total}</Text>
                <Divider style={[style.divider, styles.mb30]} />
                <View style={[styles.flexColumns, styles.mb5]}>
                    <Text>Ref Number:</Text>
                    <Text>1010239000</Text>
                </View>
                <View style={[styles.flexColumns, styles.mb5]}>
                    <Text>Payment Date Time:</Text>
                    <Text>2024-10-10 9AM</Text>
                </View>
                <View style={[styles.flexColumns, styles.mb5]}>
                    <Text>Customer:</Text>
                    <Text>{order?.customerName || 'Walk In Customer'}</Text>
                </View>
                <Divider style={[style.divider, styles.mt30]} />
                <View style={[styles.flexColumns, styles.mb5]}>
                    <Text>Total Amount</Text>
                    <Text style={styles.bold}>{orderTotal}</Text>
                </View>
            </View>
            <Button onPress={newOrderButtonHandler} style={style.button} status="primary">New Order</Button>
        </View>
    );
}

const style = StyleSheet.create({
    button: {
        marginTop: 10, 
        borderRadius: 10
    },
    receiptWrapper: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        textAlign: 'center'
    },
    divider: {
        marginBottom: 20
    }
});

export default Receipt;