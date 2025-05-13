import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUPPLIER, STORE_SUPPLIER } from "../src/supplier-queries";
import { useContext } from "react";
import UserContext from "../context/userContext";
import { Button } from "@ui-kitten/components"; 
import { useRouter } from "expo-router";

const NewSupplier = () => {
    const { control, handleSubmit, formState: {errors}, reset } = useForm();
    const [storeSupplier] = useMutation(STORE_SUPPLIER);
    const userContext = useContext(UserContext);
    const { refetch } = useQuery(GET_SUPPLIER);
    const router = useRouter();
    const submitHandler = async (data: any) => {
        const payload = {
            ...data,
            store_id: userContext?.user?.storeId
        };
        console.log(`payload`, payload);
        const store = await storeSupplier({
            variables: {
                supplier: payload
            }
        });
        console.log(`store`, store);
        if (store?.data?.storeSupplier?.success) {
            alert("Supplier saved successfully");
            reset();
            refetch();
            router.back();
        }
    };
    return (
        <View style={styles.container}>
            <View style={[styles.card]}>
                <Controller
                    name="name"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Supplier Name" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
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
                            <TextInput 
                                placeholder="Email" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                            />
                        </View> 
                    )}
                />
                <Controller
                    name="contact"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Phone Number" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                            />
                        </View> 
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Address" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                            />
                        </View> 
                    )}
                />
                <Button onPress={handleSubmit(submitHandler)}>
                    Save Supplier
                </Button>
            </View>
        </View>
    );
}

export default NewSupplier;