import { createSelector } from 'reselect';

const nftSelector = (state: any) => state.nftHomePage;

export const nftTypeSelector = createSelector(nftSelector, (nftHomePage) => {
  const { nftType, myNftType, isOwner } = nftHomePage;
  return isOwner ? myNftType : nftType;
});

export const signSelector = createSelector(nftSelector, (nftHomePage) => nftHomePage?.signed);
