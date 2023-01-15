import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



function Heart() {
  return (
    <View style={styles.rootContainer}>
        <Image
          source={require('../../assets/img/top_herat_icon.png')}
        />


    </View>
  );
}

export default Heart;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8.58%',
    paddingBottom: '1.38%',
  }
});