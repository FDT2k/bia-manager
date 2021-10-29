import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Person from '@material-ui/icons/Person';
import ArrowBack from '@material-ui/icons/ArrowBack';
//import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import Info from '@material-ui/icons/Info';
import Stats from '@material-ui/icons/Assessment';
import Print from '@material-ui/icons/Print';
import { SaveSharp as Save, CaretDownSharp as ArrowDown } from 'react-ionicons'

export const CaretDownSharp = props => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="CaretDownSharp button__svg" viewBox="0 0 512 512"><path d="M64 144l192 224 192-224H64z"/></svg>)
export const ChevronDownSharp = props => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="ChevronDownSharp button__svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M112 184l144 144 144-144"/></svg>)
export const CloseSharp = props => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="CloseSharp button__svg" viewBox="0 0 512 512"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"/></svg>)
export  {
    Delete,
    Person,
    ArrowBack,
    ArrowDown,
    ArrowUp,
    Save,
    Stats,
    Print,
    Info
}
