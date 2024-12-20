import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import Dropdown from '../dropdown/Dropdown';
import { primaryColor } from '@/app/styles/style';
import OrderContext from '@/app/(tabs)/(orders)/context/ordersContext';

type Props = {
    show: boolean,
    showHandler: () => void,
}

const data = [
  {
    title: 'Alger Makiputin',
    id: 1
  },
  {
    title: "John Doe",
    id: 3
  },
  {
    title: "Jane Doe",
    id: 4
  },
  {
    title: "Patrick Duck",
    id: 5
  },
  {
    title: "Donal Trump",
    id: 6
  }
]

const CustomerSelectModal = (props: Props): React.ReactElement => {
  const { setCustomer } = useContext(OrderContext);
  const [customerData, setCustomerData] = useState();
  const applyButtonHandler = () => {
    setCustomer(customerData);
    props?.showHandler();
  }
  return (
    <View style={styles.container}>
        <Modal
        visible={props.show}
        backdropStyle={styles.backdrop}
        onBackdropPress={props.showHandler}
        >
            <Card>
                <Text style={styles.label}>Select Customer</Text>
                <View style={{marginBottom:10}}>
                  <Dropdown
                      placeholder='Select Customer'
                      width={220} 
                      data={data}
                      onSelect={(data) => setCustomerData(data)}
                      />
                </View>
                <View>
                    <Button style={styles.button} onPress={applyButtonHandler}>Apply</Button>
                </View>
            </Card>
        </Modal>
    </View>
  );
};

export default CustomerSelectModal;

const styles = StyleSheet.create({
  container: {
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  label: {
    marginBottom:10,
    fontWeight: 700
  },
  button: {
    borderRadius: 10,
    backgroundColor: primaryColor,
  }
});