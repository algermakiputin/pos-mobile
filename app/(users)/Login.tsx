import { Button, Divider, Input, Text } from "@ui-kitten/components";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "../styles/style";
import { useRouter } from "expo-router";

const Login = () => {
    const googleLogo = require('@/assets/images/logo/google.png');
    const route = useRouter();
    const redirectToRegister = () => {
        route.navigate('/Register');
    }
    return (
        <View style={localStyles.container}>
            <Text category="h2" style={styles.mb20}>Login</Text>
            <Text style={styles.mb20}>Login to continue using the app</Text>
            <Input 
                label={"Email"}
                placeholder="Enter your email"
                style={styles.mb20}
            />
            <Input 
                label={"Password"}
                placeholder="Enter password"
                style={styles.mb20}
            />
            <Button style={styles.mb20}>Login</Button>
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
            <Text style={{textAlign: 'center'}}>Don't have an account? <TouchableOpacity onPress={redirectToRegister}><Text>Register</Text></TouchableOpacity></Text>
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