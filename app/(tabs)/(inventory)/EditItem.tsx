import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import styles, { blackLightShade } from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { GET_ITEM, GET_ITEMS, UPDATE_ITEM } from "@/app/src/item-queries";
import { GET_SUPPLIER } from "@/app/src/supplier-queries";
import { GET_CATEGORIES } from "@/app/src/categories-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContext, useEffect, useMemo, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { Layout, Button, Input, useTheme, Text, IndexPath } from "@ui-kitten/components";
import BasicLoader from "@/components/Loader/BasicLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "@/app/context/userContext";

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
    const theme = useTheme();
    const router = useRouter();
    const userContext = useContext(UserContext);
    const [image, setImage] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [formValues, setFormValues] = useState<FormInput>(formInputDefaultValue);
    const params = useLocalSearchParams();
    const { data: itemData, loading: itemLoading, refetch: refetchItem } = useQuery(GET_ITEM, {
        variables: {
            id: params.id
        }
    });
    
    const { refetch } = useQuery(GET_ITEMS);
    const [ updateItem, { error: updateError, loading } ] = useMutation(UPDATE_ITEM, {
        variables: {
            editItemInput: {
                barcode: formValues?.barcode,
                name: formValues?.name,
                description: formValues?.description,
                category_id: formValues?.category_id,
                supplier_id: formValues?.supplier_id,
                capital: formValues?.capital,
                price: formValues?.price,
                stocks: Number(formValues?.stocks),
                image: formValues?.image,
                id: formValues?.id,
            }
        }
    })

    const { control, handleSubmit, formState: {errors}, reset } = useForm();
    const variables = {
        storeId: userContext.user.storeId
    }
    const { data: categoriesData, loading: categoryLoading } = useQuery(GET_CATEGORIES, { variables });
    const { data: supplierData, loading: supplierLoading } = useQuery(GET_SUPPLIER, { variables });
    
    const categoriesSelectData = () => {
        return categoriesData?.categories?.map((value: any) => ({
            value: value?.name,
            key: value?.id
        }))
    };

    const suppliersSelectData = () => {
        const suppliers = supplierData?.suppliers?.map((value: any) => ({
            key: value?.id,
            value: value?.name
        }));
        return suppliers;
    }
    const submitHandler = async (data: any) => {
      
        if (formValues.image) {
            await AsyncStorage.setItem(`item.${formValues.barcode}`, image);
        }
        const submit = await updateItem({
            variables: {
                editItemInput: {
                    barcode: formValues?.barcode,
                    name: formValues?.name,
                    description: formValues?.description,
                    category_id: formValues?.category_id,
                    supplier_id: formValues?.supplier_id,
                    capital: formValues?.capital,
                    price: formValues?.price,
                    stocks: Number(formValues?.stocks),
                    image: formValues?.image,
                    id: formValues?.id
                }
            }
        });
        if (submit?.data?.updateItem?.success) {
            alert("Item updated successfully");
            refetch();
            router.back();
        }
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
        console.log(`key`, key);
        setFormValues((prevState: any) => ({
            ...prevState,
            [key]: value
        }))
    } 

    console.log(`formValues`, formValues);

    useEffect(() => { 
        inputChangeHandler('id', itemData?.item?.id);
        setFormValues(itemData?.item); 
        reset(itemData?.item);
    }, [itemData]); 
    
    if (itemLoading || categoryLoading || supplierLoading) return <BasicLoader />;
   
    return (
        <ScrollView>
            <TouchableOpacity onPress={handleChoosePhoto}>
                    <View style={localStyle.itemImageContainer}>
                        { 
                            (!image && !itemData?.item?.image) ? (
                                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                                    <Ionicons name="cloud-upload-outline" size={28} color={blackLightShade}/>
                                    <Text style={{color: blackLightShade}}>Upload Image</Text>
                                </View>
                            ) : (
                                <Image width={250} height={250} source={{uri: image || itemData?.item?.image}} />
                            )
                        }
                    </View>
                </TouchableOpacity>
            <View style={[styles.container, { marginBottom:80, backgroundColor: theme['background-basic-color-1'] }]}>
                
                <View>
                <Controller 
                        name="name"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => ( 
                            <View style={styles.formGroup}>
                                <Input 
                                    label={'Barcode'}
                                    value={formValues?.barcode}
                                    placeholder="Barcode"
                                    onBlur={onBlur}
                                    defaultValue={itemData?.item?.barcode}
                                    onChangeText={value => {
                                        inputChangeHandler('barcode', value);
                                        onChange(value)
                                    }}
                                    style={{borderRadius: 20}}
                                    size="large"
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
                                <Input
                                    label={'Item Name'}
                                    placeholder="Item Name"
                                    onBlur={onBlur}
                                    value={ formValues?.name }
                                    defaultValue={ itemData?.item?.name }
                                    onChangeText={value => {
                                        inputChangeHandler('name', value);
                                        onChange(value)
                                    }}
                                    style={{borderRadius: 20}}
                                    size="large"
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
                                <Input
                                    label={'Description'}
                                    placeholder="Description"
                                    onBlur={onBlur}
                                    value={ formValues?.description}
                                    defaultValue={ itemData?.item?.description }
                                    onChangeText={value => {
                                        onChange(value);
                                        inputChangeHandler('description', value)
                                    }}
                                    style={{borderRadius: 20}}
                                    size="large"
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
                                <Text category="c1" style={{marginBottom: 7, color: 'rgb(143, 155, 179)', fontSize: 12, fontWeight: 700}}>Category</Text>
                                <SelectList 
                                    setSelected={(val: string) => {
                                        const id = categoriesData?.categories?.find((category: any) => category.name === val)?.id;
                                        console.log(`id`, id);
                                        inputChangeHandler('category_id', id);
                                        onChange(value);
                                    }}
                                    data={categoriesSelectData()}
                                    save="value"
                                    boxStyles={{borderRadius: 20, borderColor: 'rgb(228, 233, 242)', backgroundColor: 'rgb(247, 249, 252)'}}
                                    placeholder="Select Category"
                                    defaultOption={{key: Number(itemData?.item?.category_id), value: itemData?.item?.categoryName }}
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
                                <Text category="c1" style={{marginBottom: 7, color: 'rgb(143, 155, 179)', fontSize: 12, fontWeight: 700}}>Supplier</Text>
                                <SelectList 
                                    setSelected={(val: string, key: string) => {
                                        const id = supplierData?.suppliers?.find((supplier: any) => supplier.name === val)?.id;
                                        onChange(val);
                                        inputChangeHandler('supplier_id', id);
                                    }}
                                    data={suppliersSelectData()}
                                    save="value"
                                
                                    boxStyles={{borderRadius: 20, borderColor: 'rgb(228, 233, 242)', backgroundColor: 'rgb(247, 249, 252)'}}
                                    placeholder="Select Supplier"
                                    defaultOption={{key: Number(itemData?.item?.supplier_id), value: itemData?.item?.supplierName }}
                                />
                                { ((errors as any)?.supplier_id?.message && !formValues?.supplier_id) && <Text style={styles.textDanger}>{(errors as any)?.supplier_id?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Supplier is required'}}
                    />
                    <Layout style={{flex:1, flexDirection: 'row', gap: 10, backgroundColor: 'transparent'}}>
                        <Controller 
                            name="capital"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => (
                                <View style={[styles.formGroup, {flex: 1}]}>
                                    <Text category="c1" style={{marginBottom: 7}}>Capital</Text>
                                    <Input
                                        label={'Capital'}
                                        placeholder="Capital"
                                        onBlur={onBlur}
                                        value={ formValues?.capital }
                                        defaultValue={ String(itemData?.item?.capital) }
                                        onChangeText={value => {
                                            inputChangeHandler('capital', value)
                                            onChange(value)
                                        }}
                                        style={{borderRadius: 20}}
                                        size="large"
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
                                <View style={[styles.formGroup, { flex: 1}]}>
                                    <Text category="c1" style={{marginBottom: 7}}>Retail price</Text>
                                    <Input
                                        label={'Retail Price'}
                                        placeholder="Retail Price"
                                        onBlur={onBlur}
                                        style={{borderRadius: 20}}
                                        size="large"
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
                                <Text category="c1" style={{marginBottom: 7}}>Stocks</Text>
                                <Input
                                    label={'Stocks'}
                                    placeholder="Stocks" 
                                    onBlur={onBlur}
                                    style={{borderRadius: 20}}
                                    size="large"
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
                    <Button size="large" style={{borderRadius:20}} onPress={handleSubmit(submitHandler)} disabled={loading}>{ loading ? 'Loading...' : 'Update Product' }</Button>
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
    },
    input: {
        backgroundColor: '#fff'
    },
    inputLabel: {
        fontSize: 12, 
        color:'#8F9BB3', 
        marginBottom: 4, 
        fontWeight: 800
    }
})

export default EditItem;