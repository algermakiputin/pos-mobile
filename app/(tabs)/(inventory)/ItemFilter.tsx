import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Divider } from "@ui-kitten/components";
import { useContext, useMemo, useState } from "react";
import { primaryColor } from "@/app/styles/style";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { useQuery } from "@apollo/client";
import InventoryContext from "./context/InventoryContext";
const ItemFilter = () => {
    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const { data: suppliersData } = useQuery(GET_SUPPLIER);
    const { filters, setFilter, selectedCategory, setSelectedCategory, selectedSupplier, setSelectedSupplier } = useContext(InventoryContext);
    const categories = useMemo(function() {
        return categoriesData?.categories.map((category: any) => ({
            id: category.id,
            name: category.name
        }))
    }, [categoriesData]);

    const suppliers = useMemo(function() {
        return suppliersData?.suppliers.map((supplier: any) => ({
            id: supplier.id,
            name: supplier.name
        }))
    }, [categoriesData]);
 
    // const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    // const [selectedSupplier, setSelectedSupplier] = useState<string[]>([]);

    const categoryFilterSelectHandler = (category: string) => {
        if (!selectedCategory.includes(category)) {
            setSelectedCategory((prevState) => ([...prevState as string[], category]));
        } else {
            setSelectedCategory(selectedCategory.filter(id => id != category));
        }
    }

    const supplierSelectHandler = (supplier: string) => {
        if (!selectedSupplier.includes(supplier)) {
            setSelectedSupplier((prevState) => ([...prevState as string[], supplier]));
        } else {
            setSelectedSupplier(selectedSupplier.filter(id => id != supplier));
        }
    }

    const isCategorySelected = (category: string) => {
        return selectedCategory?.some((value) => value == category);
    }

    const isSupplierSelected = (supplier: string) => {
        return selectedSupplier?.some((value) => value == supplier);
    }

    return ( 
        <View style={localStyle.container}>
            <ScrollView>
                <View style={localStyle.filterWrapper}>
                    <Text style={localStyle.filterHeader}>Category</Text>
                    <Divider style={localStyle.divider}/>
                    <View style={localStyle.filterContainer}>
                        {
                            categories?.map((category: any, index: number) => (
                                <TouchableOpacity onPress={() => categoryFilterSelectHandler(category?.id)} key={`category-${index}`}>
                                    <View style={[localStyle.labelContainer,  isCategorySelected(category?.id) ? {backgroundColor: primaryColor} : {}]}>
                                        <Text style={isCategorySelected(category?.id) ? {color: '#fff'} : {}}>{category?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <Divider style={localStyle.divider}/>
                <View style={localStyle.filterWrapper}>
                    <Text style={localStyle.filterHeader}>Supplier</Text>
                    <Divider style={localStyle.divider}/>
                    <View style={localStyle.filterContainer}>
                        {
                            suppliers?.map((supplier: any, index: number) => (
                                <TouchableOpacity onPress={() => supplierSelectHandler(supplier?.id)} key={`supplier-${index}`}>
                                    <View style={[localStyle.labelContainer, isSupplierSelected(supplier?.id) ? localStyle.selectedFilter : {}]}>
                                        <Text style={isSupplierSelected(supplier?.id) ? localStyle.selectedFilterText : {}}>{supplier?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <Divider style={localStyle.divider} />
            </ScrollView>
        </View> 
    );
}

const localStyle = StyleSheet.create({
    divider: {
        marginBottom: 15
    },
    filterContainer: {
        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    labelContainer: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: '#f4f4f5',
        marginBottom: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        display:'flex',
        padding: 20,
        flexDirection: 'column'
    },
    filterHeader: {
        fontWeight: 700,
        marginBottom: 15
    },
    filterWrapper: {
        marginBottom: 20
    },
    filterColumn: {
        flex: 1
    },
    selectedFilter: {
        backgroundColor: primaryColor
    },
    selectedFilterText: {
        color: '#fff'
    }
});

export default ItemFilter;