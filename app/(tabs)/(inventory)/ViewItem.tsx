import React from "react";
import { Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { GET_ITEM } from "@/app/src/item-queries";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";

const ViewItem = () => {
    const param = useLocalSearchParams();
    const { data } = useQuery(GET_ITEM, {
        variables: {
            id: param.id
        }
    });
    console.log(`data`, param.id);
    return (
        <View style={localStyle.container}>
            <View style={localStyle.itemImage}>
                <Image source={{ uri: data?.item?.image }} height={250} width={250}  style={{alignSelf: 'center'}}/>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Item Name</Text>
                <Text style={localStyle.value}>{ data?.item?.name }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Description</Text>
                <Text style={localStyle.value}>{ data?.item?.description }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Stocks</Text>
                <Text style={localStyle.value}>{ data?.item?.stocks }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Retail Price</Text>
                <Text style={localStyle.value}>{ data?.item?.price }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Capital</Text>
                <Text style={localStyle.value}>{ data?.item?.capital }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Supplier</Text>
                <Text style={localStyle.value}>{ data?.item?.supplierName }</Text>
            </View>
            <View style={localStyle.row}>
                <Text style={localStyle.label}>Category</Text>
                <Text style={localStyle.value}>{ data?.item?.categoryName }</Text>
            </View>
        </View>
    )
};

const localStyle = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff'
    },
    itemImage: {
        minHeight: 150,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        borderStyle: 'dashed'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10,
        paddingTop: 10
    },
    label: {
        width: '50%',
        fontFamily: 'Inter_400Regular'
    },
    value: {
        width: '50%',
        textAlign: 'right',
        fontFamily: 'Inter_700Bold'
    }
});

export default ViewItem;