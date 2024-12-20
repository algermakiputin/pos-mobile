import { List, ListItem, Divider, Layout, Text } from "@ui-kitten/components";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomerSelectCard from "@/components/cards/CustomerSelectCard";
import styles from "@/app/styles/style";
import Button from "@/components/buttons/Button";
import { useRouter } from "expo-router";
import OrderContext from "./context/ordersContext";
import { useContext } from "react";
import { CartLineItem } from "@/app/types/order";
import { formatAmount } from "@/app/utils/utils";
import { defaultValue } from "./context/ordersContext";
interface IListItem {
  title: string;
  description: string;
}
  
const data = new Array(3).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const Summary = () => {
  const route = useRouter();
  const {order, orderTotal, resetState} = useContext(OrderContext);
  const renderItemIcon = (props: any) => (
    <View style={{height:55,width:55,backgroundColor:'#777', borderRadius:5}}>
    </View>
  );

  const renderItemAccessory = (total: number): React.ReactElement => (
      <Layout style={style.quantity}>
          <Text>{formatAmount(total)}</Text>
      </Layout>
    );
    
  const submitHandler = () => {
    route.navigate('/(orders)/receipt');
  }

  const renderItem = ({ item, index }: { item: CartLineItem; index: number }): React.ReactElement => (
      <ListItem
        title={`${item.name} ${index + 1}`}
        description={`${item.quantity}x ${item.price}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory((Number(item?.price) * item.quantity))}
      />
    );

  return (
    <View style={styles.container}>
      <CustomerSelectCard /> 
      <Divider style={styles.mb10}/>
      <View style={style.priceSummaryContainer}>
        <Text style={style.priceSummaryHeader} category="s1">Price Summary</Text>
        <Divider style={style.dividerMTB5}/>
        <View style={[styles.flexColumns, styles.mb5]}>
          <Text>SubTotal</Text>
          <Text><Text style={style.textAmount}>{formatAmount(orderTotal)}</Text></Text>
        </View>
        <View style={[styles.flexColumns]}>
          <Text>Total</Text>
          <Text><Text style={style.textAmount}>{formatAmount(orderTotal)}</Text></Text>
        </View>
      </View> 
      <Divider style={style.divider}/>
      <View style={{backgroundColor: '#fff', borderRadius: 5}}>
        <Text category="s1" style={{marginBottom: 10, paddingLeft: 10,paddingTop: 10}}>Order Details</Text>
        <Divider />
        <List
          data={order.cart.lineItems}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </View>  
      
      <View style={styles.floatBottom}>
        <Button itemCount={order?.cart?.lineItems?.length} total={orderTotal} onPressHandler={submitHandler} title="Complete Order"/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  textAmount: {
    fontWeight: 700, 
    fontSize: 16
  },
  dividerMTB5: {
    marginTop: 5,
    marginBottom: 5
  },
  priceSummaryHeader: {
    fontWeight: 700
  },
  priceSummaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  quantity: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'flex-end'
  },
  divider: {
    marginBottom:10, 
    marginTop:0
  }
});

export default Summary;