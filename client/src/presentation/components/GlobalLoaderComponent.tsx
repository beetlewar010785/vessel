import { Backdrop, CircularProgress } from '@mui/material';
import { Signal } from '@preact/signals-react';

interface GlobalLoaderComponentProps {
    loading: Signal<boolean>;
}

export default function GlobalLoaderComponent({ loading }: GlobalLoaderComponentProps) {
    return (
        <Backdrop open={loading.value} sx={{ zIndex: 9999 }}>
            <CircularProgress />
        </Backdrop>
    );
}
