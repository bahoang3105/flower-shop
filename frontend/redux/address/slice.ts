import { createSlice } from '@reduxjs/toolkit';

export interface Address {
  address: string;
  chainId: number | null;
}

const initialState: Address = {
  address: '',
  chainId: null,
};

export const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    handleSetAddressNetwork: (state: Address, action: any) => {
      const { address, chainId } = action.payload;
      return {
        ...state,
        address,
        chainId,
      };
    },
  },
});

export const { handleSetAddressNetwork } = AddressSlice.actions;

export const namespace = 'AddressSlice';

export default AddressSlice.reducer;
