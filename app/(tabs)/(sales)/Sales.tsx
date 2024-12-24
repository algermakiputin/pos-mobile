import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import styles, { secondaryTextColor } from "@/app/styles/style";
import { IconElement, List, ListItem, Layout, Text, Divider } from '@ui-kitten/components';
import Dropdown from "@/components/dropdown/Dropdown";
import { GET_SALES_ANALYTICS } from "@/app/src/sales-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/app/utils/utils";

const Sales = () => {
    const { width } = Dimensions.get('window');
    const { data: salesData } = useQuery(GET_SALES_ANALYTICS);

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
            description={() => <View><Text category="s2">{item?.totalItems} Items | 04-21-2024</Text><Text category="s2">Customer:  { item?.customer_name ? item.customer_name : 'Walk-In' }</Text></View>}
            accessoryLeft={renderItemIcon(index + 1)}
            accessoryRight={() => renderItemAccessory(item?.total)}
        />
    );

    const data = new Array(25).fill({
        title: "1x Dandelion Juice",
        description: '1x PHP18',
        total: 180
    });

    const dropdownData = [{title: 'Today'}, {title: 'Yesterday'}, {title: 'This Month'}, {title: 'Last Month'}];
  
    return (
        <View style={style.container}>
            <View style={style.statisticWrapper}>
                <View style={[style.statisticsContainer]}>
                    <View style={[style.statisticHeader, { width: width - 60 }]}>
                        <Layout style={[style.flexContainer, {marginBottom: 10}]}>
                            <Layout style={[styles.flex, {justifyContent: 'center'}]}>
                                <Text style={{fontWeight: 700}}>Statistics</Text>
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
                                <Text style={[style.amountLabel, style.labelBorderRight]}>{ formatAmount(salesData?.getSales?.itemSold) }</Text>
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
                    />
                </Layout>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    },
    amountLabel: {
        fontSize: 20,
        fontWeight: 700
    },
    flexItem: {
        flex: 1,
    
        flexBasis: 'auto'
    },
    columnLabel: {
        fontSize: 14,
        fontWeight: 'light',
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