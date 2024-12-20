import { StyleSheet } from "react-native";
export const primaryColor = "#004AA9";
export const primarySpotColor = "#ebeeff";
export const secondaryColor = "#31ABFF";
export const accentColor = "#72aca9";
export const bodyColor = '#f4f4f5';
export const blackLightShade = "#777";

const styles = StyleSheet.create({
    bold: {
        fontWeight: 700
    },  
    mb10: {
        marginBottom: 10
    },
    mb5: {
        marginBottom: 5
    }, 
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        height: '100%'
    },
    flex: {
        flex: 1,
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        marginBottom: 15,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    col1: {
        width: 105
    },  
    col2: {
        width: '50%',
    },
    formGroup: {
        marginBottom:20,
        flex: 1,
        width: '100%'
    },
    input: {
        color: '#8a8a8a',
        height: 44,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        letterSpacing: 0.8,
        paddingLeft: 15,
    },
    textDanger: {
        color: '#dc3545'
    },
    button: {
        backgroundColor:'#A7F4FE', 
        height:40, 
        width:125,
        justifyContent:'center', 
        alignContent:'center', 
        alignItems:'center',
        borderRadius: 5
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15
    },
    flexColumns: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    floatBottom: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textColorWhite: {
        color: "#ffffff"
    },
    textCenter: {
        textAlign: 'center'
    },
    quantityInputWrapper: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#f4f4f5',
        width: 35,
        height: 25,
        flex: 1,
        maxHeight: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;