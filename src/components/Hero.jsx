import React from 'react'
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Hero({ pelicula }) {
    const [mostrarIframe, setMostrarIframe] = React.useState(false);
    const navigate = useNavigate();

    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const iframeUrl = `https://vidsrc.xyz/embed/movie?tmdb=${pelicula?.id}&ds_lang=es`;
    
   

    const handleClick = () => {
       
        navigate(`/verPelicula/${pelicula?.id}`);
    };


    const handleClose = () => {
        setMostrarIframe(false);
    };

    const fadeIn = keyframes`
        from {
         opacity: 0;
         transform: translateY(10px);
        }
        to {

          opacity: 1;
          transform: translateY(0);
        }`;

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${IMAGE_PATH}${pelicula?.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', // ✅ evita que se repita
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.65)', // más opacidad para mejor contraste
                    padding: 4,
                    position: 'absolute',
                    bottom: 40,
                    left: 40,
                    borderRadius: 2,
                    textAlign: 'left',
                    maxWidth: { xs: '90%', md: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    opacity: 0,
                    animation: 'opacity 1s ease-in-out forwards',
                    ...(mostrarIframe ? { display: 'none' } :
                        {
                            '&:hover': {
                                animation: `${fadeIn} 0.6s ease forwards`,
                            }
                        }),
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                        fontSize: { xs: '2rem', md: '3rem' },
                    }}
                >
                    {pelicula?.title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                        maxHeight: '20vh',
                        overflow: 'auto',
                    }}
                >
                    {pelicula?.overview}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mt: 2,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    }}
                >
                    Release Date: {pelicula?.release_date}
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleClick}

                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1.2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'none',

                    }}
                >
                    ▶ Watch Now
                </Button>

            </Box>
            {mostrarIframe && (
                <Box
                    sx={{
                        mt: 4,
                        width: 'auto',
                        maxWidth: 'auto',
                        mx: 'auto',
                        aspectRatio: '16/9',
                        padding: 2
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 150,
                            right: 200,
                            zIndex: 2,
                            backgroundColor: 'warning.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <iframe
                        src={iframeUrl}
                        title={pelicula?.title}

                        width="auto"
                        height="auto"
                        style={{ border: 'none', marginTop: '20px' }}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen

                    />
                    
                </Box>
            )
            }
        </Box>
    )
}
Hero.propTypes = {

}


