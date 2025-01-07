import { Card, Modal, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

type Props = {
    visible: boolean
    setVisible: () => void
}

const SalesDetailsModal = (props: Props): React.ReactElement => {
    const modalCloseHandler = () => {
        if (props?.setVisible) props.setVisible();
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={props?.visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={modalCloseHandler}
                >
                <Card style={styles.card}>
                    <Text style={{flex:1}}>Label</Text>
                    <Text>Value</Text>
                </Card>
            </Modal>
        </View>
    );
}

export default SalesDetailsModal;


const styles = StyleSheet.create({
    container: {
        // minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        flex: 1, 
        justifyContent: 'center', 
        width:'85%', 
        margin: 'auto'
    }
});