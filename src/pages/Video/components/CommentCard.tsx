import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormattedString from 'components/FormattedString';
import { formatDateView, formatLikeCount } from 'helpers/format';
import { getLastWord } from 'helpers/string';
import React from 'react';
import Collapsed from './Collapsed';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LazyLoad from 'react-lazyload';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    btnMore: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: theme.palette.grey[600],
    },
    actionIconBtn: {
      padding: '8px',
    },
    actionIconBtnML: {
      marginLeft: '-8px',
    },
    actionIcon: {
      fontSize: '16px',
    },
    actionText: {
      padding: '8px 16px',
      cursor: 'pointer',

      lineHeight: 1,
      fontSize: '13px',
      fontWeight: 'bold',
      color: theme.palette.grey[600],
    },
    actionLike: {
      marginRight: '8px',
    },
    colorPrimary: {
      color: theme.palette.primary.main,
    },
  });
});

const StyledBtn = ({ text }: { text: string }) => {
  const classes = useStyles();

  return (
    <Link className={classes.btnMore} component='button' color='inherit'>
      {text}
    </Link>
  );
};

export default function CommentCard({
  item,
  player,
  size = 40,
}: {
  item: any;
  player?: any;
  size?: number;
}): JSX.Element {
  const classes = useStyles();
  const snippet = item.snippet.topLevelComment?.snippet || item.snippet; // use for comment or sub comment

  return (
    <Box display='flex'>
      <Box mr='16px'>
        <LazyLoad
          placeholder={<Skeleton variant='circle' width={size} height={size} />}
          once
          offset={400}
        >
          <Avatar
            component={Box}
            width={size}
            height={size}
            src={snippet.authorProfileImageUrl}
          >
            {getLastWord(snippet.authorDisplayName).charAt(0)}
          </Avatar>
        </LazyLoad>
      </Box>

      <Box>
        <Box display='flex'>
          <Typography variant='subtitle2' component='span'>
            {snippet.authorDisplayName}
          </Typography>
          <Box ml='5px'>
            <Typography variant='caption'>
              {formatDateView(snippet.publishedAt)}
            </Typography>
          </Box>
        </Box>

        <Collapsed
          height={80}
          BtnEx={<StyledBtn text='Đọc thêm' />}
          BtnCol={<StyledBtn text='Ản bớt' />}
          showBtnCol
        >
          <FormattedString str={snippet.textDisplay} player={player} />
        </Collapsed>

        <Box mt='4px' display='flex' alignItems='center'>
          {snippet.viewerRating === 'like' ? (
            <IconButton
              color='primary'
              className={`${classes.actionIconBtn} ${classes.actionIconBtnML}`}
            >
              <ThumbUpIcon className={classes.actionIcon} />
            </IconButton>
          ) : (
            <IconButton
              className={`${classes.actionIconBtn} ${classes.actionIconBtnML}`}
            >
              <ThumbUpIcon className={classes.actionIcon} />
            </IconButton>
          )}

          {snippet.likeCount > 0 && (
            <Typography
              variant='caption'
              className={`${classes.actionLike} ${
                snippet.viewerRating === 'like' && classes.colorPrimary
              }`}
            >
              {formatLikeCount(snippet.likeCount)}
            </Typography>
          )}

          {snippet.viewerRating === 'dislike' ? (
            <IconButton color='primary' className={classes.actionIconBtn}>
              <ThumbDownIcon className={classes.actionIcon} />
            </IconButton>
          ) : (
            <IconButton className={classes.actionIconBtn}>
              <ThumbDownIcon className={classes.actionIcon} />
            </IconButton>
          )}

          <Typography variant='button' className={classes.actionText}>
            Phản hồi
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
