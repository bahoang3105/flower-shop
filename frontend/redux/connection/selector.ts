import { Connection } from './slice';

const selectedConnection = {
  getConnection: (state: any) => state?.ConnectionSlice as Connection,
  getConnectedWalletType: (state: any) => state?.ConnectionSlice?.connectedWalletType,
};

export default selectedConnection;
