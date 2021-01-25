import { wrapPageElement as wrap } from "./src/chakra-wrapper";
import IdentityProvider from "./src/identity-context";

export const wrapRootElement = IdentityProvider;
export const wrapPageElement = wrap;
