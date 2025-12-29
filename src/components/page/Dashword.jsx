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
                backgroundColor: 'black', scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                maxWidth:"100%",
                overflow: "hidden",

            }}>

                <Popular carousel={true} />
                <UpComing carousel={true} />
                <Discorvery carousel={true} />
       
              
                <TopRated carousel={true}/>



            </Box>



        </>
    )
}
