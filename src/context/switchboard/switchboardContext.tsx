import { createContext } from 'react';
import SwitchboardContextType from './switchboardContextType';

export const SwitchboardContext = createContext<SwitchboardContextType | undefined>(undefined);
