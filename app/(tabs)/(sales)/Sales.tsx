import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import styles, { bodyColor, lighterDark, secondaryTextColor } from "@/app/styles/style";
import { Button, IconElement, List, ListItem, Layout, Text, Divider } from '@ui-kitten/components';
import { Fragment } from "react";
import Dropdown from "@/components/dropdown/Dropdown";

const Sales = () => {
    const { width } = Dimensions.get('window');

    const renderItemAccessory = (): React.ReactElement => (
        <View>
            <Text>180</Text>
        </View>
      );
    const renderItemIcon = (index: number): IconElement => (
        <Text>{index}</Text>
      );
    
    const renderItem = ({ item, index }: { item: any; index: number }): React.ReactElement => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description}`}
            accessoryLeft={renderItemIcon(index + 1)}
            accessoryRight={renderItemAccessory}
        />
    );

    const data = new Array(25).fill({
        title: "1x Dandelion Juice",
        description: '1x PHP18',
        total: 180
    });

    const dropdownData = [{title: 'Today'}, {title: 'Yesterday'}, {title: 'This Month'}, {title: 'Last Month'}];

    return (
        <Fragment>
            <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 15, marginTop: 15, borderRadius: 10}}>
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
                    <ScrollView horizontal={true}>
                        <Layout style={[styles.row, { gap: 15}]}>
                            <Layout style={[style.flexItem, {backgroundColor: ''}]}>
                                <Text style={style.columnLabel}>Total Earnings</Text>
                                <Text style={[style.amountLabel, style.labelBorderRight]}>1,000,000</Text>
                                
                            </Layout>
                            <Layout style={style.flexItem}>
                                <Text style={style.columnLabel}>Item Sold</Text>
                                <Text style={[style.amountLabel, style.labelBorderRight]}>590</Text>
                            </Layout>
                            <Layout style={style.flexItem}>
                                <Text style={style.columnLabel}>Net Sales</Text>
                                <Text style={style.amountLabel}>10,000,000.00</Text>
                            </Layout>
                        </Layout>
                    </ScrollView>
                </View> 
            </View>
            <View style={[{paddingLeft: 20, paddingRight: 20}]}>
                <Layout style={{borderRadius: 10}}>
                    <Text style={[styles.sectionHeader, {paddingLeft: 15,paddingTop:15}]}>Recent Transaction</Text>
                    <Divider/>
                    <List
                        style={{}}
                        data={data}
                        renderItem={renderItem}
                        ItemSeparatorComponent={Divider}
                    />
                </Layout>
            </View>
        </Fragment>
    );
}

const style = StyleSheet.create({
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
    }
});

export default Sales;