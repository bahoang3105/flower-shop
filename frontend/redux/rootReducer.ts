import AddressSlice, { namespace as AddressNamespace } from './address/slice';
import ConnectionSlice, { namespace as ConnectionNamespace } from './connection/slice';
import AuthenticationSlice, { namespace as AuthenticationNameSpace } from './authentication/slice';
import TopicSlice, { namespace as TopicNameSpace } from './topic/slice';

const rootReducer = {
  [AddressNamespace]: AddressSlice,
  [ConnectionNamespace]: ConnectionSlice,
  [AuthenticationNameSpace]: AuthenticationSlice,
  [TopicNameSpace]: TopicSlice,
};

export default rootReducer;
