import React, { useEffect } from 'react'
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
  const [notes, setNotes] = React.useState([]);

  console.log({notes});

  useEffect(()=>{
    fetch(`http://localhost:5000/note/`)
    .then(response => response.json())
    .then(data => setNotes(data.notes));
  },[])

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="center"
  alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" component="h3" style={{textAlign: 'center'}}>
            All my notes
          </Typography>
        </Grid>
        {
          notes &&
          !!notes.length &&
          notes.map(n => (
            <Grid item xs={12} >
              <PostNote {...n}/>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}
Home.defaultProps={user: 1};
export default Home;