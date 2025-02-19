import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Divider } from "@ui-kitten/components";
import { useContext, useMemo, useState } from "react";
import { primaryColor } from "@/app/styles/style";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { useQuery } from "@apollo/client";
import InventoryContext from "./context/InventoryContext";
import { ObjectValue } from "./context/InventoryContext";
import BasicLoader from "@/components/Loader/BasicLoader";
import UserContext from "@/app/context/userContext";

const ItemFilter = () => {
    const userContext = useContext(UserContext);
    const variables = {
        storeId: userContext.user.storeId
    }
    const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES, { variables });
    const { data: suppliersData, loading: supplierLoading } = useQuery(GET_SUPPLIER, { variables } );
    const { selectedCategory, setSelectedCategory, selectedSupplier, setSelectedSupplier } = useContext(InventoryContext);
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
 
    const categoryFilterSelectHandler = (category: ObjectValue) => {
        if (!selectedCategory?.some(value => value?.id == category.id)) {
            setSelectedCategory((prevState) => ([...prevState, category]));
        } else { 
          setSelectedCategory(selectedCategory.filter(value => value?.id != category.id) as any);
        }
    }

    const supplierSelectHandler = (supplier: ObjectValue) => {
        if (!selectedSupplier?.some(value => value?.id == supplier.id)) {
            setSelectedSupplier((prevState) => ([...prevState, supplier]));
        } else {
          setSelectedSupplier(selectedSupplier.filter(value => value?.id != supplier.id) as any);
        }
    }

    const isCategorySelected = (category: string) => {
        return selectedCategory?.some((value: any) => value?.id == category);
    }

    const isSupplierSelected = (supplier: string) => {
        return selectedSupplier?.some((value: any) => value?.id == supplier);
    }

    if (categoriesLoading || supplierLoading) return <BasicLoader />
    return ( 
        <View style={localStyle.container}>
            <ScrollView>
                <View style={localStyle.filterWrapper}>
                    <Text style={localStyle.filterHeader}>Category</Text>
                    <Divider style={localStyle.divider}/>
                    <View style={localStyle.filterContainer}>
                        {
                            categories?.map((category: any, index: number) => (
                                <TouchableOpacity onPress={() => categoryFilterSelectHandler(category)} key={`category-${index}`}>
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
                                <TouchableOpacity onPress={() => supplierSelectHandler(supplier)} key={`supplier-${index}`}>
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