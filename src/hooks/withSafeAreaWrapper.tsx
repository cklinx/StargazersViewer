import * as React from 'react';
import {SafeAreaView} from 'react-native';

const withSafeArea = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  };
};
export default withSafeArea;
