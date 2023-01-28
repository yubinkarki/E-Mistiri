import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Images, BlurAllInputFocus} from '@app/constants';
import {InputField, FilterButton, ProductCard} from '@app/commons';
import {
  AdCarouselItem,
  AdCarouselPagination,
  AdData,
  VehicleCategoryCard,
  VehicleCategoryData,
  SegmentedProductCategory,
  ProductData,
} from './components';
import {DashboardStyles as Styles} from '@app/assets/styles';

export default function Dashboard() {
  const {
    control,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    BlurAllInputFocus();
  }, []);

  const [vehicleCategory, setVehicleCategory] = useState(VehicleCategoryData);

  const renderCarouselItem = ({item}) => (
    <View>
      <AdCarouselItem
        key={item.id}
        title={item.title}
        subtitle={item.subtitle}
        image={item.image}
      />
    </View>
  );

  const changeSelectedVehicle = itemId =>
    setVehicleCategory(
      vehicleCategory.map(item =>
        item.id === itemId
          ? {...item, isActive: true}
          : {...item, isActive: false},
      ),
    );

  const vehicleCategoryItem = ({item}) => (
    <VehicleCategoryCard
      title={item.title}
      image={item.image}
      isActive={item.isActive}
      onPress={() => changeSelectedVehicle(item.id)}
    />
  );

  return (
    <View style={Styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} />

      <View style={Styles.searchContainer}>
        <InputField
          control={control}
          errors={errors}
          inputName="search"
          labelText="Search for products"
          customStyles={{width: wp('76%')}}
          left={<TextInput.Icon icon={Images.searchIcon} />}
        />

        <FilterButton />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.carouselContainer}>
          <AdCarouselPagination data={AdData} renderItem={renderCarouselItem} />
        </View>

        <View style={Styles.vehicleCategoryContainer}>
          <FlatList
            horizontal
            data={vehicleCategory}
            renderItem={vehicleCategoryItem}
            keyExtractor={data => data.id}
            ItemSeparatorComponent={() => <View style={{width: wp('4%')}} />}
          />
        </View>

        <View style={Styles.segmentedButtonContainer}>
          <SegmentedProductCategory />
        </View>

        <View style={Styles.productListContainer}>
          {ProductData.map(item => (
            <ProductCard key={item.id} data={item} onPress={() => {}} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}