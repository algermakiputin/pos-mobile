import { Ionicons } from "@expo/vector-icons";
import { Button, Divider, Text } from "@ui-kitten/components";
import { View } from "react-native";

const Profile = () => {
  return (
    <View style={{backgroundColor:'#fff', padding: 20, flex: 1}}>
      <View style={{width:90, height: 90, alignSelf: 'center', backgroundColor:'#333', borderRadius: 100}}>
      </View>
      <Text style={{textAlign:'center', marginTop: 10,marginBottom: 20}}>Alger Makiputin</Text>
      <View style={{flexDirection: 'row', justifyContent:'flex-start', gap: 20,paddingBottom: 20}}>
        <Ionicons name="person-outline" size={20} />
        <Text>Hello World</Text>
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
        <Text>helloworld@gmail.com</Text>
      </View>
      <Divider style={{marginBottom:10}}/>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', flexWrap:'wrap'}}>
        <Button status="success" style={{width:'49%',height:50, marginBottom:10}}>Manage Users</Button>
        <Button status="primary" style={{width:'49%',height:50, marginBottom:10}}>Logout</Button>
        <Button status="danger" style={{width:'49%',height:50, marginBottom:10}}>Delete Profile</Button>
      </View>
    </View>
  );
}

export default Profile;