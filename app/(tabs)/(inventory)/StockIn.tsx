import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, Alert } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Button } from "@ui-kitten/components";
import UserContext from "@/app/context/userContext";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { ADD_STOCKS } from "@/app/src/item-queries";
import { useRoute } from "@react-navigation/native";

const StockIn = () => {
    const param = useLocalSearchParams();
    const router = useRouter();
    const [addStocks, { error }] = useMutation(ADD_STOCKS);
    const { control, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {
            name: param.name,
            currentStocks: param.stocks
        }
    });
    const userContext = useContext(UserContext);
   
    const submitHandler = async (data: any) => {
        const payload = {
            id: param.id,
            stocks: parseInt(data.stocks)
        };
        const update = await addStocks({
            variables: {
                item: payload
            }
        });
        if (update?.data?.addStocks?.success) {
            Alert.alert("Stocks added successfully");
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
                                placeholder="Item Name" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                readOnly
                            />
                            { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                        </View> 
                    )}
                    rules={{required: 'Item Name is required'}}
                />
                <Controller
                    name="currentStocks"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Current Stocks" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                readOnly
                            />
                            { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                        </View> 
                    )}
                    rules={{required: 'Current Stocks is required'}}
                />
                <Controller
                    name="stocks"
                    control={control}
                    render={({field: {onChange, value, onBlur}}) => ( 
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Enter stocks quantity to add" 
                                style={styles.input}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                            />
                        </View> 
                    )}
                />
                <Button onPress={handleSubmit(submitHandler)}>
                    Add Stocks
                </Button>
            </View>
        </View>
    );
}

export default StockIn;