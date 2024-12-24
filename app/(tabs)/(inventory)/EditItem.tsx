import { View, TextInput, ScrollView, Button, Text } from "react-native";
import styles from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { GET_ITEM } from "@/app/src/item-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from "react";

const EditItem = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const params = useLocalSearchParams();
    const { data: itemData } = useQuery(GET_ITEM, {
        variables: {
            id: params.id
        }
    });

    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const { data: supplierData } = useQuery(GET_SUPPLIER);
 
    const categoriesSelectData = useMemo(() => {
        return categoriesData?.categories?.map((value: any) => ({
            value: value?.name,
            key: value?.id
        }))
    }, [categoriesData]);
    
    const suppliersSelectData = useMemo(() => {
        return supplierData?.supplier?.map((value: any) => ({
            value: value?.name,
            key: value?.id
        }))
    }, [supplierData]);
     
    
    const submitHandler = (data: any) => {
        console.log(`data`, data);
    }
    
    return (
        <ScrollView>
            <View style={[styles.container]}>
                <View style={styles.card}>
                    <Controller 
                        name="itemName"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => ( 
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Item Name" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={value}
                                    defaultValue={itemData?.item?.name}
                                    onChangeText={value => onChange(value)}
                                />
                                { (errors as any)?.itemName?.message && <Text style={styles.textDanger}>{(errors as any)?.itemName?.message}</Text>}
                            </View> 
                        )}
                        rules={{required: 'Item Name is required'}}
                    />
                    <Controller 
                        name="description"
                        control={control}
                        render={({field: {onChange, value, onBlur}} ) => (
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Description" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={value}
                                    defaultValue={itemData?.item?.description}
                                    onChangeText={value => onChange(value)}
                                />
                                { (errors as any)?.description?.message && <Text style={styles.textDanger}>{(errors as any)?.description?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Description is required'}}
                    />
                    <Controller 
                        name="category"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <SelectList 
                                    setSelected={(val: string) => (onChange(val))}
                                    data={categoriesSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Category"
                                    defaultOption={{key: '', value: ''}}
                                />
                                { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Category is required'}}
                    />
                    <Controller 
                        name="supplier"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <SelectList 
                                    setSelected={(val: string) => (onChange(val))}
                                    data={suppliersSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Supplier"
                                />
                                { (errors as any)?.supplier?.message && <Text style={styles.textDanger}>{(errors as any)?.supplier?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Supplier is required'}}
                    />
                    <Controller 
                        name="retailPrice"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Retail Price" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={value}
                                    defaultValue={String(itemData?.item?.price)}
                                    onChangeText={value => onChange(value)}
                                />
                                { (errors as any)?.retailPrice?.message && <Text style={styles.textDanger}>{(errors as any)?.retailPrice?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Retail Price is required'}}
                    />
                    <Button title="Save Product" onPress={handleSubmit(submitHandler)} />
                </View>
            </View>
        </ScrollView>
    );
}

export default EditItem;