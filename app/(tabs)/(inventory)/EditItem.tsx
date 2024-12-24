import { View, TextInput, ScrollView, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import styles, { blackLightShade } from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { GET_ITEM, UPDATE_ITEM } from "@/app/src/item-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { useMutation, useQuery } from "@apollo/client";
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
    stocks: string;
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
    stocks: '',
    image: '',
    id: '',
}

const EditItem = () => {
    const [image, setImage] = useState('');
    const [formValues, setFormValues] = useState<FormInput>(formInputDefaultValue);
    const params = useLocalSearchParams();
    const { data: itemData } = useQuery(GET_ITEM, {
        variables: {
            id: params.id
        }
    });
    const [ updateItem, { error: updateError } ] = useMutation(UPDATE_ITEM, {
        variables: {
            editItemInput: {
                barcode: formValues.barcode,
                name: formValues.name,
                description: formValues.description,
                category_id: formValues.category_id,
                supplier_id: formValues.supplier_id,
                capital: formValues.capital,
                price: formValues.price,
                stocks: Number(formValues.stocks),
                image: formValues.image,
                id: formValues.id,
            }
        }
    })

    const { control, handleSubmit, formState: {errors}, reset } = useForm();

    console.log(`errorsqwe`, errors)

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

    const submitHandler = async () => {
        await updateItem();
    }
    console.log(`error`, updateError)
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
        inputChangeHandler('id', itemData?.item?.id);
        setFormValues(itemData?.item);
        reset(itemData?.item);
    }, [itemData]);

    const mapSupplier = (field: string, value: string) => {
        return suppliersSelectData?.find((supplier: any) => supplier[field] = value);
    }

    const mapCategory = (field: string, value: string) => {
        return categoriesSelectData?.find((category: any) => category[field] = value);
    }
  
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
                        name="name"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => ( 
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Barcode" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={ formValues?.barcode }
                                    defaultValue={ itemData?.item?.barcode }
                                    onChangeText={value => {
                                        inputChangeHandler('barcode', value);
                                        onChange(value)
                                    }}
                                />
                                { ((errors as any)?.barcode?.message && !formValues?.barcode) && <Text style={styles.textDanger}>{(errors as any)?.barcode?.message}</Text>}
                            </View> 
                        )}
                        rules={{required: 'Barcode is required'}}
                    />
                    <Controller 
                        name="name"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => ( 
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Item Name" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={ formValues?.name }
                                    defaultValue={ itemData?.item?.name }
                                    onChangeText={value => {
                                        inputChangeHandler('name', value);
                                        onChange(value)
                                    }}
                                />
                                { ((errors as any)?.name?.message && !formValues?.name) && <Text style={styles.textDanger}>{(errors as any)?.name?.message}</Text>}
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
                                    value={ formValues?.description}
                                    defaultValue={ itemData?.item?.description }
                                    onChangeText={value => {
                                        onChange(value);
                                        inputChangeHandler('description', value)
                                    }}
                                />
                                { ((errors as any)?.description?.message && !formValues?.description) && <Text style={styles.textDanger}>{(errors as any)?.description?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Description is required'}}
                    />
                    <Controller 
                        name="category_id"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        inputChangeHandler('category', mapCategory('value', val)?.key);
                                        onChange(value);
                                    }}
                                    data={categoriesSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Category"
                                    defaultOption={{key: Number(itemData?.item?.category_id), value: mapCategory('key', itemData?.item?.category_id)?.value }}
                                />
                                { ((errors as any)?.category_id?.message && !formValues?.category_id) && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
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
                                    setSelected={(val: string, key: string) => {
                                        onChange(val);
                                        inputChangeHandler('supplier', mapSupplier('value', val)?.key);
                                    }}
                                    data={suppliersSelectData}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Supplier"
                                    defaultOption={{key: Number(itemData?.item?.supplier_id), value: mapSupplier('key', itemData?.item?.supplier_id)?.value }}
                                />
                                { ((errors as any)?.supplier_id?.message && !formValues?.supplier_id) && <Text style={styles.textDanger}>{(errors as any)?.supplier_id?.message}</Text>}
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
                                        value={ formValues?.capital }
                                        defaultValue={ String(itemData?.item?.capital) }
                                        onChangeText={value => {
                                            inputChangeHandler('capital', value)
                                            onChange(value)
                                        }}
                                    />
                                    { ( (errors as any)?.capital?.message && !formValues?.capital ) && <Text style={styles.textDanger}>{(errors as any)?.capital?.message}</Text>}
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
                                        value={ formValues?.price }
                                        defaultValue={ String(itemData?.item?.price) }
                                        onChangeText={value => {
                                            inputChangeHandler('price', value)
                                            onChange(value);
                                        }}
                                    />
                                    { ( ((errors as any)?.price?.message) && !formValues?.price ) && <Text style={styles.textDanger}>{(errors as any)?.price?.message}</Text>}
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
                                    value={ formValues?.stocks }
                                    defaultValue={String(itemData?.item?.stocks || '')}
                                    onChangeText={value => {
                                        inputChangeHandler('stocks', value)
                                        onChange(value)
                                    }}
                                />
                                { ((errors as any)?.stocks?.message && !formValues?.stocks) && <Text style={styles.textDanger}>{(errors as any)?.stocks?.message}</Text>}
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