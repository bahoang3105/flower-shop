import { BscConnector } from '@binance-chain/bsc-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

export const bscConnector = new BscConnector({}) as any;
export const injected = new InjectedConnector({});

export const networkParams = {
  '0x63564c40': {
    chainId: '0x63564c40',
    rpcUrls: ['https://api.harmony.one'],
    chainName: 'Harmony Mainnet',
    nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
    blockExplorerUrls: ['https://explorer.harmony.one'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png'],
  },
  '0xa4ec': {
    chainId: '0xa4ec',
    rpcUrls: ['https://forno.celo.org'],
    chainName: 'Celo Mainnet',
    nativeCurrency: { name: 'CELO', decimals: 18, symbol: 'CELO' },
    blockExplorerUrls: ['https://explorer.celo.org'],
    iconUrls: ['https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg'],
  },
  '0x38': {
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    chainName: 'Binance Smart Chain',
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    blockExplorerUrls: ['https://bscscan.com'],
    iconUrls: ['https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg'],
  },
};
