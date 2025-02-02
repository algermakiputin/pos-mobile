import { Text, ListItem, List, Divider } from "@ui-kitten/components";
import { DESTROY_SUPPLIER, GET_SUPPLIER } from "../src/supplier-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Alert } from "react-native";

interface IListItem {
    title: string;
    id: string;
    email: string;
    contact: string;
    address: string;
}

const Suppliers = () => {
    const { data, refetch, error } = useQuery(GET_SUPPLIER);
    const router = useRouter();
    useEffect(() => {
        refetch();
    }, []);

    const supplierData = useMemo(() => {
        return data?.suppliers?.map((supplier: any) => ({
            title: supplier?.name,
            id: supplier?.id,
            email: supplier?.email,
            contact: supplier?.contact,
            address: supplier?.address
        }));
    }, [data]);

    const [destroySupplier] = useMutation(DESTROY_SUPPLIER);

    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={() => <Text category="s1">{item.title}</Text>}
            description={() => <Text style={{flexWrap:'nowrap', paddingRight: 15}} category="s2">{ `${item?.email} ${item.contact ? `| ${item?.contact}` : ''} ${item.address ? `| ${item.address}` : ''}` }</Text>}
            accessoryRight={<RenderMenu item={item} />}
        />
    );

    const destroySupplierHandler = async (id: string) => {
        const deleteSupplier = await destroySupplier({
            variables: {
                id
            }
        });
        if (deleteSupplier?.data?.destroySupplier?.success) {
            alert("Supplier deleted successfully");
            await refetch();
        }
    }
    
    const showAlert = (id: string) =>
        Alert.alert(
            'Are you sure you want to delete that Category?',
            'That category will be permanently deleted',
            [
                {
                    text: 'Confirm',
                    onPress: () => destroySupplierHandler(id),
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

    const RenderMenu = ({item} : { item: IListItem}) => {
        return (
            <Menu style={{width:20, position:'absolute', right: 10, bottom:20}}>
                <MenuTrigger >
                    <Ionicons name="ellipsis-vertical-outline" size={18} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => router.navigate({pathname: '/EditSupplier', params: { id: item.id }}) }  text="Edit"/>
                    <MenuOption onSelect={() => showAlert(item.id)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <List
            style={{}}
            data={supplierData}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
}

export default Suppliers;