import { SUPPORTED_CHAIN_IDS } from 'connectors/constants';

export const isSupportChainId = (chainId: number) => {
  if (SUPPORTED_CHAIN_IDS.includes(chainId)) {
    return true;
  }
  return false;
};
