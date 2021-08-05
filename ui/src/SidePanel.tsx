import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Paper, Button, IconButton, List, ListItemText } from '@material-ui/core';
import { Close } from '@material-ui/icons';

type Props = {
  isOpen: boolean,
  toggle: ()=>void
}

const useStyles = makeStyles({
  root: {
    width: "20vw",
  },
  list: {
    display: "block",
    padding: "20px 10px 10px 30px"
  }
});

export const SidePanel: React.FC<Props> = ({isOpen, toggle}) => {
  const classes = useStyles();

  return (
    <Drawer open={isOpen}>
      <Paper className={classes.root} style={{ height: "100vh" }}>
        <Button onClick={toggle}>
          <IconButton aria-label="close menu">
            <Close />
          </IconButton>
        </Button>
        <div className={classes.list}>
          <List>
              <ListItemText>HELP</ListItemText>
              <ListItemText>ABOUT</ListItemText>
              <ListItemText onClick={toggle}>CLOSE</ListItemText>
          </List>
        </div>
      </Paper>
    </Drawer>
  );
}
