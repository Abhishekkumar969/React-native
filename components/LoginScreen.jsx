import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
import { Colors } from '@/constants/Colors';

import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {

            }
        } catch (err) {

            console.error(JSON.stringify(err, null, 2))
        }
    }, [])

    return (
        <View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '100'
            }}>
                <Image source={require('./../assets/images/login.png')}
                    style={{
                        width: 300,
                        height: 400,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#000'
                    }}
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}>
                    <Text>hey
                        <Text style={{
                            color: Colors.PRIMARY
                        }}>
                            App
                        </Text>
                    </Text>
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY
                }}> Find  tour fav business
                </Text>
                <TouchableOpacity style={styles.btn}
                    onPress={onPress}
                >
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: 'outfit'
                    }}>
                        Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,

    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        padding: 16,
        marginTop: 10,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    }
})
