import { primaryColor } from "@/app/styles/style";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
import { GET_SUMMARY } from "@/app/src/item-queries";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/app/utils/utils";
import { useContext, useEffect } from "react";
import UserContext from "@/app/context/userContext";
import { useIsFocused } from "@react-navigation/native";

const InventorySummary = () => {
    const isFocused = useIsFocused();
    const userContext = useContext(UserContext);
    const { data: summary, refetch } = useQuery(GET_SUMMARY, { variables: { storeId: userContext.user.storeId } });

    useEffect(() => {
        isFocused && refetch();
    }, [isFocused]);
    return (
        <Layout style={localStyles.cardContainer}>
            <Text style={localStyles.cardHeaderText}>Inventory Summary</Text>
            <Layout style={localStyles.rowLayout}> 
                <Layout style={localStyles.layout}>
                    <Text style={localStyles.textDescription}>Total Items</Text>
                    <Text style={localStyles.textLabel}>{ summary?.inventorySummary?.totalItems }</Text>
                </Layout>
                <Layout style={localStyles.layout}>
                    <Text style={localStyles.textDescription}>Total Capital</Text>
                    <Text style={localStyles.textLabel}>{ formatAmount(summary?.inventorySummary?.capital) }</Text>
                </Layout>
            </Layout>
            <Layout>
                <Layout style={localStyles.rowLayout}> 
                    <Layout style={[localStyles.layout]}>
                        <Text style={localStyles.textDescription}>Total Category</Text>
                        <Text style={localStyles.textLabel}>{ summary?.inventorySummary?.categories }</Text>
                    </Layout>
                    <Layout style={[localStyles.layout]}>
                        <Text style={localStyles.textDescription}>Total Value</Text>
                        <Text style={localStyles.textLabel}>{ formatAmount(summary?.inventorySummary?.value) }</Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    )
}

const localStyles = StyleSheet.create({
    rowLayout: {
        flexDirection: 'row', 
        flex: 1,
        justifyContent: 'flex-start',
    },
    cardHeaderText: {
        marginBottom: 15,
        fontFamily: 'Inter_700Bold',
        fontSize: 18
    },
    cardContainer: {
        borderRadius: 10,
        padding: 20,
        borderLeftColor: primaryColor,
        borderLeftWidth: 5,
        overflow: 'scroll',
        zIndex: 100,
        flex: 1
    },
    layout: {
        flex: 1
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