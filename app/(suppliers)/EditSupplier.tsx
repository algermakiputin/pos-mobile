import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUPPLIER, UPDATE_SUPPLIER } from "../src/supplier-queries";
import { useLocalSearchParams } from "expo-router";
import { FIND_SUPPLIER } from "../src/supplier-queries";
import { Input } from "@ui-kitten/components";
import { useEffect } from "react";

const EditSupplier = () => {
    const params = useLocalSearchParams();
    const { data, refetch: refetchSupplier } = useQuery(FIND_SUPPLIER, {
        variables: {
            id: params.id
        }
    });
    console.log(`data supplier`, data);
    const { control, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {
            name: data?.supplier?.name,
            address: data?.supplier?.address,
            email: data?.supplier?.email,
            contact: data?.supplier?.contact
        }
    });
    const [ update, { error } ] = useMutation(UPDATE_SUPPLIER);

    const submitHandler = async (formData: any) => {
        const params = {
            ...formData,
            id: data?.supplier?.id
        };
        const updateSupplier = await update({
            variables: {
                supplier: params
            }
        });
        if (updateSupplier?.data?.updateSupplier?.success) {
            alert("Supplier updated successfully");
        } else {
            alert("Opps something went wrong, please try again later.");
        }
    };
    
    useEffect(() => {
        refetchSupplier()
    });
    return (
        <View style={styles.container}>
            <View style={[styles.card]}>
                <Controller
                    name="name"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                label={"Supplier Name"}
                                placeholder="Supplier Name" 
                                // style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                defaultValue={data?.supplier?.name}
                                onChangeText={onChange}
                            />
                            { (errors as any)?.name?.message && <Text style={styles.textDanger}>{(errors as any)?.name?.message}</Text>}
                        </View> 
                    )}
                    rules={{required: 'Supplier name is required'}}
                /> 
                <Controller
                    name="email"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                label={"Email"}
                                placeholder="Email" 
                                // style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                defaultValue={data?.supplier?.email}
                                onChangeText={onChange}
                            />
                            { (errors as any)?.email?.message && <Text style={styles.textDanger}>{(errors as any)?.email?.message}</Text>}
                        </View> 
                    )}
                />
                <Controller
                    name="contact"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                label={"Phone Number"}
                                placeholder="Phone Number" 
                                // style={styles.input}
                                onBlur={onBlur}
                                defaultValue={data?.supplier?.contact}
                                value={value}
                                onChangeText={onChange}
                            />
                            { (errors as any)?.contact?.message && <Text style={styles.textDanger}>{(errors as any)?.contact?.message}</Text>}
                        </View> 
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <Input 
                                label={"Address"}
                                placeholder="Address" 
                                // style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                defaultValue={data?.supplier?.address}
                                onChangeText={onChange}
                            />
                            { (errors as any)?.address?.message && <Text style={styles.textDanger}>{(errors as any)?.address?.message}</Text>}
                        </View> 
                    )}
                />
                <TouchableOpacity onPress={handleSubmit(submitHandler)}>
                    <View style={styles.button}>
                        <Text>Save Supplier</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default EditSupplier;