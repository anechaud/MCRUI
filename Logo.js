import React from 'react';
import {View, Image} from 'react-native';

const Logo = props => {
    return(
        <View style={styles.containerimage}>
            <Image resizeMode="center" style={styles.logo} source={require('./logo.png')}></Image>
            <Image resizeMode="center" style={styles.logo} source={require('./TechCSRLogo.png')}></Image>
        </View>
    )
}
const styles = {
    containerimage: {
        justifyContent: 'center',
        alignItems: 'center',
top:-80,
        flexDirection: 'row',
        
      },
      logo: {
        marginLeft: 20,
        width: 100,
        height: 100,
      }
}

export default Logo;
