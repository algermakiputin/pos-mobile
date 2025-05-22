import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styles, { primaryColor } from "../styles/style";
import { useRouter } from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { REGISTER } from "../src/users-queries";

const Register = () => {
    const theme = useTheme()
    const googleLogo = require('@/assets/images/logo/google.png');
    const route = useRouter();
    const redirectToRegister = () => {
        route.navigate('/Login');
    }
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [ register, { error, loading } ] = useMutation(REGISTER, { errorPolicy: 'none' });
    const formSubmitHandler = async (data: any) => {
        try {
            const submit = await register({
                variables: {
                    user: data
                }
            }); 
            if (submit?.data?.register?.token) {
                alert("Registered successfully");
                reset();
                redirectToRegister();
            }
        } catch (err) {
            alert("Registration failed: " + error?.message); 
        }
    }

    return (
        <View style={[localStyles.container, { backgroundColor: theme['background-basic-color-2']}]}>
            <Text category="h2" style={styles.mb20}>Register to Stockly</Text>
            <Text style={styles.mb20}>Enter your information</Text>
            <Controller 
                name="firstName"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (  
                    <View style={styles.mb20}>
                        <Input 
                            label={"First Name"}
                            placeholder="Enter your first name"
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            size="large"
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
                    <View style={styles.mb20}>
                        <Input 
                            label={"Last Name"}
                            placeholder="Enter your last name"
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            size="large"
                        /> 
                        { (errors as any)?.lastName?.message && <Text style={styles.textDanger}>{(errors as any)?.lastName?.message}</Text>}
                    </View>
                )}
                rules={{required: 'First name is required'}}
            />
            <Controller 
                name="email"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (  
                    <View style={styles.mb20}>
                        <Input 
                            label={"Email"}
                            placeholder="Enter your email"
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            size="large"
                        /> 
                        { (errors as any)?.email?.message && <Text style={styles.textDanger}>{(errors as any)?.email?.message}</Text>}
                    </View>
                )}
                rules={{required: 'First name is required'}}
            />
            <Controller 
                name="password"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (  
                    <View style={styles.mb20}>
                        <Input 
                            label={"Password"}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            size="large"
                        /> 
                        { (errors as any)?.password?.message && <Text style={styles.textDanger}>{(errors as any)?.password?.message}</Text>}
                    </View>
                )}
                rules={{required: 'First name is required'}}
            />
            <Controller 
                name="confirmPassword"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (  
                    <View style={styles.mb20}>
                        <Input 
                            secureTextEntry={true}
                            label={"Confirm password"}
                            placeholder="Enter confirm password"
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            size="large"
                        /> 
                        { (errors as any)?.confirmPassword?.message && <Text style={styles.textDanger}>{(errors as any)?.confirmPassword?.message}</Text>}
                    </View>
                )}
                rules={{required: 'Confirm password is required'}}
            />
            <Button disabled={loading} size="large" style={[styles.mb20, {borderRadius: 20}]} onPress={handleSubmit(formSubmitHandler)}>{loading ? 'Loading...' : 'Register'}</Button>
            {/* <View style={localStyles.otherWaysLoginWrapper}>
                <Divider style={localStyles.otherWaysDivider} />
                <Text style={[styles.mb20, localStyles.loginWithText]}>Or Login with</Text>
                <Divider style={localStyles.otherWaysDivider} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <View>
                    <Image source={googleLogo} style={localStyles.socialLoginIcon} />
                </View>
            </View> */}
            <Text style={{textAlign: 'center'}}>Already have an account? <Text onPress={redirectToRegister} style={{color: primaryColor, cursor: 'pointer'}}>Login</Text></Text>
        </View>
    );
}

export default Register;

const localStyles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: '#fff', 
        padding: 20, 
        justifyContent: 'center'
    },
    otherWaysLoginWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    otherWaysDivider: {
        width:'30%', 
        alignSelf: 'center'
    },
    loginWithText: {
        width:'30%', 
        alignSelf: 'center', 
        marginTop: 20
    },
    socialLoginIcon: {
        width:45, 
        height: 45
    }
})