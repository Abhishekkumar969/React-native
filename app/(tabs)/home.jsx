import { View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
        >
            {/* Header  */}
            <Header />

            {/* slider */}
            <Slider />

            {/* category  */}
            <View
                style={{ marginLeft: 20, marginRight: 20 }}>
                <Category />

            </View>

            {/* Popular business list  */}
            <PopularBusiness />
            <View style={{ height: 20 }}>

            </View>

        </ScrollView>
    )
}