import { Backdrop, CircularProgress } from '@mui/material';
import { useAppContext } from '../../ioc/AppContext';

export function GlobalLoader() {
  const { loadingStore } = useAppContext();
  return (
    <Backdrop open={loadingStore.loading.value} sx={{ zIndex: 9999 }}>
      <CircularProgress />
    </Backdrop>
  );
}
