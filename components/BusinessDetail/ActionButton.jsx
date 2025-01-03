import { View, FlatList, Image, Text, TouchableOpacity, Linking, Alert, Share } from 'react-native';
import React from 'react';

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('./../../assets/images/call.png'),
            url: business?.contact ? `tel:${business.contact}` : null,
        },
        {
            id: 2,
            name: 'Location',
            icon: require('./../../assets/images/location.png'),
            url: business?.address
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business?.address)}`
                : null,
        },
        {
            id: 3,
            name: 'Web',
            icon: require('./../../assets/images/website.png'),
            url: business?.website || null,
        },
        {
            id: 4,
            name: 'Share',
            icon: require('./../../assets/images/share.png'),
            url: null, // URL is not needed for Share action
        },
    ];

    const OnPressHandle = (item) => {
        if (item.name === 'Share') {
            Share.share({
                message:
                    `${business.name}\nAddress: ${business.address}\nFind more details on the Business Detail page.`,
            });
            return;
        }

        if (!item.url) {
            Alert.alert('Invalid Action', `The ${item.name} information is not available.`);
            return;
        }

        Linking.openURL(item.url).catch((err) => {
            Alert.alert('Error', `Unable to open ${item.name}.`);
            console.error('Error opening URL:', err);
        });
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 20,
            }}
        >
            <FlatList
                data={actionButtonMenu}
                numColumns={4}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{
                    justifyContent: 'space-around',
                    marginBottom: 10,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => OnPressHandle(item)}
                        style={{ alignItems: 'center' }}
                    >
                        <Image
                            source={item.icon}
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontFamily: 'outfit-medium',
                                textAlign: 'center',
                                marginTop: 5,
                                fontSize: 14,
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
