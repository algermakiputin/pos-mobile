import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles, { blackLightShade, primaryColor } from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { STORE_ITEM } from "@/app/src/item-queries";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from "@/app/context/userContext";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

type FormInput = {
    barcode: string;
    name: string;
    description: string;
    category_id: string;
    supplier_id: string;
    capital: string;
    price: string;
    stocks: string;
    image: string;
}

const formInputDefaultValue = {
    barcode: '',
    name: '',
    description: '',
    category_id: '',
    supplier_id: '',
    capital: '',
    price: '',
    stocks: '',
    image: ''
}

const NewItem = () => {
    const userContext = useContext(UserContext);
    const isFocused = useIsFocused();
    const { control, handleSubmit, formState: {errors} } = useForm();
    const [image, setImage] = useState('');
    const [formValues, setFormValues] = useState<FormInput>();
    const variables = {
        storeId: userContext.user.storeId
    }
    const { data: categoriesData, refetch: refetchCategories } = useQuery(GET_CATEGORIES, { variables });
    const { data: supplierData, refetch: refetchSuppliers } = useQuery(GET_SUPPLIER, { variables });
    const router = useRouter(); 
    
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
        setImage('');
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (!result.canceled) {
            setImage(result?.assets?.[0]?.uri);
        }
        if (result?.assets?.[0]?.uri) {
            setImage(result?.assets?.[0]?.uri);
            inputChangeHandler('image', result?.assets?.[0]?.uri);
        };
    };
    
    const storeImage = (key: string, value: any) => {
        if (!value) return false;
        try {
            AsyncStorage.setItem(key, value);
        } catch(e) {
            console.log(`error`, e);
        }
    }

    const [storeItem, { loading }] = useMutation(STORE_ITEM)

    const submitHandler = async (data: any) => {
        storeImage(String(formValues?.barcode), image);
        const store = await storeItem({
            variables: {
                item: {
                    ...formValues,
                    storeId: userContext.user.storeId,
                    image: image
                }
            }
        }); 
        if (store?.data?.storeItem?.success) {
            alert("Added Successfully");
            setFormValues(formInputDefaultValue);
            router.back();
        }
    }

    const inputChangeHandler = (key: string, value: string | number) => {
        setFormValues((prevState: any) => ({
            ...prevState,
            [key]: value
        }))
    }

    useEffect(() => {
        refetchCategories();
        refetchSuppliers();
    }, [isFocused]);

    return (
        <ScrollView>
            <View style={{paddingBottom: 80}}>
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
                                    <Input
                                        label={"Barcode"}
                                        size="large" 
                                        placeholder="Barcode" 
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
                                    <Input
                                        label={"Item Name"}
                                        size="large" 
                                        placeholder="Item Name"  
                                        onBlur={onBlur}
                                        value={formValues?.name}
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
                                    <Input 
                                        label={"Description"}
                                        placeholder="Description" 
                                        onBlur={onBlur}
                                        value={formValues?.description}
                                        onChangeText={value => { 
                                            inputChangeHandler('description', value);
                                            onChange(value);
                                        }}
                                        size="large"
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
                                <Text category="c1" style={{marginBottom: 7, color: 'rgb(143, 155, 179)', fontSize: 12, fontWeight: 700}}>Category</Text>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        var id = categoriesSelectData?.find((category:Select) => category.value == val)?.key;
                                        inputChangeHandler('category_id', id);
                                        onChange(id);
                                    }}
                                    data={categoriesSelectData}
                                    save="value"
                                    boxStyles={{...styles.input, borderColor: 'rgb(228, 233, 242)', backgroundColor: 'rgb(247, 249, 252)'}}
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
                                <Text category="c1" style={{marginBottom: 7, color: 'rgb(143, 155, 179)', fontSize: 12, fontWeight: 700}}>Supplier</Text>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        var id = supplierSelectData?.find((supplier:Select) => supplier.value == val)?.key;
                                        inputChangeHandler('supplier_id', id)
                                        onChange(id);
                                    }}
                                    data={supplierSelectData}
                                    save="value"
                                    boxStyles={{...styles.input, borderColor: 'rgb(228, 233, 242)', backgroundColor: 'rgb(247, 249, 252)'}}
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
                                <View style={[styles.formGroup, { flex: 1}]}>
                                    <Input
                                        label={"Capital"}
                                        size="large"     
                                        placeholder="Capital"  
                                        onBlur={onBlur}
                                        value={formValues?.capital}
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
                                <View style={[styles.formGroup, { flex: 1}]}>
                                    <Input 
                                        label={'Retail Price'}
                                        size="large" 
                                        placeholder="Retail Price"  
                                        onBlur={onBlur}
                                        value={formValues?.price}
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
                                    <Input
                                        size="large"
                                        placeholder="Stocks" 
                                        label={"Stocks"}
                                        onBlur={onBlur}
                                        value={formValues?.stocks}
                                        onChangeText={value => { 
                                            inputChangeHandler('stocks', Number(value));
                                            onChange(value);
                                        }}
                                    />
                                    { (errors as any)?.stocks?.message && <Text style={styles.textDanger}>{(errors as any)?.stocks?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Stocks is required'}}
                        />
                    </Layout>
                    <Button size="large" disabled={loading} style={localStyle.button} onPress={handleSubmit(submitHandler)}>{ loading ? 'Loading...' : 'Save Product'}</Button>
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