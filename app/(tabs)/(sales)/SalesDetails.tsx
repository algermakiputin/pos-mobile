import { Card, Divider, List, ListItem, Text, Button } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { StyleSheet, View } from "react-native";
import { GET_SALES_DETAILS } from "@/app/src/sales-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/app/utils/utils";

interface IListItem {
    name: string;
    price: number;
    quantity: number;
    capital: number
  }
  
const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
});

const SalesDetails = () => {
    const params = useLocalSearchParams();
    const { data: salesData } = useQuery(GET_SALES_DETAILS, {
        variables: {
            transaction_number: params?.transaction_number
        }
    });

    const total = salesData?.getSalesDetails?.reduce((previous: any, current: any) => (previous + (current?.price * current?.quantity)), 0);
    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={`${item.name} ${index + 1}`}
            description={`${item.quantity}x ${formatAmount(item.price)}`}
            accessoryLeft={<View><Text>{index}</Text></View>}
            accessoryRight={() => <View><Text>{ formatAmount(item.quantity * item.price) }</Text></View>}
        />
    );
    return <View style={{flex: 1, backgroundColor: '', height: '100%'}}>
        <View style={[localStyle.wrapper]}>
            <Card>
                <Text>Transaction#: { String(params?.transaction_number) }</Text>
                <Text>Date: { salesData?.getSalesDetails?.[0]?.created_at }</Text>
                <Text>Total: { formatAmount(total) }</Text>
            </Card>
        </View>
        <View style={localStyle.wrapper}>
            <Text style={{padding: 10, backgroundColor: '#fff'}}>Order Details</Text>
            <Divider />
            <List
                style={localStyle.container}
                data={salesData?.getSalesDetails}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </View>
    </View>;
}

const localStyle = StyleSheet.create({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    container: {
        maxHeight: 450
    },
});

export default SalesDetails;