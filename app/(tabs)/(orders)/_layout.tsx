import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'; 
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; 
import 'react-native-reanimated';
import OrderContext, { defaultValue } from './context/ordersContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useMemo, useState } from 'react';
import { Order, CartLineItem } from '@/app/types/order';
import { Item } from '@/app/types/item';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function OrdersLayout() {
  const colorScheme = useColorScheme();
  const [order, setOrder] = useState<Order>({} as Order);
  const quantityHandler = (action: string, item: Item) => {
    const lineItems = order?.cart?.lineItems; 
    const existingItem = lineItems?.find(row => row.itemId  == item.id);
    const isAdd = action == "add";
    if (existingItem) {
        const lineItems = order?.cart.lineItems?.map((lineItem: CartLineItem) => {
          const quantity = isAdd ? lineItem.quantity + 1 : lineItem?.quantity ? lineItem.quantity - 1 : 0;
          if (lineItem.itemId == item.id) {
              return {
                  ...lineItem,
                  quantity: quantity
              }
          } else {
              return lineItem;
          }
        });
        setOrder((prevState: any) => ({
            ...prevState,
            cart: {
                lineItems: lineItems.filter(item => item.quantity)
            }
        }));
    } else { 
        if (isAdd) {
            setOrder((prevState: any) => ({
                ...prevState,
                cart: {
                    lineItems: [
                        ...prevState?.cart?.lineItems?.length ? prevState?.cart?.lineItems : [],
                        {
                            itemId: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1
                        }
                    ]
                }
            }));
        }
    }
  }

  const orderTotal = useMemo(() => {
    return order?.cart?.lineItems?.reduce((previous:number, item:any) => {
        return (item?.price * item?.quantity) + previous;
    }, 0);
  }, [order]);

  const setCustomer = (data: any) => {
    setOrder(prevState => ({
      ...prevState,
      customerId: data?.id,
      customerName: data?.title
    }));
  }

  const resetState = () => {
    setOrder(defaultValue.order);
  }

  return (
    <OrderContext.Provider value={{order, quantityHandler, orderTotal, setCustomer, resetState}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown: true}}>
          <Stack.Screen 
            name="Orders"
            options={{
              headerTitle: 'New Order',
              headerTitleAlign: 'center'
            }}
            />
          <Stack.Screen
            name='summary'
            options={{
              headerTitle: 'Order Summary',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name='receipt'
            options={{
              headerTitle: 'Receipt',
              headerTitleAlign: 'center'
            }}
          />
        </Stack>
      </ThemeProvider>
    </OrderContext.Provider>
  );
}
