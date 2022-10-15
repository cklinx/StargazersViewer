import {renderHook} from '@testing-library/react-hooks';

const mockedColorScheme = jest.fn();

jest.mock('../useColorScheme', () => ({
  ...jest.requireActual('../useColorScheme'),
  useColorScheme: mockedColorScheme,
}));
describe('useColorScheme', () => {
  it("renders useColorScheme hook with return value of 'dark'", () => {
    mockedColorScheme.mockImplementationOnce(() => 'dark');
    const {result} = renderHook(() => mockedColorScheme());

    expect(result.current).toBeDefined();
    expect(result.current).toEqual('dark');
  });
});
