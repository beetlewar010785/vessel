import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Fab,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import { useEffect, useState } from 'react';
import { useAppContext } from '../../../ioc/AppContext';
import { Request } from '../../../domain/request';
import { useNavigate } from 'react-router-dom';
import { getIcon, RoutePath } from '../../route';

export default function CrewRequestsPage() {
    const { requestStore, refreshRequestsUseCase } = useAppContext();
    const [selectedComment, setSelectedComment] = useState<string | null>(null);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        refreshRequestsUseCase
            .execute()
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [refreshRequestsUseCase]);

    const renderTypeIcon = (type: string) => {
        switch (type) {
            case 'Refueling':
                return <LocalGasStationIcon fontSize="small" sx={{ mr: 1 }} />;
            case 'Food Order':
                return <RestaurantIcon fontSize="small" sx={{ mr: 1 }} />;
            case 'Port Entry Request':
                return <DirectionsBoatIcon fontSize="small" sx={{ mr: 1 }} />;
            default:
                return null;
        }
    };

    const renderNoRequests = () => {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: 10,
                    color: 'text.secondary',
                }}
            >
                <AssignmentOutlinedIcon sx={{ fontSize: 64, mb: 2, color: 'grey.400' }} />
                <Typography variant="h6" gutterBottom>
                    No requests yet
                </Typography>
                <Typography variant="body2">
                    {"You haven't submitted or received any requests."}
                </Typography>
            </Box>
        );
    };

    const renderRequests = (requests: Request[]) => {
        return (
            <>
                {requests.map((item) => (
                    <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        {renderTypeIcon(item.type)}
                                        <Typography fontWeight="bold">{item.type}</Typography>
                                    </Box>
                                    {item.type === 'Refueling' && 'liters' in item && (
                                        <Typography variant="body2" color="text.secondary">
                                            {item.liters} L
                                        </Typography>
                                    )}
                                    {item.type === 'Port Entry Request' && 'portName' in item && (
                                        <Typography variant="body2" color="text.secondary">
                                            {item.portName}
                                        </Typography>
                                    )}
                                </Box>

                                <Box textAlign="right" minWidth={70}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        mb={0.5}
                                    >
                                        <IconButton
                                            size="small"
                                            disabled={!item.description}
                                            onClick={() => setSelectedComment(item.description!)}
                                        >
                                            <InfoOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(item.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}

                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                    }}
                    onClick={() => navigate(RoutePath.CREATE_REQUEST)}
                >
                    {getIcon(RoutePath.CREATE_REQUEST)({})}
                </Fab>

                <Dialog open={!!selectedComment} onClose={() => setSelectedComment(null)} fullWidth>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogContent>
                        <Typography>{selectedComment}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedComment(null)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            {isLoading ? (
                <></>
            ) : requestStore.requests.value.length > 0 ? (
                renderRequests(requestStore.requests.value)
            ) : (
                renderNoRequests()
            )}
        </Box>
    );
}
