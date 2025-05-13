import { Button, Input, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import styles from "../styles/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "../src/categories-queries";
import { useEffect } from "react";

const EditCategory = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { data, refetch: refetchFindCategory } = useQuery(FIND_CATEGORY, {
        variables: {
            id: params.id
        }
    });
    const [ update, { error } ] = useMutation(UPDATE_CATEGORY);
    const { refetch } = useQuery(GET_CATEGORIES);

    const { control, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {
            name: data?.category?.name,
            id: data?.category?.id
        }
    });
    const handleFormSubmit = async (data: any) => {
        const updateCategory = await update({
            variables: {
                category: data
            }
        }); 
        if (updateCategory?.data?.updateCategory?.success) {
            alert("Category updated successfully");
            router.back();
           
        } else {
            alert("Opps something went wrong, please try again later.");
        }
    }

    useEffect(() => {
        refetchFindCategory();
    }, []);

    return (
        <View style={localStyles.container}>
            <Controller 
                name="name"
                control={control}
                render={({field: {onChange, value, onBlur}} ) => (
                    <View style={styles.formGroup}>
                        <Input 
                            label={"Category Name"}
                            placeholder="Name"
                            onBlur={onBlur}
                            value={ value }
                            defaultValue={ data?.category?.name }
                            onChangeText={onChange}
                        />
                        { ((errors as any)?.name?.message) && <Text style={styles.textDanger}>{(errors as any)?.name?.message}</Text>}
                    </View>
                )}
                rules={{required: 'Category Name is required'}}
            />
            <Button onPress={handleSubmit(handleFormSubmit)}>Update</Button>
        </View>
    );
};

const localStyles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    }
});

export default EditCategory;