import { Text, ListItem, List, Divider } from "@ui-kitten/components";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons } from "@expo/vector-icons";
import { GET_CATEGORIES, DESTROY_CATEGORY } from "../src/categories-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";

interface IListItem {
    title: string;
    id: string;
}

const Categories = () => {
    const { data, refetch } = useQuery(GET_CATEGORIES);
    const [destroyCategory] = useMutation(DESTROY_CATEGORY);
    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={() => <Text category="s1">{`${item.title} ${index + 1}`}</Text>}
            description={() => <Text category="s2">{ `Total ${index + 1} Items` }</Text>}
            accessoryRight={<RenderMenu item={item} />}
        />
    );

    useEffect(() => {
        console.log(`refetching?`)
        refetch();
    }, []);

    const categoriesData = useMemo(() => {
        return data?.categories?.map((category: any) => ({
            title: category?.name,
            id: category?.id
        }))
    }, [data]);

    const destroyCategoryHandler = async (id: string) => {
        const destroy = await destroyCategory({
            variables: {
                id
            }
        });
        console.log(`destroy`, destroy);
        if (destroy?.data?.destroyCategory?.success) {
            alert("Category Deleted Successfully");
            refetch();
        }
       
    }

    const RenderMenu = ({item} : { item: IListItem}) => {
        return (
            <Menu style={{width:20, position:'absolute', right: 10, bottom:20}}>
                <MenuTrigger >
                    <Ionicons name="ellipsis-vertical-outline" size={18} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => alert(`Save`)} text='View' />
                    <MenuOption onSelect={() => alert('test')}  text="Edit"/>
                    <MenuOption onSelect={() => destroyCategoryHandler(item?.id)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <List
            style={{}}
            data={categoriesData}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
}

export default Categories;