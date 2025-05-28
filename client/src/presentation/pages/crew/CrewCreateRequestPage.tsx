import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from '../../../ioc/SnackbarContext';
import { useAppContext } from '../../../ioc/AppContext';
import { Request, RequestType } from '../../../domain/request';

export default function CrewCreateRequestPage() {
  const requestTypes: RequestType[] = ['Refueling', 'Food Order', 'Port Entry Request'];

  const { createRequestUseCase } = useAppContext();
  const showMessage = useSnackbar();

  const [type, setType] = useState<RequestType | ''>('');
  const [description, setDescription] = useState('');
  const [liters, setLiters] = useState('');
  const [portName, setPortName] = useState('');

  const handleSubmit = async () => {
    let request: Request;

    switch (type) {
      case 'Refueling':
        request = {
          id: uuidv4(),
          createdAt: new Date(),
          type,
          liters: Number(liters),
          description,
        };
        break;
      case 'Food Order':
        request = {
          id: uuidv4(),
          createdAt: new Date(),
          type,
          description,
        };
        break;
      case 'Port Entry Request':
        request = {
          id: uuidv4(),
          createdAt: new Date(),
          type,
          portName,
          description,
        };
        break;
      default:
        alert('Unsupported request type');
        return;
    }

    try {
      try {
        await createRequestUseCase.execute({ request });

        console.info(`Request saved: ${JSON.stringify(request)}`);
        showMessage('Request saved');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to save request: ${err.message}`);
          showMessage(err.message, 'error');
        } else {
          console.error(`Failed to save request`);
          showMessage('Unknown error', 'error');
        }
      }

      setType('');
      setDescription('');
      setLiters('');
      setPortName('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Failed to submit request: ' + err.message);
      } else {
        alert('Failed to submit request: unknown error');
      }
    }
  };

  const isValid = () => {
    if (!type) return false;
    if (type === 'Refueling' && !liters) return false;
    return !(type === 'Port Entry Request' && !portName);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        New Request
      </Typography>

      <TextField
        select
        label="Request Type"
        value={type}
        onChange={(e) => setType(e.target.value as RequestType)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {requestTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {type === 'Refueling' && (
        <TextField
          label="Volume (liters)"
          type="number"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}

      {type === 'Port Entry Request' && (
        <TextField
          label="Port Name"
          value={portName}
          onChange={(e) => setPortName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}

      <TextField
        label="Comment (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSubmit} disabled={!isValid()}>
        Submit Request
      </Button>
    </Box>
  );
}
