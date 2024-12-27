import { bodyColor, lighterDark, primaryColor } from "@/app/styles/style";
import { Layout, Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

const InventorySummary = () => {
    return (
        <Layout style={localStyles.cardContainer}>
            <Text style={localStyles.cardHeaderText}>Inventory Summary</Text>
            <Layout style={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}> 
                <Layout style={localStyles.layout}>
                    <Text style={localStyles.textDescription}>Total Items</Text>
                    <Text style={localStyles.textLabel}>2100</Text>
                </Layout>
                <Layout style={localStyles.layout}>
                    <Text style={localStyles.textDescription}>Total Category</Text>
                    <Text style={localStyles.textLabel}>20</Text>
                </Layout>
            </Layout>
            <Layout>
                <Layout style={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}> 
                    <Layout style={localStyles.layout}>
                        <Text style={localStyles.textDescription}>Total Capital</Text>
                        <Text style={localStyles.textLabel}>400</Text>
                    </Layout>
                    <Layout style={localStyles.layout}>
                        <Text style={localStyles.textDescription}>Total Value</Text>
                        <Text style={localStyles.textLabel}>42001</Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
        
    )
}

const localStyles = StyleSheet.create({
    cardHeaderText: {
        marginBottom: 15,
        fontFamily: 'Inter_700Bold',
        fontSize: 18
    },
    cardContainer: {
        borderRadius: 10,
        padding: 20,
        borderLeftColor: primaryColor,
        borderLeftWidth: 5
    },
    layout: {
        flex: 1,
        width: '50%',
        marginBottom: 10
       // backgroundColor: '#333',
    },
    textLabel: {
        fontSize: 20,
        fontFamily:'Inter_700Bold'
    },
    textDescription: {
       fontFamily: 'Inter_400Regular',
       fontSize: 14,
       color: "#777"
    }
});
export default InventorySummary;