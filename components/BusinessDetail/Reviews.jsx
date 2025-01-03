import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView, RefreshControl, } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from './../../constants/Colors';
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const { user } = useUser();
    const [editComment, setEditComment] = useState(null); // Track the comment being edited
    const [refreshing, setRefreshing] = useState(false); // For Pull-to-Refresh
    const [reviews, setReviews] = useState(business?.reviews || []); // Local reviews state

    const fetchReviews = async () => {
        if (!business?.id) return;

        try {
            const docRef = doc(db, 'BusinessList', business.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setReviews(docSnap.data().reviews || []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchReviews();
        setRefreshing(false);
    }, [business?.id]);

    const onSubmit = async () => {
        if (!business?.id) {
            ToastAndroid.show('Business ID is missing!', ToastAndroid.BOTTOM);
            return;
        }

        try {
            const docRef = doc(db, 'BusinessList', business.id);

            if (editComment) {
                // Edit the existing comment
                const updatedReviews = reviews.map((item) =>
                    item.userEmail === user?.primaryEmailAddress?.emailAddress && item.date === editComment.date
                        ? { ...item, comment: userInput, rating }
                        : item
                );

                await updateDoc(docRef, { reviews: updatedReviews });
                ToastAndroid.show('Comment Updated Successfully!', ToastAndroid.BOTTOM);
                setEditComment(null);
            } else {
                // Add a new comment
                await updateDoc(docRef, {
                    reviews: arrayUnion({
                        rating,
                        comment: userInput,
                        userName: user?.fullName,
                        userImage: user?.imageUrl,
                        date: new Date().toISOString(),
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                    }),
                });
                ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM);
            }

            setUserInput('');
            fetchReviews(); // Refresh reviews
        } catch (error) {
            console.error('Error saving review:', error);
            ToastAndroid.show('Failed to save comment.', ToastAndroid.BOTTOM);
        }
    };

    const onDelete = async (comment) => {
        if (!business?.id) {
            ToastAndroid.show('Business ID is missing!', ToastAndroid.BOTTOM);
            return;
        }

        try {
            const docRef = doc(db, 'BusinessList', business.id);
            await updateDoc(docRef, {
                reviews: arrayRemove(comment),
            });

            ToastAndroid.show('Comment Deleted Successfully!', ToastAndroid.BOTTOM);
            fetchReviews(); // Refresh reviews
        } catch (error) {
            console.error('Error deleting review:', error);
            ToastAndroid.show('Failed to delete comment.', ToastAndroid.BOTTOM);
        }
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 20,
                flex: 1, marginBottom: 200
            }}
        >
            <Text
                style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                    marginBottom: 10,
                }}
            >
                Reviews
            </Text>
            <View>
                <Rating
                    showRating={false}
                    imageSize={30}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder="Write a review"
                    numberOfLines={4}
                    multiline
                    value={userInput}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top',
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        padding: 10,
                        backgroundColor: userInput ? Colors.PRIMARY : Colors.GRAY,
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: '#fff' }}>{editComment ? 'Update' : 'Submit'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View>
                    {reviews.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 10,
                                marginTop: 10,
                                // alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderRadius: 15,
                            }}
                        >
                            <Image
                                source={{ uri: item.userImage }}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 9,
                                    marginTop: 5
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    gap: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'outfit-medium',
                                        fontSize: 16,
                                    }}
                                >
                                    {item.userName}
                                </Text>
                                <Rating
                                    showRating={false}
                                    imageSize={20}
                                    startingValue={item.rating}
                                    style={{
                                        alignItems: 'flex-start',
                                    }}
                                />
                                <Text
                                    style={{
                                        fontFamily: 'outfit',
                                        fontSize: 14,
                                    }}
                                >
                                    {item.comment}
                                </Text>
                            </View>
                            {item.userEmail === user?.primaryEmailAddress?.emailAddress && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        gap: 10,

                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setUserInput(item.comment);
                                            setRating(item.rating);
                                            setEditComment(item);
                                        }}
                                    >
                                        <Text style={{ color: Colors.PRIMARY }}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onDelete(item)}>
                                        <Text style={{ color: 'red' }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
