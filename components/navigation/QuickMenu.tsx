import { Fragment } from "react";
import { Layout, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import styles, { primaryColor } from "@/app/styles/style";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { routes as routeTypes } from "@/app/types/routes";
import { useRouter } from "expo-router";

const QuickMenu = () => {
    const router = useRouter();
    const menuPressHandler = (path: routeTypes) => {
        router.navigate({pathname: path as any});
    }
    return (
        <Fragment>
            <View style={{borderRadius:20, marginTop: 10}}>
                <Layout style={[styles.row, { borderRadius: 10}]}>
                    <Layout style={[styles.flex, {borderRadius:10}]}>
                        <TouchableOpacity onPress={() => menuPressHandler(routeTypes.categories)}>
                            <View style={[styles.flexCenter, localStyles.menu]}>
                                <View style={{padding: 10,marginBottom: 5, backgroundColor: '#eee', borderRadius:100}}>
                                    <Ionicons name="grid-outline" size={20} color={primaryColor}/>
                                </View>
                                <Text category="s2" style={localStyles.label}>Categories</Text>
                            </View>
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={[styles.flex]}>
                        <TouchableOpacity onPress={() => menuPressHandler(routeTypes.suppliers)}>
                            <View style={[styles.flexCenter, localStyles.menu]}>
                                <View style={{padding: 10,marginBottom: 5, backgroundColor: '#eee', borderRadius:100}}>
                                    <Ionicons name="cube-outline" size={20} color={primaryColor}/>
                                </View>
                                <Text category="s2" style={localStyles.label}>Supplier</Text>
                            </View>
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={[styles.flex]}>
                        <TouchableOpacity onPress={() => menuPressHandler(routeTypes.sales)}>
                            <View style={[styles.flexCenter, localStyles.menu]}>
                                <View style={{padding: 10,marginBottom: 5, backgroundColor: '#eee', borderRadius:100}}>
                                    <Ionicons name="pie-chart-outline" size={20} color={primaryColor}/>
                                </View>
                                <Text category="s2" style={localStyles.label}>Sales</Text>
                            </View>
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={[styles.flex, {borderRadius:10}]}>
                        <TouchableOpacity onPress={() => menuPressHandler(routeTypes.orders)}>
                            <View style={[styles.flexCenter, localStyles.menu]}>
                                <View style={{padding: 10,marginBottom: 5, backgroundColor: '#eee', borderRadius:100}}>
                                    <Ionicons name="calculator-outline" size={20} color={primaryColor}/>
                                </View>
                                <Text category="s2" style={localStyles.label}>New Order</Text>
                            </View>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </View>
        </Fragment>
    );
};

const localStyles = StyleSheet.create({
    menu: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20
    },
    label: {
        fontFamily:'Inter_400Regular'
    }
});
export default QuickMenu;