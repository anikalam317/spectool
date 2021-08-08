import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Typography, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

type Props = {
  toggleDrawer: ()=>void
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  menuButton: {
    "color": theme.palette.common.white,
  },
  title: {
    "margin": "auto",
    "textAlign": "center",
    "padding": "5px",
  }
}));

export const Header: React.FC<Props> = ({toggleDrawer}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const classes = useStyles();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root}>
        <Button style={{"float": "left"}} onClick={toggleDrawer}>
          <IconButton aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Button>
        <Typography className={classes.title} variant="h4">PCMM PAT Probability Calculation</Typography>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
          <Avatar />
        </Button>
        <Menu
          id="user"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    </AppBar>
  );
}
