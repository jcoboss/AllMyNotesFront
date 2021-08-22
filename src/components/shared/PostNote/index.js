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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '65%',
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
  theme: "Apuntes de cálculo",
  authorName: "Josue Cobos",
  noteBody: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  tagsArray: [
    {
      id: 0,
      name: 'cálculo'
    },
    {
      id: 2,
      name: 'matemática'
    },
    {
      id: 3,
      name: 'note'
    },
    {
      id: 4,
      name: 'examen'
    }
  ],
  liked: false
}

function RecipeReviewCard(props) {
  const { theme, authorName, noteBody, tagsArray} = props;
  const classes = useStyles();
  const [liked, setLiked] = React.useState(props.liked);
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {authorName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={theme}
        subheader={authorName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            noteBody
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          <ul className={classes.tagsList}>
            {
              tagsArray?.map(t => (
                <li key={toString(t.id)}>
                  <Chip
                    label={t.name}
                    className={classes.chip}
                  />
                </li>
                )
              )
            }
          </ul>
        }
        <IconButton 
          style={{marginLeft: 'auto'}}
          onClick={handleLikeClick}
          aria-label="add to favorites">
          <FavoriteIcon color={liked ? 'primary': 'action'}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
RecipeReviewCard.defaultProps=data;
export default RecipeReviewCard;