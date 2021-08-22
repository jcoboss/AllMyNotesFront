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
  const { title, authorName, content, tags} = props;
  const classes = useStyles();
  const [liked, setLiked] = React.useState(false);
  
  const handleLikeClick = () => {
    setLiked(!liked);
  };

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={authorName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            content
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          <ul className={classes.tagsList}>
            {
              tags?.map((t,i) => (
                <li key={toString(i)}>
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