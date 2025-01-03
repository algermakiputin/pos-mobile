import { Text } from "@ui-kitten/components";
import { View, ScrollView, StyleSheet } from "react-native";
import InventorySummary from "@/components/cards/InventorySummary";
import QuickMenu from "@/components/navigation/QuickMenu";
import styles, { lighterDark, primaryColor, primarySpotColor } from "../styles/style";
import { BarChart } from "react-native-gifted-charts";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GET_SALES_OVERVIEW } from "../src/sales-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "../utils/utils";

const data=[ 
  {value:40000, label: 'Jan'},
  {value:100000, label: 'Feb'},
  {value:100000, label: 'Mar'},
  {value:50000, label: 'Apr'},
  {value:70000, label: 'May'},
  {value:30000, label: 'Jun'},
  {value:30000, label: 'Jul'},
  {value:30000, label: 'Aug'},
  {value:35000, label: 'Sep'},
  {value:102000, label: 'Oct'},
  {value:158000, label: 'Nov'},
  {value:33000, label: 'Dec'},
];

export default function HomeScreen() {
  const [containerWidth, setContainerWidth] = useState(0);
  const { data: salesOverViewData } = useQuery(GET_SALES_OVERVIEW);
  const chartData = salesOverViewData?.getSalesOverview?.data.map((value: number, index:  number) => ({
    value: value,
    label: salesOverViewData?.getSalesOverview?.keys[index]
  }));

  return ( 
    <ScrollView>
      <View style={styles.container}>
        <View style={localStyles.topWrapper}>
          <Text style={[localStyles.welcomeMessage]} category="h6">Welcome, John Doe!</Text>
          <Ionicons style={{marginLeft: -25}} size={26} name="person-circle-outline" />
        </View>
        <InventorySummary />
        <QuickMenu />
        <View style={{backgroundColor:'#fff', marginTop:10, paddingBottom: 20,paddingTop:20, borderRadius:10}} onLayout={({nativeEvent}) => setContainerWidth(nativeEvent.layout.width)}>
          <Text style={{paddingLeft:10, fontFamily: 'Inter_700Bold', marginBottom: 10}}>Sales Overview</Text> 
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
