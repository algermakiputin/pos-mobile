import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUPPLIER, STORE_SUPPLIER } from "../src/supplier-queries";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import { Button, Input, useTheme } from "@ui-kitten/components"; 
import { useRouter } from "expo-router";

const NewSupplier = () => {
    const { control, handleSubmit, formState: {errors}, reset } = useForm();
    const [storeSupplier] = useMutation(STORE_SUPPLIER);
    const [loading, setLoading] = useState(false);
    const userContext = useContext(UserContext);
    const { refetch } = useQuery(GET_SUPPLIER);
    const router = useRouter();
    const theme = useTheme();
    const submitHandler = async (data: any) => {
        setLoading(true);
        const payload = {
            ...data,
            store_id: userContext?.user?.storeId
        };
        const store = await storeSupplier({
            variables: {
                supplier: payload
            }
        });
        if (store?.data?.storeSupplier?.success) {
            alert("Supplier saved successfully");
            reset();
            refetch();
            router.back();
        }
        setLoading(false);
    };
    return (
        <View style={[{backgroundColor: theme['background-basic-color-2']}, styles.container]}>
            <View style={{}}>
                <Controller
                    name="name"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                placeholder="Supplier Name"     
                                style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                size="large"
                            />
                            { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                        </View> 
                    )}
                    rules={{required: 'Category Name is required'}}
                /> 
                <Controller
                    name="email"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                placeholder="Email" 
                                style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                size="large"
                            />
                        </View> 
                    )}
                />
                <Controller
                    name="contact"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                placeholder="Phone Number" 
                                style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                size="large"
                            />
                        </View> 
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                placeholder="Address" 
                                style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                size="large"
                            />
                        </View> 
                    )}
                />
                <Button onPress={handleSubmit(submitHandler)} disabled={loading} style={{borderRadius: 20}} size="large" status="primary">
                    { loading ? 'Loading...' : 'Add Supplier' }
                </Button>
            </View>
        </View>
    );
}

export default NewSupplier;