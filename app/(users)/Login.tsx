import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import styles, { primaryColor } from "../styles/style";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../src/users-queries";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/userContext";
import { useContext } from "react";
const Login = () => {
    const appLogo = require('@/assets/images/stocklylogo.png');
    const googleLogo = require('@/assets/images/logo/google.png');
    const route = useRouter();
    const redirectToRegister = () => {
        route.navigate('/Register');
    }
    const theme = useTheme()
    const { setUser } = useContext(UserContext);
    const [login, { loading, error }] = useMutation(LOGIN, { errorPolicy: 'all'});
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const handleFormSubmit = async (data: any) => {
        try {
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
                setUser(userLogin?.data?.login);
                AsyncStorage.setItem('token', userLogin?.data?.login?.token);
                route.navigate('/(tabs)');
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.log(`catching error`, error);
        }
    }
    
    return (
        <View style={[localStyles.container, {backgroundColor: theme['background-basic-color-2']}]}>
            <Image source={appLogo} style={{width: 102, height:  80, marginBottom: 25, alignSelf: 'center'}} />
            <Text category="h2" style={[styles.mb20]}>Login to Stockly</Text>
            <Text style={styles.mb20}>Login to continue using the app</Text>
            <Controller 
                name="email"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (  
                    <View style={[styles.mb20]}>
                        <Input 
                            label={"Email"}
                            placeholder="Enter your email"
                            onChangeText={onChange}
                            value={value}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            onBlur={onBlur}
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
                    <View style={[styles.mb20]}>
                        <Input 
                            label={"Password"}
                            placeholder="Enter password"
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            style={{backgroundColor: theme['background-basic-color-1'], borderRadius: 20}}
                            secureTextEntry={true}
                            size="large"
                        />
                        { (errors as any)?.password?.message && <Text style={styles.textDanger}>{(errors as any)?.password?.message}</Text>}
                    </View>
                )}
                rules={{required: 'Password is required'}}
            /> 
            <Button size="large" style={[styles.mb20, { borderRadius: 20, backgroundColor: theme['color-primary-500']}]} onPress={handleSubmit(handleFormSubmit)} disabled={loading}>{ loading ? 'Loading...' : 'Login'}</Button>
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
            <Text style={{textAlign: 'center'}}>Don't have an account? <Text onPress={redirectToRegister} style={{color: primaryColor, cursor: 'pointer'}}>Register</Text></Text>
        </View>
    );
}

export default Login;

const localStyles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: '#fff', 
        padding: 20, 
        justifyContent: 'center',
        // alignItems: 'center'
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