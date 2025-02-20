
import { useEffect } from "react";
import { Alert } from "react-native";

type PromptProps = {
    showPrompt: boolean,
    setShowPrompt: Function,
    onConfirm: Function,
    message: string,
    description: string
}
const Prompt = ({ showPrompt, setShowPrompt, onConfirm, message, description} : PromptProps ) => {
    const confirmHandler = () => {
        onConfirm?.();
    }
    const cancelHandler = () => {
        setShowPrompt();
    }
    const showAlert = (id: string) =>
        Alert.alert(
            message,
            description,
            [
                {
                    text: 'Confirm',
                    onPress: confirmHandler,
                    style: 'default',
                },
                {
                    text: 'Cancel',
                    onPress: cancelHandler,
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: cancelHandler,
            },
    );
    useEffect(() => {
        showPrompt && showAlert('1');
    }, [showPrompt]);

    return null;
}

export default Prompt;