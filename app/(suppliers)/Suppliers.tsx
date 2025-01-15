import { Text, ListItem, List, Divider } from "@ui-kitten/components";
import { DESTROY_SUPPLIER, GET_SUPPLIER } from "../src/supplier-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";

interface IListItem {
    title: string;
    id: string;
    email: string;
    contact: string;
}

const Suppliers = () => {
    const { data, refetch, error } = useQuery(GET_SUPPLIER);
    const supplierData = useMemo(() => {
        return data?.suppliers?.map((supplier: any) => ({
            title: supplier?.name,
            id: supplier?.id,
            email: supplier?.email,
            contact: supplier?.contact
        }));
    }, [data]);

    const [destroySupplier] = useMutation(DESTROY_SUPPLIER);

    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={() => <Text category="s1">{`${item.title} ${index + 1}`}</Text>}
            description={() => <Text category="s2">{ `${item?.email} | ${item?.contact}` }</Text>}
            accessoryRight={<RenderMenu item={item} />}
        />
    );

    const destroySupplierHandler = async (id: string) => {
        await destroySupplier({
            variables: {
                id
            }
        });
        await refetch();
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
                    <MenuOption onSelect={() => destroySupplierHandler(item.id)} >
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