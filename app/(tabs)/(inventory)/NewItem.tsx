import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles, { blackLightShade, primaryColor } from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { Layout, Button } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { STORE_ITEM } from "@/app/src/item-queries";

const NewItem = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const [image, setImage] = useState('');
    const { loading: categoryLoading, error: categoryError, data: categoriesData } = useQuery(GET_CATEGORIES);
    const { loading: supplierLoading, error: supplierError, data: supplierData } = useQuery(GET_SUPPLIER);
    const [formValues, setFormValues] = useState();
    const supplierSelectData = useMemo(() => {
        return supplierData?.suppliers?.map((supplier: any) => ({
            key: supplier.id,
            value: supplier.name
        }))
    }, [supplierData]);

    const categoriesSelectData = useMemo(() => {
        return categoriesData?.categories?.map((category: any) => ({
            key: category.id,
            value: category.name
        }))
    }, [supplierData]);

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (!result.canceled) {
            setImage(result?.assets?.[0]?.uri);
        }
        if (result?.assets?.[0]?.uri) setImage(result?.assets?.[0]?.uri);
    };

    const [storeItem, {error, loading}] = useMutation(STORE_ITEM, {
        variables: {
            item: formValues
        }
    })

    const submitHandler = async (data: any) => {
        const store = await storeItem();
        console.log(`store`, store);
    }

    console.log(`error`, error);

    const inputChangeHandler = (key: string, value: string) => {
        setFormValues((prevState: any) => ({
            ...prevState,
            [key]: value
        }))
    }

    return (
        <ScrollView>
            <View style={{}}>
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <View style={localStyle.itemImageContainer}>
                        { 
                            !image ? (
                                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                                    <Ionicons name="cloud-upload-outline" size={28} color={blackLightShade}/>
                                    <Text style={{color: blackLightShade}}>Upload Image</Text>
                                </View>
                            ) : (
                                <Image width={250} height={250} source={{uri: image}} />
                            )
                        }
                    </View>
                </TouchableOpacity>
                <View style={[styles.card]}>
                    <Layout>
                        <Controller 
                            name="barcode"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => ( 
                                <View style={styles.formGroup}>
                                    <TextInput 
                                        placeholder="Barcode" 
                                        style={styles.input}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={value => {
                                            onChange(value);
                                            inputChangeHandler('barcode', value)
                                        }}
                                    />
                                    { (errors as any)?.itemName?.message && <Text style={styles.textDanger}>{(errors as any)?.itemName?.message}</Text>}
                                </View> 
                            )}
                            rules={{required: 'Barcode is required'}}
                        />
                    </Layout>
                    <Layout>
                        <Controller 
                            name="name"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => ( 
                                <View style={styles.formGroup}>
                                    <TextInput 
                                        placeholder="Item Name" 
                                        style={styles.input}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={value => {
                                            onChange(value);
                                            inputChangeHandler('name', value)
                                        }}
                                    />
                                    { (errors as any)?.itemName?.message && <Text style={styles.textDanger}>{(errors as any)?.itemName?.message}</Text>}
                                </View> 
                            )}
                            rules={{required: 'Item Name is required'}}
                        />
                    </Layout>
                    <Layout>
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
                                        onChangeText={value => { 
                                            inputChangeHandler('description', value);
                                            onChange(value);
                                        }}
                                    />
                                    { (errors as any)?.description?.message && <Text style={styles.textDanger}>{(errors as any)?.description?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Description is required'}}
                        />
                    </Layout>
                    <Controller 
                        name="category_id"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        var id = categoriesSelectData?.find((category:Select) => category.value == val)?.key;
                                        inputChangeHandler('categoryId', id)
                                        onChange(id);
                                    }}
                                    data={categoriesSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Category"
                                />
                                { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Category is required'}}
                    />
                    <Controller 
                        name="supplier_id"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        var id = supplierSelectData?.find((supplier:Select) => supplier.value == val)?.key;
                                        inputChangeHandler('supplierId', id)
                                        onChange(id);
                                    }}
                                    data={supplierSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Supplier"
                                />
                                { (errors as any)?.supplier?.message && <Text style={styles.textDanger}>{(errors as any)?.supplier?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Supplier is required'}}
                    />
                    <Layout style={{flex:1, flexDirection: 'row', gap: 10}}>
                        <Controller 
                            name="capital"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => (
                                <View style={styles.formGroup}>
                                    <TextInput 
                                        placeholder="Capital" 
                                        style={styles.input}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={value => {
                                            inputChangeHandler('capital', value)
                                            onChange(value)
                                        }}
                                    />
                                    { (errors as any)?.capital?.message && <Text style={styles.textDanger}>{(errors as any)?.capital?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Capital is required'}}
                        />
                        <Controller 
                            name="price"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => (
                                <View style={styles.formGroup}>
                                    <TextInput 
                                        placeholder="Retail Price" 
                                        style={styles.input}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={value => {
                                            inputChangeHandler('price', value);
                                            onChange(value);
                                        }}
                                    />
                                    { (errors as any)?.price?.message && <Text style={styles.textDanger}>{(errors as any)?.price?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Price is required'}}
                        />
                    </Layout>
                    <Layout>
                        <Controller 
                            name="stocks"
                            control={control}
                            render={({field: {onChange, value, onBlur}} ) => (
                                <View style={styles.formGroup}>
                                    <TextInput 
                                        placeholder="Stocks" 
                                        style={styles.input}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={value => { 
                                            inputChangeHandler('stocks', value);
                                            onChange(value);
                                        }}
                                    />
                                    { (errors as any)?.stocks?.message && <Text style={styles.textDanger}>{(errors as any)?.stocks?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Stocks is required'}}
                        />
                    </Layout>
                    <Button disabled={loading} style={localStyle.button} onPress={handleSubmit(submitHandler)}>{ loading ? 'Loading...' : 'Save Product'}</Button>
                </View>
            </View>
        </ScrollView>
    );
}

const localStyle = StyleSheet.create({
    button: {
        backgroundColor: primaryColor, 
        borderRadius: 10
    },
    itemImageContainer: {
        backgroundColor:'#f4f4f5', 
        borderWidth: 1, 
        borderStyle:'dashed',
        borderColor:'#ccc',  
        height: 250, 
        width:'100%', 
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

type Select = {
    key: String;
    value: String;
}

export default NewItem;