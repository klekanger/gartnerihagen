import { wrapPageElement as wrap } from './src/chakra-wrapper';
import IdentityProvider from './src/context/identity-context';

export const wrapRootElement = IdentityProvider;
export const wrapPageElement = wrap;
