import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import Intro from './../../components/BusinessDetail/Intro';
import ActionButton from './../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';
export default function BusinessDetail() {

    const { businessid } = useLocalSearchParams();
    const [business, setBusiness] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetBusinessDetailById();
    }, []);


    // used to get businessDetail by id
    const GetBusinessDetailById = async () => {
        setLoading(true);
        const docRef = doc(db, 'BusinessList', businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setBusiness({ id: docSnap.id, ...docSnap.data() });
            setLoading(false);
        } else {
            console.log("No such document!");
            setLoading(false);
        }
    }
    const sections = [
        { id: 'intro', component: <Intro business={business} /> },
        { id: 'actions', component: <ActionButton business={business} /> },
        { id: 'about', component: <About business={business} /> },
        { id: 'reviews', component: <Reviews business={business} /> },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading ? (
                <ActivityIndicator
                    style={{ marginTop: '70%' }}
                    size="large"
                    color={Colors.PRIMARY}
                />
            ) : business ? (
                <FlatList
                    data={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <View>{item.component}</View>}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text
                    style={{
                        fontSize: 18,
                        color: Colors.GRAY,
                        textAlign: 'center',
                        marginTop: '50%',
                        fontFamily: 'Outfit-Medium',
                    }}
                >
                    Business details not available.
                </Text>
            )}
        </View>
    );
}