import { View, TextInput, ScrollView, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import styles, { blackLightShade } from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { GET_ITEM } from "@/app/src/item-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { Layout } from "@ui-kitten/components";

type FormInput = {
    barcode: string;
    name: string;
    description: string;
    category_id: string;
    supplier_id: string;
    capital: string;
    price: string;
    stocks: number;
    image: string;
    id: string;
}

const formInputDefaultValue = {
    barcode: '',
    name: '',
    description: '',
    category_id: '',
    supplier_id: '',
    capital: '',
    price: '',
    stocks: 0,
    image: '',
    id: ''
}

const EditItem = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const [image, setImage] = useState('');
    const [formValues, setFormValues] = useState<FormInput>();
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
        return supplierData?.suppliers?.map((value: any) => ({
            value: value?.name,
            key: value?.id
        }))
    }, [supplierData]);
    
    const submitHandler = (data: any) => {
        console.log(`data`, data);
    }
    
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

    const inputChangeHandler = (key: string, value: string | number) => {
        setFormValues((prevState: any) => ({
            ...prevState,
            [key]: value
        }))
    }

    useEffect(() => {
        inputChangeHandler('id', itemData?.item?.id)
    }, [itemData]);

    return (
        <ScrollView>
            <View style={[styles.container]}>
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
                                    onChangeText={value => inputChangeHandler('name', value)}
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
                                    onChangeText={value => inputChangeHandler('description', value)}
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
                                    setSelected={(val: string) => inputChangeHandler('category', value)}
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
                                    setSelected={(val: string) => inputChangeHandler('supplier', val)}
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
                                        defaultValue={String(itemData?.item?.capital)}
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
                                        defaultValue={String(itemData?.item?.price)}
                                        onChangeText={value => {
                                            inputChangeHandler('price', value)
                                            onChange(value);
                                        }}
                                    />
                                    { (errors as any)?.price?.message && <Text style={styles.textDanger}>{(errors as any)?.price?.message}</Text>}
                                </View>
                            )}
                            rules={{required: 'Price is required'}}
                        />
                    </Layout>
                    <Controller 
                        name="stocks"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Stocks" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={value}
                                    defaultValue={String(itemData?.item?.stocks)}
                                    onChangeText={value => {
                                        inputChangeHandler('stocks', value)
                                        onChange(value)
                                    }}
                                />
                                { (errors as any)?.capital?.message && <Text style={styles.textDanger}>{(errors as any)?.capital?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Capital is required'}}
                    />
                    <Button title="Save Product" onPress={handleSubmit(submitHandler)} />
                </View>
            </View>
        </ScrollView>
    );
}

const localStyle = StyleSheet.create({
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

export default EditItem;