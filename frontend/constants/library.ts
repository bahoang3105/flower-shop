import { Web3Provider } from '@ethersproject/providers';

export const LIBRARY_CONSTANTS = {
  getLibrary: (provider: any): Web3Provider => {
    const library = new Web3Provider(
      provider,
      typeof provider.chainId === 'number'
        ? provider.chainId
        : typeof provider.chainId === 'string'
        ? parseInt(provider.chainId)
        : 'any',
    );

    return library;
  },
};
