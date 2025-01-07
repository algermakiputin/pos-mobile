import { Input, Layout, Text, List, Divider } from "@ui-kitten/components";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles, { primaryColor, bodyColor, primarySpotColor, secondaryColor, blackLightShade, accentColor, lighterDark } from "@/app/styles/style";
import Button from "@/components/buttons/Button";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Item } from "@/app/types/item";
import OrderContext from "./context/ordersContext";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { GET_ITEMS } from "@/app/src/item-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/app/utils/utils";

const Orders = () => {
    const route = useRouter();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { order, quantityHandler, orderTotal} = useContext(OrderContext);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const { data: itemsData } = useQuery(GET_ITEMS, {
        variables: {
            filter: {
                query: search,
                categories: selectedCategory ? [selectedCategory] : [],
                limit: 10
            }
        }
    });
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

    const renderItem = ({ item, index }: { item: Item, index: number }) => {
        const isSelected = (selectedIndex == index || renderQuantity(item.id));
        return (
            <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                <Layout style={[style.item, isSelected ? {borderWidth: 1, borderColor: lighterDark} : {}]}>
                    <Layout  style={[style.layout, style.avatar]}>
                        <Ionicons name="image-outline" size={30} style={{color: '#ccc'}}/>
                    </Layout>
                    <Layout  style={[style.layout, {alignItems:'flex-start', maxWidth:165}]}>
                        <Text category="s2" style={{color: '#999'}}>{item.barcode}</Text>
                        <Text style={{fontFamily: 'Inter_400Regular'}}>{item.name}</Text>
                        {
                            isSelected ? <Text style={style.price}>{formatAmount(Number(item.price))}</Text> : null
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
                                <Text style={{fontFamily: 'Inter_700Bold'}}>{renderQuantity(item.id)}</Text>
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

    const searchHandler = (search: string) => {
        setSearch(search);
    }   
    
    return (
        <View style={style.container}>
            <View style={style.searchContainer}>
                <Input onChangeText={searchHandler} style={style.searchInput} placeholder="Search Item" accessoryLeft={<Ionicons name="search-outline" />} />
            </View>
            <View style={style.categoryContainer}> 
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Layout style={[style.categoriesWrapper]}>
                        {
                            categoriesData?.categories?.map((category: any) => (
                                <TouchableOpacity 
                                    onPress={() => setSelectedCategory(category?.id)} 
                                    style={[style.category, category?.id == selectedCategory ? style.categorySelected : {}]}
                                    key={`order-category-${category?.id}`}
                                    >
                                    <Ionicons name="grid-outline" color={primaryColor} style={style.categoryIcon} size={14} />
                                    <Text category="s2" style={style.selectedCategoryColor}>{category?.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        
                    </Layout>
                </ScrollView>
            </View>
            <View style={[styles.container, {paddingTop: 10}]}>
                <Text style={{marginBottom: 10, color: '#777', fontFamily: 'Inter_400Regular'}}>Total 342 Items</Text>
                <List
                    style={style.listStyle}
                    data={itemsData?.items?.data}
                    renderItem={renderItem}
                />
            </View> 
            <View style={styles.floatBottom}>
                <Button 
                    total={orderTotal}
                    itemCount={order?.cart?.lineItems?.length} 
                    onPressHandler={processOrderHandler} 
                    title="New Order"/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    selectedCategoryColor: {
        color: primaryColor,
        fontFamily: 'Inter_600SemiBold'
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
        fontFamily: 'Inter_700Bold'
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
        marginBottom: 5,
    },
    category: {
        padding:10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        width: 135,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
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
        gap: 10,
        fontFamily: 'Inter_700Bold'
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
    },
    searchInput: {
        backgroundColor:'#fff', 
        borderRadius: 10
    }
});

export default Orders;