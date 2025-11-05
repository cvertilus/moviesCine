import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function VerPelicula() {
    const { id } = useParams(); // obtenemos el id de la URL
    const navigate = useNavigate();

    const iframeUrl = `https://vidsrc.xyz/embed/movie?tmdb=${id}&ds_lang=es`;
    return (
        <>
            <Box sx={{ pt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                

                <iframe
                    src={iframeUrl}
                    title={`Película ${id}`}
                    width="100%"
                    height="500px"
                    style={{ border: 'none', maxWidth: '900px' }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />

               
            </Box>
            

        </>
    )
}
