import { View, Text, TextInput, ScrollView, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from './../../constants/Colors';
import { collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
// import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';


export default function AddBusiness() {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true,
        });
        GetCategoryList();
    }, []);

    // const onImagePick = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images'],
    //         allowsEditing: true,
    //         quality: 1,
    //     });

    //     setImage(result?.assets[0].uri);

    //     if (!result.canceled) {
    //         console.log(result);
    //     } else {
    //         alert('You did not select any image.');
    //     }
    // }

    const GetCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => {
            setCategoryList((prev) => [...prev,
            {
                label: (doc.data()).name,
                value: (doc.data()).name,
            }]);
        });
    };


    const saveBusinessDetail = async () => {
        if (!name || !address || !contact || !category) {
            ToastAndroid.show('Please fill all required fields!', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
                name: name,
                address: address,
                contact: contact,
                about: about,
                website: website,
                category: category,
                username: user?.fullName,
                userEmail: user?.primaryEmailAddress.emailAddress,
                userImage: user?.imageUrl,
            });

            setLoading(false);
            ToastAndroid.show('New business added successfully!', ToastAndroid.LONG);
        } catch (error) {
            console.error('Error saving business detail:', error);
            ToastAndroid.show('Failed to add business.', ToastAndroid.LONG);
            setLoading(false);
        }
    };


    return (
        <ScrollView
            style={{
                padding: 20,
            }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
            }}>
                Add New Business
            </Text>
            <Text
                style={{
                    fontFamily: 'outfit',
                    color: Colors.GRAY,
                }}>
                Fill all details in order to add a new business
            </Text>

            {/* <TouchableOpacity style={{
                marginTop: 20,
            }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require('./../../assets/images/star.png')}
                    style={{
                        width: 100,
                        height: 100,
                        // borderRadius: 15
                    }} />
                    :
                    <Image source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }}
                    />}
            </TouchableOpacity> */}

            <Image source={require('./../../assets/images/star.png')}
                style={{
                    width: 100,
                    height: 100,
                    // borderRadius: 15
                }} />

            <TextInput
                placeholder="Name"
                onChangeText={(v) => setName(v)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                    fontFamily: 'outfit',
                }}
            />

            <TextInput
                placeholder="Address"
                onChangeText={(v) => setAddress(v)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                    fontFamily: 'outfit',
                }}
            />

            <TextInput
                placeholder="Contact"
                onChangeText={(v) => setContact(v)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                    fontFamily: 'outfit',
                }}
            />

            <TextInput
                placeholder="Website (Optional)"
                onChangeText={(v) => setWebsite(v)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                    fontFamily: 'outfit',
                }}
            />

            <TextInput
                placeholder="About (Optional)"
                onChangeText={(v) => setAbout(v)}
                multiline={true}
                numberOfLines={5}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                    fontFamily: 'outfit',
                    height: 100,
                }}
            />

            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                }}>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={categoryList}
                    placeholder={{
                        label: 'Select a category...',
                        value: null,
                        color: '#9EA0A4',
                    }}
                />
            </View>



            <TouchableOpacity
                style={{
                    padding: 15,
                    borderRadius: 5,
                    marginTop: 20,
                    backgroundColor: Colors.PRIMARY,
                }}
                onPress={saveBusinessDetail}
                disabled={loading}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: 'outfit-medium',
                        color: '#fff',
                    }}
                >
                    {loading ? 'Saving...' : 'Add New Business'}
                </Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
}
