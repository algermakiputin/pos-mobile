import { Text, Input, Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { emailPattern } from "../utils/patterns";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_USER, GET_USERS, REGISTER, UPDATE_USER } from "../src/users-queries";
import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useLocalSearchParams } from "expo-router";

const EditUser = () => {
    const { control, handleSubmit, formState: {errors}, register, watch, reset, setValue } = useForm();
    const { user } = useContext(UserContext);
    const params = useLocalSearchParams();
    const { refetch: refetchUsers } = useQuery(GET_USERS, { variables: { adminId: user.id } });
    const [ updateUser, { error, loading } ] = useMutation(UPDATE_USER);
    const { data: userData, refetch } = useQuery(FIND_USER, { variables: { userId: params.id } });
    const formSubmitHandler = async (data: any) => {
        return console.log(`data`, data);
        const update = await updateUser({
            variables: {
                user: {
                    ...data,
                    id: params.id
                }
            }
        });
        if (update?.data?.updateUser?.success) {
            alert("User updated successfully");
            await refetchUsers();
        } else {
            alert("Opps something went wrong, please try again later");
        }
    }

    useEffect(() => {
       setValue("firstName", userData?.user?.firstName);
       setValue("lastName", userData?.user?.lastName);
       setValue("email", userData?.user?.email);
       refetch();
    }, [userData]);
    
    return (
        <View style={styles.container}>
            {
                error?.graphQLErrors[0].message ? (
                    <View>
                        <Text status="danger">Error: <Text status="danger">{ error?.graphQLErrors[0].message  }</Text></Text>
                    </View>
                ) : ''
            }
            <Controller 
                name="firstName"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={styles.formGroup}>
                        <Input 
                            label={"First Name"}
                            placeholder="Enter first name"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            defaultValue={value}
                        />
                        { (errors as any)?.firstName?.message && <Text style={styles.textDanger}>{(errors as any)?.firstName?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'First name is required'}}
            />
            <Controller 
                name="lastName"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={styles.formGroup}>
                        <Input 
                            label={"Last Name"}
                            placeholder="Enter last name"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                        />
                        { (errors as any)?.lastName?.message && <Text style={styles.textDanger}>{(errors as any)?.lastName?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'Last name is required'}}
            />
            <Controller 
                name="email"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={styles.formGroup}>
                        <Input 
                            label={"Email"}
                            placeholder="Enter email"
                            value={value}
                            onChangeText={onChange}
                            {...register('email', {
                                required: true,
                                validate: (value) => {
                                    return emailPattern.test(value) || 'Please enter a valid email'
                                }
                            })}
                        />
                        { (errors as any)?.email?.message && <Text style={styles.textDanger}>{(errors as any)?.email?.message}</Text>}
                    </View> 
                )}
                rules={{required: 'Email is required'}}
            />
            <Controller 
                name="password"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={styles.formGroup}>
                        <Input 
                            label={"Password"}
                            placeholder="Leave blank if not updating password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                        { (errors as any)?.password?.message && <Text style={styles.textDanger}>{(errors as any)?.password?.message}</Text>}
                    </View> 
                )}
            />
            <Controller 
                name="confirmPassword"
                control={control}
                render={({field: {onChange, value, onBlur}}) => ( 
                    <View style={styles.formGroup}>
                        <Input 
                            label={"Confirm password"}
                            placeholder="Enter confirm password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            {...register('confirmPassword', {
                                validate: (value) => {
                                    return value === watch('password') || 'Password does not match'
                                }
                            })}
                        />
                        { (errors as any)?.confirmPassword?.message && <Text style={styles.textDanger}>{(errors as any)?.confirmPassword?.message}</Text>}
                    </View> 
                )}
            />
            <Button onPress={handleSubmit(formSubmitHandler)}>{ loading ? 'Loading...' : 'Update' }</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    formGroup: {
        marginBottom:20,
        width: '100%',
    },
    textDanger: {
        color: '#dc3545'
    },
});

export default EditUser;