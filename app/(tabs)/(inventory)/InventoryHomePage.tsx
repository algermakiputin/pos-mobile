import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles, { bodyColor } from "@/app/styles/style";
import { Input, List, Text} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import { routes } from "@/app/types/routes";
import { GET_ITEMS } from "@/app/src/item-queries";
import { useQuery } from "@apollo/client";
import { Item } from "@/app/types/item";
import { useContext, useState } from "react";
import InventoryContext from "./context/InventoryContext";

const InventoryHomePage = () => {
    const router = useRouter(); 
    const { ContextMenu } = renderers;
    const { filters, setFilter } = useContext(InventoryContext);
    const { loading, error, data } = useQuery(GET_ITEMS, {
        variables: {
            filter: {
                query: filters.query,
                categories: filters.categories?.map(category => category?.id),
                suppliers: filters.suppliers?.map(supplier => supplier.id)
            }
        }
    }); 
    const renderSearchIcon = () => {
        return <Ionicons name="search-outline" />
    } 
  
    const filterButtonHandler = () => {
        router.navigate({pathname: routes.itemFilter as any});
    }

    const newButtonHandler = () => {
        router.navigate({pathname: routes.newItem} as any);
    }

    const renderItem = ({item} : { item: Item}) => {
        return (
            <View style={styles.card}>
                <Text style={{color: '#777'}}>0019201092</Text>
                <Text style={style.itemTitle}>{ item.name }</Text>
                <View style={[styles.row, { gap: 10, flexWrap: 'nowrap'}]}>
                    <View style={{}}>
                        <View style={style.itemAvatar}></View> 
                    </View>
                    <View style={[style.productDetailsColumn]}>
                        <Text category="s2">Stocks: <Text category="s1">{item.stocks}</Text></Text>
                        <Text category="s2">Supplier: <Text category="s1">{item.supplierName}</Text></Text>
                        <Text category="s2">Category: <Text category="s1">{item.categoryName}</Text></Text>
                        <Text category="s1" style={style.price}>{ item.price }</Text>
                    </View> 
                </View> 
                <Menu renderer={ContextMenu} style={{width:20, position:'absolute', right: 10, bottom:20}}>
                    <MenuTrigger >
                        <Ionicons name="ellipsis-vertical-outline" size={18} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => alert(`Save`)} text='View' />
                        <MenuOption onSelect={() => router.navigate({pathname: routes.editItem as any})}  text="Edit"/>
                        <MenuOption onSelect={() => alert(`Delete`)} >
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
  
    if (error) return <View><Text>Error</Text></View>

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
            <View style={{flexWrap: 'wrap', display:'flex', flexDirection:'row', gap: 10, marginBlock: 10}}>
                {
                    filters?.categories?.map((category) => (
                        <View key={`category-${category.id}`} style={style.filterLabel}><Text>{category?.name?.toString()}</Text></View>
                    ))
                    
                }
                {
                    filters?.suppliers?.map((supplier) => (
                        <View key={`supplier-${supplier.id}`} style={style.filterLabel}><Text>{supplier?.name?.toString()}</Text></View>
                    ))
                }
            </View>
            <List
                style={{backgroundColor: 'transparent'}}
                data={data?.items}
                renderItem={renderItem}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
    // minHeight: 144,
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
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemAvatar: {
        height:75,
        width:75,
        backgroundColor:'#ddd',
        borderRadius: 5
    },
    filterWrapper: {
        flexDirection: 'row',
        display: 'flex',
        gap: 5
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
        fontWeight: 'bold'
    },
    filterLabel: {
        backgroundColor: '#ccc', 
        width:'auto', 
        padding: 10, 
        borderRadius:5
    }
});

export default InventoryHomePage;