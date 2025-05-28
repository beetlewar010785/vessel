import { Grid, Card, CardActionArea, CardContent, Typography, SvgIconProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react';

export interface DashboardItem {
  path: string;
  label: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

export interface DashboardPageProps {
  items: DashboardItem[];
}

export default function DashboardPage({ items }: DashboardPageProps) {
  const navigate = useNavigate();

  const renderCard = (item: DashboardItem) => (
    <Card key={item.path}>
      <CardActionArea onClick={() => navigate(item.path)}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
          }}
        >
          {item.icon({ sx: { fontSize: 40, mb: 1 } })}
          <Typography variant="h6">{item.label}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid key={item.path} size={6}>
          {renderCard(item)}
        </Grid>
      ))}
    </Grid>
  );
}
