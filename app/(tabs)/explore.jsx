import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';


export default function explore() {

    const [businessList, setBusinessList] = useState([]);
    const GetBusinessByCategory = async (category) => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.data())
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }])
        });
    }

    return (
        <View style={{
            padding: 20,
        }}>
            <Text style={{
                fontSize: 30,
                fontFamily: 'outfit-bold'
            }}>Explore More</Text>

            {/* SearchBar */}
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#fff', padding: 10, marginVertical: 10, marginTop: 15, marginBottom: 15, borderRadius: 8, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput style={{ fontFamily: 'outfit', fontSize: 16 }} placeholder='Search...' />
            </View>

            {/* Category */}
            <Category
                explore={true}
                onCategorySelect={(category) => GetBusinessByCategory(category)}
            />

            {/* Business List */}


            <ExploreBusinessList businessList={businessList} />



        </View >

    )
}