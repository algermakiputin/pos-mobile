import { useForm, Controller } from "react-hook-form";
import styles from "@/app/styles/style";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

const NewCategory = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const submitHandler = (data: any) => {
        console.log(data);
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
                                placeholder="Category Name" 
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
                        <View style={styles.formGroup}>
                            <TextInput 
                                placeholder="Category Name" 
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
                <TouchableOpacity onPress={handleSubmit(submitHandler)}>
                    <View style={styles.button}>
                        <Text>Save Category</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default NewCategory;