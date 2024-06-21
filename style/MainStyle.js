import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerLogin: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCadastro: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuBar: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 3,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21,
    },
    iconsRight: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 19,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default styles