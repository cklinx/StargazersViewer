import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// @ts-ignore
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
// @ts-ignore
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('react-native-autocomplete-dropdown', () => 'AutocompleteDropdown');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
