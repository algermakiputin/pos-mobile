import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Button, Input, useTheme } from "@ui-kitten/components";
import { GET_CATEGORIES, STORE_CATEGORY } from "../src/categories-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import UserContext from "../context/userContext";
import { useRouter } from "expo-router";

const NewCategory = () => {
    const theme = useTheme();
    const { control, handleSubmit, formState: {errors}, reset } = useForm();
    const route = useRouter();
    const userContext = useContext(UserContext);
    const [storeCategory, { loading }] = useMutation(STORE_CATEGORY);

    const submitHandler = async (data: any) => {
        const store = await storeCategory({
            variables: {
                category: {
                    ...data,
                    store_id: userContext.user.storeId 
                }
            }
        });
        if (store?.data?.storeCategory?.success) {
            alert("Category added successfully");
            reset(); 
            route.back();
        }
    };

    return ( 
        <View style={[styles.card, {flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme['background-basic-color-2'], padding: 20}]}>
            <Controller
                name="name"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={localStyle.formGroup}>
                        <Input 
                            placeholder="Name" 
                            style={[{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}]}
                            onBlur={onBlur}
                            value={value}
                            size="large"
                            onChangeText={value => onChange(value)}
                        />
                        { (errors as any)?.category?.message && <Text style={styles.textDanger}>{(errors as any)?.category?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'Category Name is required'}}
            /> 
            <Controller
                name="description"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={localStyle.formGroup}>
                        <Input 
                            placeholder="Description" 
                            style={[{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}]}
                            onBlur={onBlur}
                            value={value}
                            size="large"
                            onChangeText={value => onChange(value)}
                        />
                        { (errors as any)?.description?.message && <Text style={styles.textDanger}>{(errors as any)?.description?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'Description  is required'}}
            />
            <Button size="large" status="primary" disabled={loading} style={{width: '100%', borderRadius: 20}} onPress={handleSubmit(submitHandler)}>
                { loading ? 'Loading...' : 'Add Category' }
            </Button>
        </View>
       
    );
}

const localStyle = StyleSheet.create({
    formGroup: {
        width: '100%',
        marginBottom: 20
    }
})

export default NewCategory;