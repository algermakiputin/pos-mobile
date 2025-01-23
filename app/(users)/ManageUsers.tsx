import { Alert, StyleSheet } from 'react-native';
import { List, ListItem, Text } from '@ui-kitten/components';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { DESTROY_USER, GET_USERS } from '../src/users-queries';
import { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import { User } from '../types/userTypes';

interface IListItem {
    name: string;
    id: string;
    email: string;
}

const ManageUsers = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { data, refetch } = useQuery(GET_USERS, { variables: { adminId: user.id } });
    const [ deleteUser ] = useMutation(DESTROY_USER);
    const userData = data?.getUsers?.map((user: User ) => ({
        id: user?.id,
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email
    }));

    const showAlert = (id: string) =>
        Alert.alert(
            'Are you sure you want to delete that Category?',
            'That category will be permanently deleted',
            [
                {
                    text: 'Confirm',
                    onPress: () => destroyUserHandler(id),
                    style: 'cancel',
                },
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                    'This alert was dismissed by tapping outside of the alert dialog.',
                ),
            },
    );

    const destroyUserHandler = async (id: string) => {
        const destroy = await deleteUser({
            variables: {
                id
            }
        });
        if (destroy?.data?.destroyUser?.success) {
            alert("User deleted successfully");
        } else {
            alert("Opps! something went wrong, please try again later.");
        }
    };

    const RenderMenu = ({item} : { item: IListItem}) => {
        return (
            <Menu style={{width:20, position:'absolute', right: 10, bottom:20}}>
                <MenuTrigger >
                    <Ionicons name="ellipsis-vertical-outline" size={18} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => router.navigate({pathname: '/EditUser', params: { id: item.id }})}  text="Edit"/>
                    <MenuOption onSelect={() => showAlert(item?.id)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }
    
    const renderItem = ({ item }: { item: IListItem }): React.ReactElement => (
        <ListItem
            title={() => <Text style={{paddingLeft: 10}}>{ item.name }</Text>}
            description={<Text style={{paddingLeft: 0}}> { item.email }</Text>}
            accessoryRight={<RenderMenu item={ item }/>}
        />
    );

    useEffect(() => {
        refetch();
    });
    
    return (
        <List
            style={styles.container}
            data={userData}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    container: {
    //   maxHeight: 320,
    },
    item: {
      marginVertical: 4,
    },
});

export default ManageUsers;