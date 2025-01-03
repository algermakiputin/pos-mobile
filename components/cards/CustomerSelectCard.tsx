import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import CustomerSelectModal from "../modals/CustomerSelectModal";
import { Fragment, useContext, useState } from "react";
import OrderContext from "@/app/(tabs)/(orders)/context/ordersContext";

const CustomerSelectCard = () => {
    const { order } = useContext(OrderContext);
    const [showSelectCustomerModal, setShowCustomerSelectModal] = useState(false);
    const editButtonHandler = () => {
        setShowCustomerSelectModal(!showSelectCustomerModal);
    }
    return (
        <Fragment>
            <CustomerSelectModal show={showSelectCustomerModal} showHandler={editButtonHandler} />
            <View style={style.container}>
                <View style={style.customerWrapper}>
                    <View style={style.infoWrapper}>
                        <View style={style.avatar}>
                            <Ionicons name="person-circle-outline" size={26} />
                        </View>
                        <View style={style.customerDetails}>
                            <Text style={{fontFamily: 'Inter_400Regular'}}>Customer</Text>
                            <Text style={{fontFamily: 'Inter_600SemiBold'}}>{order?.customerName || 'Walk In Customer'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={editButtonHandler}>
                        <View style={style.editWrapper}>
                            <Text style={{fontFamily: 'Inter_400Regular'}}>Edit <Ionicons name="create-outline" /></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Fragment>
    );
}

const style = StyleSheet.create({
    infoWrapper: {
        flex:1, 
        flexDirection:'row', 
        alignItems: 'center'
    },
    editWrapper: {
        flex:1, 
        alignItems: 'flex-end', 
        justifyContent:'center'
    },
    container: {
        height:60
    },
    customerWrapper: {
        backgroundColor: '#fff',
        borderRadius:5,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 20,
       
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 26,
        width: 26
    },
    customerDetails: {
        marginLeft: 10
    }
});

export default CustomerSelectCard;