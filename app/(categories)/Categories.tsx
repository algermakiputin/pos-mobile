import { Text, ListItem, List, Divider } from "@ui-kitten/components";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons } from "@expo/vector-icons";
import { GET_CATEGORIES, DESTROY_CATEGORY } from "../src/categories-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import UserContext from "../context/userContext";
import { useIsFocused } from "@react-navigation/native";

interface IListItem {
    title: string;
    id: string;
    itemCount: number;
}

const Categories = () => {
    const userContext = useContext(UserContext);
    const isFocused = useIsFocused();
    const { data, refetch } = useQuery(GET_CATEGORIES, { variables: { storeId: userContext.user.storeId }});
    const [destroyCategory] = useMutation(DESTROY_CATEGORY);
    const router = useRouter();
    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={() => <Text category="s1">{ item.title }</Text>}
            description={() => <Text category="s2">{ `Total ${item.itemCount ?  item.itemCount : 0} Items` }</Text>}
            accessoryRight={<RenderMenu item={item} />}
        />
    );

    const categoriesData = useMemo(() => {
        return data?.categories?.map((category: any) => ({
            title: category?.name,
            id: category?.id,
            itemCount: category?.itemCount
        }))
    }, [data]);

    const destroyCategoryHandler = async (id: string) => {
        const destroy = await destroyCategory({
            variables: {
                id
            }
        });
        if (destroy?.data?.destroyCategory?.success) {
            alert("Category Deleted Successfully");
            refetch();
        }
    }

    const showAlert = (id: string) =>
        Alert.alert(
            'Are you sure you want to delete that Category?',
            'That category will be permanently deleted',
            [
                {
                    text: 'Confirm',
                    onPress: () => destroyCategoryHandler(id),
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
                    <MenuOption onSelect={() => router.navigate({pathname: '/EditCategory', params: { id: item.id }})}  text="Edit"/>
                    <MenuOption onSelect={() => showAlert(item?.id)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    useEffect(() => {
        isFocused && refetch();
    }, [isFocused]);

    return (
        <List
            style={{}}
            data={categoriesData}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={{padding: 20}}>Your categories list is empty</Text>}
        />
    );
}

export default Categories;