import React, {useState, useEffect, createContext, ReactNode} from 'react';
import NetInfo from '@react-native-community/netinfo';
//@ts-ignore
export const NetworkContext = createContext();
interface NetworkProvidersProps {
  children: ReactNode;
}
export const NetworkProvider = ({children}: NetworkProvidersProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <NetworkContext.Provider value={{isConnected}}>{children}</NetworkContext.Provider>;
};
