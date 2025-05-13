import { List, ListItem, Divider, Layout, Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import CustomerSelectCard from "@/components/cards/CustomerSelectCard";
import styles from "@/app/styles/style";
import Button from "@/components/buttons/Button";
import { useRouter } from "expo-router";
import OrderContext from "./context/ordersContext";
import { useContext } from "react";
import { CartLineItem } from "@/app/types/order";
import { formatAmount } from "@/app/utils/utils";
import { STORE_SALES } from "@/app/src/sales-queries";
import { useMutation } from "@apollo/client";
import UserContext from "@/app/context/userContext";
import { Ionicons } from "@expo/vector-icons";

const Summary = () => {
  const userContext = useContext(UserContext);
  const route = useRouter();
  const {order, orderTotal} = useContext(OrderContext);
  
  const renderItemIcon = (props: any) => (
    <View style={[style.layout, style.avatar]}>
      <Ionicons name="image-outline" size={30} style={{color: '#ccc'}}/>
    </View>
  );

  const [storeSales] = useMutation(STORE_SALES)
  
  const renderItemAccessory = (total: number): React.ReactElement => (
    <Layout>
        <Text style={{fontFamily: 'Inter_400Regular'}}>{formatAmount(total)}</Text>
    </Layout>
  );

  const submitHandler = async () => {
    try {
      const variables = {
        sales: {
          ...order,
          storeId: userContext.user.storeId
        }
      };
      await storeSales( { variables } );
      route.navigate('/receipt');
    } catch (error) {
      console.log(`catch error`, error);
      alert("Opps! Something went wrong, please try again later.");
    }
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
      <View style={{backgroundColor: '#fff', borderRadius: 5}}>
        <Text category="h6" style={{marginBottom: 10, paddingLeft: 10,paddingTop: 10, fontFamily: 'Inter_700Bold'}}>Order Details</Text>
        <Divider />
        <List
          data={order.cart.lineItems}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={{maxHeight: 300, borderRadius: 10}}
        />
      </View>  
      <View style={{marginTop: 10}}></View>
      <CustomerSelectCard /> 
      <Divider style={styles.mb10}/>
      <View style={style.priceSummaryContainer}>
        <Text style={style.priceSummaryHeader} category="s1">Price Summary</Text>
        <Divider style={style.dividerMTB5}/>
        <View style={[styles.flexColumns, styles.mb5]}>
          <Text style={{fontFamily: 'Inter_400Regular'}}>SubTotal</Text>
          <Text><Text style={style.textAmount}>{formatAmount(orderTotal)}</Text></Text>
        </View>
        <View style={[styles.flexColumns]}>
          <Text style={{fontFamily: 'Inter_400Regular'}}>Total</Text>
          <Text><Text style={style.textAmount}>{formatAmount(orderTotal)}</Text></Text>
        </View>
      </View> 
      <View style={styles.floatBottom}>
        <Button itemCount={order?.cart?.lineItems?.length} total={orderTotal} onPressHandler={submitHandler} title="Complete Order"/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  textAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16
  },
  dividerMTB5: {
    marginTop: 5,
    marginBottom: 5
  },
  priceSummaryHeader: {
    fontFamily: 'Inter_700Bold'
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
});

export default Summary;