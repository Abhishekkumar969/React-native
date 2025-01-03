import { View, FlatList } from 'react-native';
import React from 'react';
import BusinessListCard from './BusinessListCard';

export default function ExploreBusinessList({ businessList }) {
    return (
        <FlatList
            data={businessList}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) =>
                index.toString()} // Use unique keys
            renderItem={({ item }) =>
                <BusinessListCard business={item} />}
            ListFooterComponent={
                <View style={{
                    height: 230,
                    marginBottom: 10,
                }} />
            } // Footer padding
        />
    );
}
