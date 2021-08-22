import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostNote from '../shared/PostNote';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  centered: {
  
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            All my notes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PostNote/>
        </Grid>
      </Grid>
    </div>
  )
}
Home.defaultProps={user: 1};
export default Home;