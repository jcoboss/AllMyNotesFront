import React, { useEffect } from 'react';

import {
  CardActions,
  CardContent,
  TextField,
  makeStyles,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
  Icon,
  Button,
  Chip,
  Paper,
} from '@material-ui/core';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MoreVert } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

import CircularProgress from '@material-ui/core/CircularProgress';

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '50%',
    margin: 'auto',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  form: {
    flexGrow: 1,
  },
  button: {
    marginLeft: 'auto',
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  tags: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
}));

const CreateNote = ({
  user,
  noteToEdit,
  setNotes,
  updateNote,
  setNoteToEdit,
}) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [chipData, setChipData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  //linkLabel
  const [linkData, setLinkData] = React.useState([{}]);

  const [loading, setLoading] = React.useState();

  useEffect(() => {
    const allUsers = [
      {
        id: 1,
        label: 'Enmanuel Magallanes',
      },
      {
        id: 2,
        label: 'Juan Pablo Escobar',
      },
      {
        id: 3,
        label: 'Josue Cobos',
      },
      {
        id: 4,
        label: 'Andres Vargas',
      },
    ];
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setChipData(
        noteToEdit.tags.map((tag) => {
          return { key: Math.random(), label: capitalize(tag) };
        })
      );
      setUsers(allUsers.filter((user) => noteToEdit.shared.includes(user.id)));
    }
  }, [noteToEdit]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  const clearData = () => {
    setTitle('');
    setContent('');
    setTag('');
    setChipData([]);
    setUsers([]);
    setNoteToEdit(undefined);
  };

  const handleUpdate = () => {
    let body = {
      title: capitalize(title),
      content,
      tags: chipData.map((chip) => chip.label),
      shared: users.map((user) => user.id),
    };
    updateNote(body);
    clearData();
  };

  const createNote = () => {
    setLoading(true);
    const payload = {
      authorId: user.id,
      authorName: user.name,
      title: capitalize(title),
      content,
      tags: chipData.map((chip) => chip.label),
      shared: users.map((user) => user.id),
      links: linkData,
    };
    return fetch(`http://localhost:5000/note/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 'Ok') {
          setNotes((prev) => [response.note, ...prev]);
        }
        console.log(response.note);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={noteToEdit ? 'Edit note' : 'Publish note'}
        subheader={user.name}
      />
      <CardContent className={classes.form}>
        <Grid
          className={classes.form}
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              error={false}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="content"
              label="Content"
              value={content}
              multiline
              fullWidth
              minRows={5}
              variant="outlined"
              onChange={(event) => setContent(event.target.value)}
              error={false}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              {linkData.map((data, idx) => (
                <React.Fragment key={`t-${idx}`}>
                  <Grid item xs={4}>
                    <TextField
                      id="label"
                      size="small"
                      label="Link text"
                      fullWidth
                      value={data?.label}
                      onChange={(event) => {
                        linkData[idx].label = event.target.value;
                        setLinkData([...linkData]);
                      }}
                      error={false}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="url"
                      size="small"
                      fullWidth
                      label="Link"
                      value={data?.url}
                      onChange={(event) => {
                        linkData[idx].url = event.target.value;
                        setLinkData([...linkData]);
                      }}
                      error={false}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container item xs={2} direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setLinkData([...linkData, {}])}
                      >
                        <Icon>add</Icon>
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        disabled={idx === 0}
                        variant="contained"
                        color="primary"
                        onClick={() => setLinkData(linkData.filter((_, i) => i !== idx))}
                      >
                        <Icon>delete</Icon>
                      </Button>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  id="tags"
                  size="small"
                  label="Tag"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                  error={false}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setChipData((prev) => [
                      ...prev,
                      {
                        key: Math.random(),
                        label: capitalize(tag),
                      },
                    ]);
                    setTag('');
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {!!chipData?.length && (
            <Grid item xs={12}>
              <Paper component="ul" className={classes.tags} elevation={0}>
                {chipData.map((data) => (
                  <li key={Math.random()}>
                    <Chip
                      label={data.label}
                      onDelete={handleDelete(data)}
                      className={classes.tag}
                    />
                  </li>
                ))}
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Select
              isMulti
              components={animatedComponents}
              placeholder="Type a user name"
              getOptionValue={(option) => option.id}
              value={users}
              onChange={(event) => setUsers(event)}
              options={[
                {
                  id: 1,
                  label: 'Enmanuel Magallanes',
                },
                {
                  id: 2,
                  label: 'Juan Pablo Escobar',
                },
                {
                  id: 3,
                  label: 'Josue Cobos',
                },
                {
                  id: 4,
                  label: 'Andres Vargas',
                },
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {noteToEdit ? (
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={clearData}
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUpdate}
                endIcon={loading ? <CircularProgress /> : <Icon>send</Icon>}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={createNote}
            endIcon={loading ? <CircularProgress /> : <Icon>send</Icon>}
          >
            Send
          </Button>
        )}
      </CardActions>
    </div>
  );
};

export default CreateNote;
