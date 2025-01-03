import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from './../../configs/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'


export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {
        GetBusinessList();
    }, []);
    const GetBusinessList = async () => {
        const q = query(collection(db, 'BusinessList'), limit(10));
        const querySnapshot = await getDocs(q);

        // querySnapshot.forEach((doc) => {
        //     setBusinessList([]);
        //     setBusinessList(prev => [...prev, doc.data()]);
        // })

        // avoid resetting the state inside the forEach loop. Instead, collect all the documents in an array and update the state once after the loop completes.
        const businesses = [];
        querySnapshot.forEach((doc) => {
            businesses.push({ id: doc.id, ...doc.data() }); // Collect all documents
        });
        setBusinessList(businesses); // Update state once after the loop

    };
    return (
        <View>
            <View style={{
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold'
                }}>Popular Business
                </Text>
                <Text style={{
                    color: Colors.PRIMARY,
                    fontFamily: 'outfit-medium'
                }}>View All</Text>
            </View>

            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopularBusinessCard
                        key={index}
                        business={item}
                    />
                )}
            />
        </View>
    )
}