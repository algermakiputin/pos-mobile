import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import styles from "@/app/styles/style";
import { Input, List, Spinner, Text} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import { routes } from "@/app/types/routes";
import { GET_ITEMS, DESTROY_ITEM } from "@/app/src/item-queries";
import { useMutation, useQuery } from "@apollo/client";
import { Item } from "@/app/types/item";
import { useContext, useEffect, useState } from "react";
import InventoryContext, { ObjectFilterEnum } from "./context/InventoryContext";
import { formatAmount } from "@/app/utils/utils";
import UserContext from "@/app/context/userContext";

const InventoryHomePage = () => {
    const router = useRouter(); 
    const userContext = useContext(UserContext);
    const { ContextMenu } = renderers;
    const [limit, setLimit] = useState(10);
    const { filters, setFilter, removeFilter } = useContext(InventoryContext);
    const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
        variables: {
            filter: {
                query: filters.query,
                categories: filters.categories?.map(category => category?.id),
                suppliers: filters.suppliers?.map(supplier => supplier.id),
                limit
            }
        },
    }); 
    const [destroyItem] = useMutation(DESTROY_ITEM);

    const renderSearchIcon = () => {
        return <Ionicons name="search-outline" />
    } 
  
    const filterButtonHandler = () => {
        router.navigate({pathname: routes.itemFilter as any});
    }

    const newButtonHandler = () => {
        router.navigate({pathname: routes.newItem} as any);
    }

    const deleteHandler = async (id: string) => {
        await destroyItem({ variables: { id }});
        refetch();
    }

    useEffect(() => {
        refetch();
    }, []);

    const showAlert = (id: string) =>
        Alert.alert(
            'Are you sure you want to delete that Item?',
            'That item will be permanently deleted',
            [
                {
                    text: 'Confirm',
                    onPress: () => deleteHandler(id),
                    style: 'cancel',
                },
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                    'This alert was dismissed by tapping outside of the alert dialog.',
                ),
            },
        );

    const renderItem = ({item} : { item: Item}) => {
        return (
            <View style={styles.card}>
                <Text style={{color: '#777', fontFamily: 'Inter_400Regular'}}>{ item.barcode }</Text>
                <Text style={style.itemTitle}>{ item.name }</Text>
                <View style={[styles.row, { gap: 10, flexWrap: 'nowrap'}]}>
                    <View style={{}}>
                        {
                            item.image ? (
                                <View style={{borderRadius: 15, borderWidth: 1, borderColor: '#eee'}}>
                                    <Image style={{borderRadius: 15}} source={{uri: item.image}} height={75} width={75}/>
                                </View>
                            ) : (
                                <View style={style.itemAvatar}>
                                    <Ionicons name="image-outline" size={28} color={"#ccc"}/>
                                </View> 
                            )
                        }
                    </View>
                    <View style={[style.productDetailsColumn]}>
                        <Text category="s2" style={styles.normalText}>Supplier: <Text style={style.textValue}>{item.supplierName}</Text></Text>
                        <Text category="s2" style={styles.normalText}>Category: <Text style={style.textValue}>{item.categoryName}</Text></Text>
                        <Text category="s2" style={styles.normalText}>Stocks: <Text style={style.textValue}>{item.stocks}</Text></Text>
                        <Text category="s1" style={style.price}>{ formatAmount(Number(item.price)) }</Text>
                    </View> 
                </View> 
                <Menu renderer={ContextMenu} style={{width:20, position:'absolute', right: 10, bottom:20}}>
                    <MenuTrigger >
                        <Ionicons name="ellipsis-vertical-outline" size={18} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => router.navigate({ pathname: '/ViewItem', params: { id: item.id }})} text='View' />
                        <MenuOption onSelect={() => router.navigate({pathname: routes.editItem as any, params: { id: item.id }})}  text="Edit"/>
                        <MenuOption onSelect={() => showAlert(item.id)} >
                            <Text style={{color: 'red'}}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        )
    }

    const searchHandler = (value: string) => {
        setFilter('query', value);
    } 
  
    if (error) return <View><Text>Error</Text></View>;
    return ( 
        <View style={styles.container}>
            <View style={style.filterWrapper}>
                <Input onChangeText={searchHandler} accessoryLeft={renderSearchIcon} style={style.filterLeft} placeholder="Search Item..."/>
                <View style={style.filterRight}>
                    <TouchableOpacity onPress={filterButtonHandler}>
                        <View style={{display:'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 5}}>
                            <Ionicons name="filter-outline" size={16} />
                            <Text category="s2">Filter</Text> 
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.filterRight}>
                    <TouchableOpacity onPress={newButtonHandler}>
                        <View style={{display:'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 5}}>
                            <Ionicons name="add-outline" size={16} /> 
                            <Text category="s2">New</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {
                filters.categories.length || filters.suppliers.length ? (
                    <View style={style.filterContainer}>
                        {
                            filters?.categories?.map((category) => (
                                <TouchableOpacity
                                    key={`category-${category.id}`} 
                                    onPress={() => removeFilter(ObjectFilterEnum.CATEGORIES, category.id)}>
                                    <View 
                                        style={[style.filterLabel]}>
                                            <Text style={style.filterText}>{category?.name?.toString()}</Text>
                                            <View style={style.filterCloseIcon}>
                                                <Ionicons name="close-outline" size={10}/>
                                            </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        {
                            filters?.suppliers?.map((supplier) => (
                                <TouchableOpacity 
                                    key={`supplier-${supplier.id}`} 
                                    onPress={() => removeFilter(ObjectFilterEnum.SUPPLIERS, supplier.id)}
                                    >
                                    <View 
                                        style={style.filterLabel}>
                                            <Text style={style.filterText}>{supplier?.name?.toString().toUpperCase()}</Text>
                                            <View style={style.filterCloseIcon}>
                                                <Ionicons name="close-outline" size={10}/>
                                            </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                ) : null
                
            }
            <Text category="s1" style={{marginBottom: 10, color: "#777"}}>Total { data?.items?.count } Items</Text>
            {
                loading && <Spinner />
            }
            {
                <List
                    style={{backgroundColor: 'transparent'}}
                    data={data?.items?.data}
                    renderItem={renderItem}
                    onEndReached={() => setLimit(limit + 10)}
                />
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    actionsContainer: {
        display:'flex', 
        alignItems: 'flex-end',
        marginBottom: 15
    },
    button: {
        backgroundColor:'#006FFD',
        height:40, 
        width:125, 
        flex: 1, 
        justifyContent:'center', 
        alignContent:'center', 
        alignItems:'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14
    },
    productDetailsColumn: {
        flexWrap: 'nowrap',
        flex:1
    },
    itemTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        marginBottom: 10
    },
    itemAvatar: {
        height:75,
        width:75,
        backgroundColor:'#ddd',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterWrapper: {
        flexDirection: 'row',
        display: 'flex',
        gap: 5,
        marginBottom: 10
    },
    filterLeft: {
        width:'auto', 
        flex:1
    },
    filterRight: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5
    },
    price: {
        marginTop: 5,
        fontFamily: 'Inter_700Bold'
    },
    filterLabel: {
        backgroundColor: '#ccc', 
        width:'auto', 
        padding: 15, 
        borderRadius:5,
        position: 'relative'
    },
    filterContainer: {
        flexWrap: 'wrap', 
        display:'flex', 
        flexDirection:'row', 
        gap: 10,
        marginBottom: 10
    },
    filterText: {
        fontSize: 12
    },
    filterCloseIcon: {
        position: 'absolute', 
        right: 5, 
        top: 5, 
        bottom: 0
    },
    textValue: {
        fontFamily: 'Inter_600SemiBold', 
        fontSize: 14
    }
});

export default InventoryHomePage;