import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function VerPelicula() {
    const { id } = useParams(); // obtenemos el id de la URL
    const navigate = useNavigate();

    const iframeUrl = `https://vidsrc.sbs/embed/movie?tmdb=${id}&ds_lang=es`;
    const handleWatchNow = () => {
        const externalUrl = `https://vidsrc.sbs/embed/movie?tmdb=${id}&ds_lang=es`;
        
        // Abrir en una pestaña nueva (para que no pierdan tu página)
        window.open(externalUrl, '_blank', 'noopener,noreferrer');
        
        // O si prefieres que se vayan de tu página totalmente:
        // window.location.href = externalUrl;
    };
    return (
        <>
            <Box sx={{
                bgcolor: '#000', // Fondo negro total para modo cine
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 12
            }}>

                <Button
                    variant="contained"
                    onClick={handleWatchNow}
                    sx={{ bgcolor: '#C5A059', '&:hover': { bgcolor: '#0F1C2E' } , mb:5 }}
                >
                    REPRODUCIR EN SERVIDOR EXTERNO
                </Button>


                <iframe
                    src={iframeUrl}
                    title={`Película ${id}`}
                    width="100%"
                    height="500px"
                    style={{ border: 'none', maxWidth: '900px' }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen={true}
                />


            </Box>


        </>
    )
}
