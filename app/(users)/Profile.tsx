import { Ionicons } from "@expo/vector-icons";
import { Button, Divider, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  console.log(`user`, user);
  return (
    <View style={{backgroundColor:'#fff', padding: 20, flex: 1}}>
      <View style={{width:90, height: 90, alignSelf: 'center', backgroundColor:'#333', borderRadius: 100}}>
      </View>
      <Text style={{textAlign:'center', marginTop: 10,marginBottom: 20}}>{ user.firstName } { user.lastName }</Text>
      <View style={{flexDirection: 'row', justifyContent:'flex-start', gap: 20,paddingBottom: 20}}>
        <Ionicons name="person-outline" size={20} />
        <Text>{ user.firstName } { user.lastName }</Text>
      </View>
      <Divider style={{marginBottom:20}}/>
      <View style={{flexDirection: 'row', justifyContent:'flex-start', gap: 20,paddingBottom: 20}}>
        <Ionicons name="location-outline" size={20} />
        <Text>Purok 19 San Gabriel Mintal Davao City</Text>
      </View>
      <Divider style={{marginBottom:10}}/>
      <View style={{flexDirection: 'row', justifyContent:'flex-start', gap: 20,paddingBottom: 20}}>
        <Ionicons name="call-outline" size={20} />
        <Text>09560887535</Text>
      </View>
      <Divider style={{marginBottom:10}}/>
      <View style={{flexDirection: 'row', justifyContent:'flex-start', gap: 20,paddingBottom: 20}}>
        <Ionicons name="mail-outline" size={20} />
        <Text>{ user.email }</Text>
      </View>
      <Divider style={{marginBottom:10}}/>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', flexWrap:'wrap'}}>
        <Button 
          status="success" 
          style={localStyles.button}
          onPress={() => router.navigate('/ManageUsers')}
          >Manage Users</Button>
        <Button status="primary" style={localStyles.button}>Logout</Button>
        <Button status="danger" style={localStyles.button}>Delete Profile</Button>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  button: {
    width:'49%',
    height:50, 
    marginBottom:10
  }
})

export default Profile;