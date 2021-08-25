import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostNote from '../shared/PostNote';
import CreateNote from './createNote';
import { orderBy } from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  centered: {},
}));

const Home = (props) => {
  const { user } = props;
  const classes = useStyles();
  const [notes, setNotes] = React.useState([]);
  const [noteToEdit, setNoteToEdit] = React.useState(undefined)
  const [noteToDelete, setNoteToDelete] = React.useState(undefined)

  useEffect(() => {
    fetch(`http://localhost:5000/note/`)
      .then((response) => response.json())
      .then((data) => setNotes(orderBy(data.notes, (n) => n.createdAt.seconds, 'desc')));
  }, []);

  useEffect(() => {
    const deleteNote = async () => {
      let payload = {
        method: "DELETE"
      }
      let response = await fetch(`http://localhost:5000/note/${noteToDelete.noteId}`, payload)
      await response.json()
      setNotes(prevNotes => prevNotes.filter(note => note.noteId !== noteToDelete.noteId))
      setNoteToDelete(undefined)
    }
    if (noteToDelete) {
      deleteNote()
    }
  }, [noteToDelete])

  const updateNote = async (body) => {
    let payload = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    let response = await fetch(`http://localhost:5000/note/${noteToEdit.noteId}`, payload)
    response = await response.json()
    setNotes(prevNotes => prevNotes.map(note => note.noteId === noteToEdit.noteId ? response.updatedNote: note))
    setNoteToEdit(undefined)
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Grid
          // direction="column"
          justifyContent="center"
          alignItems="center"
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h3"
              style={{ textAlign: 'center' }}
            >
              All my notes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CreateNote user={user} noteToEdit={noteToEdit} setNotes={setNotes} updateNote={updateNote} setNoteToEdit={setNoteToEdit} />
          </Grid>
          {notes &&
            !!notes.length &&
            notes.map((n) => (
              <Grid key={`${Math.random()}`} item xs={12}>
                <PostNote {...n} note={n} setNoteToEdit={setNoteToEdit} setNoteToDelete={setNoteToDelete} />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
};
Home.defaultProps = { user: { id: 1, admin: true, name: 'Enmanuel Magallanes' } };
export default Home;
