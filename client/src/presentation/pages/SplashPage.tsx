import { useAppContext } from '../../ioc/AppContext';
import { useEffect } from 'react';

export default function SplashPage() {
    const { checkTokenUseCase } = useAppContext();

    useEffect(() => {
        checkTokenUseCase.execute().catch((err) => console.error(err));
    }, [checkTokenUseCase]);
    return <div></div>;
}
