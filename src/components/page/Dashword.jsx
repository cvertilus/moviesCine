import React, { useEffect, useState } from 'react'
import { getMoviesEndpoint } from '../../Services/endpoint'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../navBar';
import Hero from '../Hero';
import { Box } from '@mui/system';
import Popular from './Popular';
import Discorvery from './Discovery';
import TopRated from './TopRated';
import UpComing from './UpComing';
import SearchComponent from './SearchComponent';


export default function Dashword() {




    return (
        <>
            <Box sx={{
                backgroundColor: '#f0f0f0', scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                overflow: "hidden",

            }}>
               
                <Popular />
                <UpComing />
                <Discorvery />
                <TopRated />
               
                
            </Box>



        </>
    )
}
