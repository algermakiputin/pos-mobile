import { Input, Layout, Text, List, Divider } from "@ui-kitten/components";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles, { primaryColor, bodyColor, primarySpotColor } from "@/app/styles/style";
import Button from "@/components/buttons/Button";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { Order, CartLineItem } from "@/app/types/order";
import { Item } from "@/app/types/item";
import OrderContext from "./context/ordersContext";

const Orders = () => {
    const route = useRouter();
    const { order, quantityHandler, orderTotal} = useContext(OrderContext);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const processOrderHandler = () => {
        if (order?.cart?.lineItems?.length) route.navigate('/(orders)/summary');
    }

    const renderQuantity = (itemId: string) => {
        const item = order?.cart?.lineItems?.find(item => item.itemId == itemId);
        if (item) {
            return item.quantity;
        }
        return 0;
    }

    const data = [
        {
            id: '1',
            name: 'Surf Powder',
            price: "7.50",
        },
        {
            id: '2',
            name: 'Vinegar',
            price: "7.50"
        },
        {
            id: '3',
            name: 'Coke Litro',
            price: "40.00"
        },
        {
            id: '4',
            name: 'Globe Load 10',
            price: "11.50"
        },
        {
            id: '5',
            name: 'Globa Load 20',
            price: "22.00"
        },
        {
            id: '6',
            name: 'Nips Chocolate',
            price: "10.00"
        },
    ];

    const renderItem = ({ item, index }: { item: Item, index: number }) => {
        const isSelected = (selectedIndex == index || renderQuantity(item.id));
        return (
            <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                <Layout style={[style.item, isSelected ? {borderWidth: 1, borderColor: primaryColor} : {}]}>
                    <Layout  style={[style.layout, style.avatar]}>
                        <Ionicons name="image-outline" size={30} style={{color: '#ccc'}}/>
                    </Layout>
                    <Layout  style={[style.layout, {alignItems:'flex-start', maxWidth:165}]}>
                        <Text>{item.name}</Text>
                        {
                            isSelected ? <Text style={style.price}>{item.price}</Text> : null
                        }
                    </Layout>
                    {
                        isSelected ? (
                            <Layout  style={style.quantity}>
                                <View style={style.actionIconContainer}>
                                    <TouchableOpacity onPress={() => quantityHandler('minus', item)}>
                                        <Ionicons name="remove-outline" size={14} color={'#000'}/>
                                    </TouchableOpacity>
                                </View>
                                <Text>{renderQuantity(item.id)}</Text>
                                <View style={style.actionIconContainer}>
                                    <TouchableOpacity onPress={() => quantityHandler('add', item)}>
                                        <Ionicons name="add-outline" size={14} color={'#000'}/>
                                    </TouchableOpacity>
                                </View>
                            </Layout>
                        ) : <Layout style={style.quantity}><Text style={style.price}>{item.price}</Text></Layout>
                    }
                </Layout>
            </TouchableOpacity>
        )
    }

    const searchIcon = () => {
        return <Ionicons name="search-outline" />
    }

    return (
        <View style={style.container}>
            <View style={style.searchContainer}>
                <Input style={{backgroundColor:'#fff', borderRadius: 10}} placeholder="Search Item" accessoryLeft={searchIcon} />
            </View>
            <View style={style.categoryContainer}> 
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Layout style={[style.categoriesWrapper]}>
                        <TouchableOpacity onPress={() => alert(0)}>
                            <View style={[style.category, style.categorySelected]}> 
                                <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14} />
                                <Text style={style.selectedCategoryColor}>All</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Liquor</Text>
                        </View>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Drinks</Text>
                        </View>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Frozen</Text>
                        </View>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Fish</Text>
                        </View>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Soft Drinks</Text>
                        </View>
                        <View style={style.category}> 
                            <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14}/>
                            <Text>Detergents</Text>
                        </View>
                    </Layout>
                </ScrollView>
            </View>
            <View style={[styles.container, {paddingTop: 10}]}>
                <List
                    style={style.listStyle}
                    data={data}
                    renderItem={renderItem}
                />
            </View> 
            <View style={styles.floatBottom}>
                <Button 
                    total={orderTotal}
                    itemCount={order?.cart?.lineItems?.length} 
                    onPressHandler={processOrderHandler} 
                    title="Proceed New Order"/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    selectedCategoryColor: {
        color: primaryColor
    },
    categorySelected: {
        borderColor: primaryColor, 
        backgroundColor: primarySpotColor
    },
    listStyle: {
        backgroundColor: '#fff', 
        paddingTop:0, 
        marginBottom: 60
    },
    container: {
        position: 'relative', 
        flex:1, 
        backgroundColor: '#fff'
    },
    searchContainer: {
        padding: 20, 
        backgroundColor: bodyColor
    },
    categoryContainer: {
        paddingLeft: 20, 
        backgroundColor: 'white'
    },
    price: {
        fontWeight: 700
    },
    actionIconContainer: {
        padding: 7, 
        backgroundColor: '#fff', 
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#eee'
    },
    categoryIcon: {
        backgroundColor: '#f4f4f5',
        padding: 10,
        borderRadius: 100,
        marginBottom: 3,
    },
    category: {
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        width: 92,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoriesWrapper: {
        flex:1, 
        flexDirection: 'row', 
        paddingTop: 10, 
        borderRadius: 15
    },
    item: {
        minHeight: 40,
        flex: 1,
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 6.5,
        borderColor: bodyColor,
        borderWidth: 1,
        gap: 10
    },
    avatar: {
        width: 50,
        backgroundColor: '#ddd',
        height: 50,
        borderRadius: 15
    },
    layout: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent:'space-evenly', 
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginLeft: 'auto',
        maxWidth: 100,
        alignSelf: 'center',
        borderColor: bodyColor,
        gap: 10
    },
    proceedButton: {
        flex:1,
        justifyContent: 'space-between',
        width: '100%', 
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems:'center',
        padding: 10
    },
    buttonWrapper: {
        paddingLeft: 20, 
        paddingRight: 20,
        marginBottom:10, 
        height:50
    }
});

export default Orders;