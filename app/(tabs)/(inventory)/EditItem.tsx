import { View, TextInput, ScrollView, Button, Text } from "react-native";
import styles from '../../styles/style';
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";

const EditItem = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const submitHandler = (data: any) => {
        console.log(`data`, data);
    }

    const data = [
        {
            key: 1, value: 'Foods',
        },
        {
            key: 2, value: 'Soft Drinks',
        },
        {
            key: 3, value: 'FISH',
        },
        {
            key: 3, value: 'JUICE',
        },
        {
            key: 3, value: 'SABON',
        },
        {
            key: 3, value: 'CIGGARE',
        },
        {
            key: 3, value: 'Alcohol',
        },
    ]
    
    return (
        <ScrollView>
            <View style={[styles.container]}>
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
                                    onChangeText={value => onChange(value)}
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
                                    onChangeText={value => onChange(value)}
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
                                    setSelected={(val: string) => (onChange(val))}
                                    data={data}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Category"
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
                                    setSelected={(val: string) => (onChange(val))}
                                    data={data}
                                    save="value"
                                    boxStyles={styles.input}
                                    placeholder="Select Supplier"
                                />
                                { (errors as any)?.supplier?.message && <Text style={styles.textDanger}>{(errors as any)?.supplier?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Supplier is required'}}
                    />
                    <Controller 
                        name="retailPrice"
                        control={control}
                        render={({field: {onChange, value, onBlur}}) => (
                            <View style={styles.formGroup}>
                                <TextInput 
                                    placeholder="Retail Price" 
                                    style={styles.input}
                                    onBlur={onBlur}
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                />
                                { (errors as any)?.retailPrice?.message && <Text style={styles.textDanger}>{(errors as any)?.retailPrice?.message}</Text>}
                            </View>
                        )}
                        rules={{required: 'Retail Price is required'}}
                    />
                    <Button title="Save Product" onPress={handleSubmit(submitHandler)} />
                </View>
            </View>
        </ScrollView>
    );
}

export default EditItem;