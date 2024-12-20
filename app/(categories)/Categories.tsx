import { Text, ListItem, List, Divider } from "@ui-kitten/components";
import { View } from "react-native";
import styles from "../styles/style";

interface IListItem {
    title: string;
    description: string;
  }
  
const data = [
    {
        title: "Beverages",
        description: "Food, drinks"
    },
    {
        title: "Apparel",
        description: "Food, drinks"
    },
    {
        title: "Arts & Entertainment",
        description: "Food, drinks"
    },
    {
        title: "Collectibles",
        description: "Food, drinks"
    },
    {
        title: "Candies",
        description: "Food, drinks"
    },
    {
        title: "Canned Goods",
        description: "Food, drinks"
    },
    {
        title: "Soft Drinks",
        description: "Food, drinks"
    },
    {
        title: "Medicine",
        description: "Food, drinks"
    },
]

const Categories = () => {
    const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={() => <Text category="s1">{`${item.title} ${index + 1}`}</Text>}
            description={() => <Text category="s2">{ `${item.description} ${index + 1}` }</Text>}
        />
    );
    return (
        <List
            style={{}}
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
}

export default Categories;