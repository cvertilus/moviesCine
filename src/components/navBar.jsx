import React, { use, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { Box, patch, useMediaQuery } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AccountCircle, FullscreenExit, Search } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import MovieIcon from '@mui/icons-material/Movie';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getMoviesSearchItem } from '../Services/endpoint';



export default function NavBar() {
    const menuItems = [
        { text: 'Inicio', icon: <HomeIcon />, path: "/" },
        { text: 'Series', icon: <InfoIcon />, path: "/dashword" },
        { text: 'Peliculas', icon: <MovieIcon />, path: "/discovery" },
        { text: 'UpComing', icon: <ContactMailIcon />, path: "/upcoming" },
        { text: "Top Rated", icon: <ContactMailIcon />, path: "/TopRated" }

    ];
    const [scrolled, setScrolled] = React.useState(false);
    const perfil = [{ text: 'Perfil', icon: <AccountCircle color='primary' /> }]
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [searhItem, setSearchTerm] = React.useState("")
    const [moviesData, setData] = React.useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);



    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }



    const handleSearch = async () => {

        console.log("busando", searhItem)
        try {
            const movies = await getMoviesSearchItem(searhItem)
            setData(movies)
            navigate("/result", { state: { movies } })
            console.log(movies)
        } catch (error) {
            console.log("error :", error)

        }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }

    const drawer = (
        <Box sx={{ textAlign: 'center', paddingTop: "20px", position: "relative", height: "100%", backgroundColor: "black", color: "white" }}
            role="presentation"
        >

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.path} component={Link} to={item.path} disablePadding >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "Center",
                    gap: 0,



                    padding: "4px 8px",
                    width: "100%",
                    maxWidth: 180,
                    background: "black"
                }}

            >
                <InputBase
                    placeholder='Search'
                    value={searhItem}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputProps={{ "arial-label": "Search" }} />
                <Button
                    variant='contained'
                    color="white"
                    onClick={handleSearch}
                    sx={{ minWidth: "40px", padding: "6px 12px" }}
                >
                    <SearchIcon />
                </Button>
            </Box>


        </Box>


    );



    return (
        <>
            <AppBar position="fixed"
                elevation={scrolled ? 0 : 0}
                sx={{
                    background: scrolled
                        ? 'black'
                        : 'linear-gradient(to bottom, black, transparent 120%)',
                    transition: 'background 0.3s ease-in, ',

                }}

            >
                <Toolbar >
                    <Typography variant='h6' sx={{ flexGrow: { xs: 1, md: 0.7 } }} >
                        Movie App
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={handleDrawerToggle}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            {menuItems.map((item) => (
                                <Button key={item.text} color="inherit" startIcon={item.icon} component={Link} to={item.path} sx={{
                                    margin: "5px",
                                    textAlign:"center",
                                    flexDirection:"column",
                                    display:"flex",
                                    fontSize:"15px"
                                    
                                }}
                                > {item.text} </Button>
                            ))}

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "Center",
                                    gap: 0,
                                    margin:"10px",
                                    padding: "4px 8px",
                                    width: "100%",
                                    maxWidth: 180,
                                    background: "black",
                                    
                                }}

                            >
                                <InputBase
                                    placeholder='Search'
                                    value={searhItem}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    inputProps={{ "arial-label": "Search" }} />
                                <Button
                                    variant='contained'
                                    color="white"
                                    onClick={handleSearch}
                                    sx={{ minWidth: "40px", padding: "6px 12px" }}
                                >
                                    <SearchIcon />
                                </Button>
                            </Box>


                        </>

                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}
