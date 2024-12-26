import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import { STORE_CATEGORY } from "../src/categories-queries";
import { useMutation } from "@apollo/client";

const NewCategory = () => {
    const { control, handleSubmit, formState: {errors}, reset } = useForm();
    const [storeCategory] = useMutation(STORE_CATEGORY);

    const submitHandler = async (data: any) => {
        const store = await storeCategory({
            variables: {
                category: data
            }
        });
        if (store?.data?.storeCategory?.success) {
            alert("Category added successfully");
            reset();
        }
    };

    return ( 
        <View style={[styles.card, {flex: 1, flexDirection: 'row', flexWrap: 'wrap'}]}>
            <Controller
                name="name"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={localStyle.formGroup}>
                        <TextInput 
                            placeholder="Name" 
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
                name="description"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={localStyle.formGroup}>
                        <TextInput 
                            placeholder="Description" 
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={value => onChange(value)}
                        />
                        { (errors as any)?.description?.message && <Text style={styles.textDanger}>{(errors as any)?.description?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'Description  is required'}}
            />
            <Button status="primary" style={{width: '100%'}} onPress={handleSubmit(submitHandler)}>
                Save
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