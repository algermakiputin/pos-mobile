import { Text } from "@ui-kitten/components";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import InventorySummary from "@/components/cards/InventorySummary";
import QuickMenu from "@/components/navigation/QuickMenu";
import styles, { lighterDark, primaryColor, primarySpotColor } from "../styles/style";
import { BarChart } from "react-native-gifted-charts";
import { useContext, useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GET_SALES_OVERVIEW } from "../src/sales-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "../utils/utils";
import { useRouter } from "expo-router";
import UserContext from "../context/userContext";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen() {
  const { user } = useContext(UserContext);
  const [containerWidth, setContainerWidth] = useState(0);
  const route = useRouter();
  const isFocused = useIsFocused();
  const { data: salesOverViewData, refetch } = useQuery(GET_SALES_OVERVIEW, { variables: { storeId: user.storeId }});
  const chartData = useMemo(() => {
    return salesOverViewData?.getSalesOverview?.data.map((value: number, index:  number) => ({
      value: value,
      label: salesOverViewData?.getSalesOverview?.keys[index]
    }));
  },[salesOverViewData]);
  
  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);
  return ( 
    <ScrollView>
      <View style={styles.container}>
        <View style={localStyles.topWrapper}>
          <Text style={[localStyles.welcomeMessage]} category="h6">Welcome, <Text category="h6" style={{color: primaryColor}}>{ user.firstName }!</Text></Text>
          <TouchableOpacity onPress={() => route.navigate('/Profile')}>
            <Ionicons style={{marginLeft: -25}} size={26} name="person-circle-outline" />
          </TouchableOpacity>
        </View>
        <InventorySummary />
        <QuickMenu />
        <View style={{backgroundColor:'#fff', marginTop:10, paddingBottom: 20,paddingTop:20, borderRadius:10}} onLayout={({nativeEvent}) => setContainerWidth(nativeEvent.layout.width)}>
          <Text style={{paddingLeft:10, fontFamily: 'Inter_700Bold', marginBottom: 10}}>Sales Overview</Text> 
          {
            chartData && (
              <BarChart 
                nestedScrollEnabled
                scrollAnimation ={true}
                width={containerWidth - 30} 
                hideYAxisText
                data ={chartData}
                showFractionalValues
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={lighterDark}
                overflowTop={10}
                isAnimated
                noOfSections={5}
              // rulesThickness={1}
                verticalLinesColor={'white'}
                adjustToWidth={true}
                showGradient
                frontColor={primaryColor}
                gradientColor={primarySpotColor}
                backgroundColor={'#fff'}
                barWidth={20}
                barBorderRadius={10}
                height={200}
                pointerConfig={{
                  initialPointerIndex: 0,
                  stripBehindBars: false,
                  pointerStripHeight: 150,
                  activatePointersOnLongPress: true,
                  pointerLabelComponent: (items: any) => {
                    return (
                      <View
                        style={{
                          minWidth:145,
                          width:'auto',
                          padding: 6,
                          borderWidth: 1,
                          borderRadius: 8,
                          backgroundColor: '#eee',
                        }}>
                        <Text>{formatAmount(items[0].value)}</Text>
                      </View>
                    );
                  },
                }}
                /> 
            )
          }
          
        </View>
      </View>
    </ScrollView>
  )
} 

const localStyles = StyleSheet.create({
  welcomeMessage: {
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 20
  },
  topWrapper: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  }
});
