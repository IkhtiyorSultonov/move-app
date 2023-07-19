import { Menu, MenuItem } from '@mui/material'
import React, { useState,MouseEvent } from 'react'

const NavMenu = () => {
    const [anchorEl, setanchorEl] = useState<null |HTMLElement>(null)
    const open=Boolean(anchorEl)

    const handleOpen =(evt:MouseEvent<HTMLButtonElement>)=>{
        setanchorEl(evt.currentTarget)
    }

    const handleClose =()=>{
        setanchorEl(null)
    }
  return (
    <div className='md:!hidden'>
        <button  id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen} className='!capitalize !text-white pt-4    '> Browse </button>
          <Menu className='Menu'   id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
                <MenuItem>
                Home
                </MenuItem>
                <MenuItem>
                Movies
                </MenuItem>
                <MenuItem>
                TV Shows
                </MenuItem>
                <MenuItem>
                New
                </MenuItem>
                <MenuItem>
                Popular
                </MenuItem>
          </Menu>
      
    </div>
  )
}

export default NavMenu