import { createContext, useContext } from 'react';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarContextValue {
    showMessage: (message: string, severity?: SnackbarSeverity) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export function useSnackbar() {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider');
    return ctx.showMessage;
}
