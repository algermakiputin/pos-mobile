import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import styles, { secondaryTextColor } from "@/app/styles/style";
import { IconElement, List, ListItem, Layout, Text, Divider } from '@ui-kitten/components';
import Dropdown from "@/components/dropdown/Dropdown";
import { GET_SALES_ANALYTICS } from "@/app/src/sales-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/app/utils/utils";
import { Fragment, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "@/app/context/userContext";

const Sales = () => {
    const userContext = useContext(UserContext);
    const { width } = Dimensions.get('window');
    const { data: salesData, refetch } = useQuery(GET_SALES_ANALYTICS, { variables: {
        filter: {
            storeId: userContext.user.storeId
        }
    }});
    const isFocused = useIsFocused();
    const route = useRouter();
    const renderItemAccessory = (total: number): React.ReactElement => (
        <View>
            <Text style={{fontWeight: 700, paddingRight: 5}}>{ formatAmount(total) }</Text>
        </View>
    );

    const renderItemIcon = (index: number): IconElement => (
        <Text>{index}</Text>
    );
    
    const renderItem = ({ item, index }: { item: any; index: number }): React.ReactElement => (
        <ListItem
            title={ () => <Text style={{color:'#777'}}>{ item?.transaction_number }</Text>}
            description={() => <View><Text category="s2">{item?.totalItems} Items | </Text><Text category="s2">Customer:  { item?.customer_name ? item.customer_name : 'Walk-In' }</Text></View>}
            accessoryLeft={renderItemIcon(index + 1)}
            accessoryRight={() => renderItemAccessory(item?.total)}
            onPress={() => showDetailsHandler(item?.transaction_number)}
        />
    );

    const dropdownData = [{title: 'Today'}, {title: 'Yesterday'}, {title: 'This Month'}, {title: 'Last Month'}];
    
    const showDetailsHandler = ( transaction_number: string) => {
        route.navigate({pathname: "/SalesDetails", params: { transaction_number }});
    }

    useEffect(() => {
        console.log(`focused`, isFocused);
        isFocused && refetch();
    }, [isFocused])

    return (
        <Fragment>
            <View style={style.container}>
                <View style={style.statisticWrapper}>
                    <View style={[style.statisticsContainer]}>
                        <View style={[style.statisticHeader, { width: width - 60 }]}>
                            <Layout style={[style.flexContainer, {marginBottom: 10}]}>
                                <Layout style={[styles.flex, {justifyContent: 'center'}]}>
                                    <Text style={{fontFamily:'Inter_800ExtraBold'}}>Statistics</Text>
                                </Layout>
                                <Layout style={[styles.flex, {alignItems: 'flex-end', justifyContent: 'center'}]} level="1">
                                    <View>
                                        <Dropdown placeholder="Today" data={dropdownData} width={120} />
                                    </View>
                                </Layout>
                            </Layout>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Layout style={[styles.row, { gap: 15, paddingRight:100}]}>
                                <Layout style={[style.flexItem, {backgroundColor: ''}]}>
                                    <Text style={style.columnLabel}>Total Earnings</Text>
                                    <Text style={[style.amountLabel, style.labelBorderRight]}>{ (formatAmount(salesData?.getSales?.totalEarnings)) }</Text>  
                                </Layout>
                                <Layout style={style.flexItem}>
                                    <Text style={style.columnLabel}>Item Sold</Text>
                                    <Text style={[style.amountLabel, style.labelBorderRight]}>{ salesData?.getSales?.itemSold ?? 0 }</Text>
                                </Layout>
                                <Layout style={style.flexItem}>
                                    <Text style={style.columnLabel}>Net Sales</Text>
                                    <Text style={style.amountLabel}>{ formatAmount(salesData?.getSales?.netSales) }</Text>
                                </Layout>
                            </Layout>
                        </ScrollView>
                    </View> 
                </View>
                <View style={style.transactionsContainer}>
                    <Layout style={{borderRadius: 10}}>
                        <Text style={[styles.sectionHeader, {paddingLeft: 15,paddingTop:15}]}>Recent Transaction</Text>
                        <Divider/>
                        <List
                            data={salesData?.getSales?.transactions}
                            renderItem={renderItem}
                            ItemSeparatorComponent={Divider}
                            style={{height: '100%'}}
                            ListEmptyComponent={<Text style={{padding: 15, textAlign: 'center'}}>No sales record found.</Text>}
                        />
                    </Layout>
                    
                </View>
            </View>
        </Fragment>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    },
    amountLabel: {
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold'
    },
    flexItem: {
        flex: 1,
        flexBasis: 'auto'
    },
    columnLabel: {
        fontSize: 14,
        fontFamily: 'Inter_300Light',
        color: secondaryTextColor,
        marginBottom: 5,
    },
    labelBorderRight: {
        borderEndWidth: 1, 
        paddingRight: 15,
        borderColor: '#eee',
        minWidth: 75
    },
    statisticsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        width:'130%',
        borderRadius: 10
    },
    statisticHeader: { 
        display: 'flex', 
        justifyContent: 'center',
        marginBottom: 5
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardWrapper: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        maxHeight: 200, 
        backgroundColor: '#fff', 
        borderRadius: 20
    },
    listContainer: {
        maxHeight: 192,
        flex:1,
        height: 300,
        backgroundColor: 'red'
    },
    statisticWrapper: {
        paddingLeft: 20, 
        paddingRight: 20, 
        marginBottom: 15, 
        marginTop: 15, 
        borderRadius: 10
    },
    transactionsContainer: {
        paddingLeft: 20, 
        paddingRight: 20, 
        flex: 1, 
        height: '100%', 
        marginBottom: 65
    }
});

export default Sales;