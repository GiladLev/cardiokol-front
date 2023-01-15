import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 33,
    paddingVertical: '5%',
    paddingHorizontal: '20%',
    backgroundColor: Colors.pink500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    opacity: 1
  },
  pressed: {
    opacity: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.whight100,
    fontSize: 26,
    fontWeight: 'bold'
  },
});