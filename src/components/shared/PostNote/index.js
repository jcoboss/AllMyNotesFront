import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { deepPurple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '50%',
    margin: 'auto'
  },
  avatar: {
    backgroundColor: deepPurple[500],
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  tagsList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    overflow: 'auto'
  }
}));

const data = {
  title: "Unknow title",
  authorId: -1,
  authorName: "Unknow author name",
  content: "Empty note",
  tags: [],
  shared: []
}

function RecipeReviewCard(props) {

  const { title, authorName, content, tags,
    setNoteToEdit, setNoteToDelete, note,
    createdAt, links, user, likes, setNotes } = props;
  const classes = useStyles();
  const [liked, setLiked] = React.useState(likes ? likes.includes(user.id) : false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const updateNote = async (body) => {
    let payload = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    let response = await fetch(`http://localhost:5000/note/${note.noteId}`, payload)
    response = await response.json()
    setNotes(prevNotes => prevNotes.map(n => n.noteId === note.noteId ? response.updatedNote : n))
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLikeClick = () => {
    if (liked) {
      updateNote({
        likes: likes.filter(id => id !== user.id)
      });
    } else {
      updateNote({
        likes: [...likes, user.id]
      });
    }
    setLiked(!liked);
  };

  const handleDelete = () => {
    setNoteToDelete(note)
    handleClose()
  }
  const handleEdit = () => {
    setNoteToEdit(note)
    handleClose()
  }
  console.log(title, links);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              authorName.charAt(0)
            }
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={title}
        subheader={
          <div>
            <div>{authorName}</div>
            <div>{new Date(createdAt.seconds * 1000).toLocaleString()}</div>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            content
          }
        </Typography>
        <div>
          {
            links &&
            !!links.length &&
            <div >
              {
                'Enlaces: '
              }
              {
                links.map((l, i) => (
                  <a key={`${i}`} rel="noreferrer" style={{ marginRight: '10px' }} href={l.url} target="_blank">{l.label}</a>
                ))
              }
            </div>
          }
        </div>
      </CardContent>
      <CardActions disableSpacing>
        {
          <ul className={classes.tagsList}>
            {
              tags?.map((t, i) => (
                <li key={`${i}`}>
                  <Chip
                    label={t}
                    className={classes.chip}
                  />
                </li>
              )
              )
            }
          </ul>
        }
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={handleLikeClick}
          aria-label="add to favorites"
        >
          <Badge badgeContent={likes.length} color={liked ? "primary" : "default"}>
            <FavoriteIcon color={liked ? 'primary' : 'action'} />
          </Badge>
        </IconButton>
      </CardActions>
    </Card >
  );
}
RecipeReviewCard.defaultProps = data;
export default RecipeReviewCard;