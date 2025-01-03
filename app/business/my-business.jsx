import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from './../../constants/Colors';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';


export default function MyBusiness() {


    const { user } = useUser();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            },
        })
        user && GetUserBusiness();
    }, [user]);

    // Used to get the business list by user email

    const GetUserBusiness = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList')
            , where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            // console.log(doc.data());
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        });
        setLoading(false);
    }
    return (
        <View style={{
            padding: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
            }}>My-business</Text>

            <FlatList
                data={businessList}
                onRefresh={GetUserBusiness}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <BusinessListCard business={item}
                        key={index}
                    />
                )}
            />



        </View>
    )
}