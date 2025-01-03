import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { useAuth } from '@clerk/clerk-expo';
export default function MenuList() {
    const { signOut } = useAuth();

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('./../../assets/images/star.png'),
            path: '/business/add-business',
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('./../../assets/images/star.png'),
            path: '/business/my-business',
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('./../../assets/images/share.png'),
            path: 'share',
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('./../../assets/images/star.png'),
            path: 'logout'
        }
    ]

    const router = useRouter();

    const onMenuClick = (item) => {
        if (item.path == 'logout') {
            signOut();
            return;
        }
        if (item.path == 'share') {
            Share.share(
                {
                    message: 'Download the app from the link, Download URL: '
                }
            )
            return;
        }
        router.push(item.path)

    }

    return (
        <View style={{
            marginTop: 50,
        }}>
            <FlatList
                data={menuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onMenuClick(item)}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            flex: 1,
                            padding: 7,
                            borderRadius: 15,
                            borderWidth: 1,
                            margin: 10,
                            backgroundColor: '#fff',
                            borderColor: Colors.PRIMARY,
                        }}>
                        <Image source={item.icon}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20,
                            flex: 1,
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                marginTop: 50,
                color: Colors.GRAY,
            }}>Developed by Kabadiwala @2024</Text>
        </View>

    )
}