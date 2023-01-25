import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const Fab = ({icon}) => (
  <FAB
    icon={icon}
    style={styles.fab}
    onPress={() => console.log('Pressed')}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: '#c53f36',
    color: '#fff'
  },
})

export default Fab;