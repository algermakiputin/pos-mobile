import { Button, Divider, Input, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import styles from "../styles/style";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../src/users-queries";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {
    const googleLogo = require('@/assets/images/logo/google.png');
    const route = useRouter();
    const redirectToRegister = () => {
        route.navigate('/Register');
    }
    const { setUser } = useContext(UserContext);
    const [login, { loading }] = useMutation(LOGIN);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const handleFormSubmit = async (data: any) => {
        const userLogin = await login({
            variables: {
                user: {
                    email: data?.email,
                    password: data?.password
                }
            }
        });
        console.log(`userLogin`, userLogin);
        if (userLogin?.data?.login?.email) {
            console.log(`userLogin`, userLogin);
            setUser(userLogin?.data?.login);
            AsyncStorage.setItem('token', userLogin?.data?.login?.token);
            route.navigate('/(tabs)');
        } else {
            alert("Login failed");
        }
        console.log(`userLogin`, userLogin);
    }
    
    return (
        <View style={localStyles.container}>
            <Text category="h2" style={styles.mb20}>Login</Text>
            <Text style={styles.mb20}>Login to continue using the app</Text>
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
                            onBlur={onBlur}
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
                            placeholder="Enter password"
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            secureTextEntry={true}
                        />
                        { (errors as any)?.password?.message && <Text style={styles.textDanger}>{(errors as any)?.password?.message}</Text>}
                    </View>
                )}
                rules={{required: 'First name is required'}}
            /> 
            <Button style={styles.mb20} onPress={handleSubmit(handleFormSubmit)} disabled={loading}>{ loading ? 'Loading...' : 'Login'}</Button>
            <View style={localStyles.otherWaysLoginWrapper}>
                <Divider style={localStyles.otherWaysDivider} />
                <Text style={[styles.mb20, localStyles.loginWithText]}>Or Login with</Text>
                <Divider style={localStyles.otherWaysDivider} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <View>
                    <Image source={googleLogo} style={localStyles.socialLoginIcon} />
                </View>
            </View>
            <Text style={{textAlign: 'center'}}>Don't have an account? <Text onPress={redirectToRegister}>Register</Text></Text>
        </View>
    );
}

export default Login;

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