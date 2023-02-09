import {createSlice} from '@reduxjs/toolkit';

import {Images} from '@app/constants';

const initialState = {
  cartProducts: [
    {
      id: 1,
      title: 'Engine Filter',
      subtitle: 'Yamaha',
      price: 1540,
      discountedPrice: null,
      image: <Images.engineFilter width={'90%'} height={'90%'} />,
      count: 2,
    },
    {
      id: 2,
      title: 'Regular Servicing',
      subtitle: 'The Wheels Pvt Ltd',
      price: 1240,
      discountedPrice: 980,
      image: <Images.regularService />,
      count: 1,
    },
    {
      id: 3,
      title: 'Brake Pad',
      subtitle: 'Royal Enfield',
      price: 640,
      discountedPrice: null,
      image: <Images.brakePad width={'100%'} height={'100%'} />,
      count: 3,
    },
  ],
};

export const CartInfo = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const {} = CartInfo.actions;

export default CartInfo.reducer;
