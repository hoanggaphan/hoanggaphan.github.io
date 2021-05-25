import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getLastWord } from 'helpers/string';
import { useAuth } from 'hooks/use-auth';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommentHeader from './CommentHeader';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    input: {
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      },
      '&:after': {
        borderBottom: '2.5px solid black',
      },
      '& input': {
        fontSize: '14px',
        paddingTop: '0',
      },
    },
    btnText: {
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    btnPrimary: {
      transition: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    loader: {
      margin: '24px auto 0',
      width: 'fit-content',
    },
  });
});

export default function CommentPost({
  onPostComment,
}: {
  onPostComment: (text: string) => void;
}) {
  const classes = useStyles();
  const { user } = useAuth();
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [adding, setAdding] = React.useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.currentTarget.value);
  };

  const handleClick = async () => {
    try {
      setAdding(true);
      await onPostComment(value);
    } finally {
      setValue('');
      setShow(false);
      setAdding(false);
    }
  };

  const handleFocus = () => {
    if (!show) {
      setShow(true);
    }
  };

  const handleHide = () => {
    setShow(false);
    setValue('');
  };

  return (
    <Box mt='24px' mb='32px'>
      <CommentHeader />
      {adding ? (
        <div className={classes.loader}>
          <CircularProgress size={30} color='inherit' />
        </div>
      ) : (
        <Box display='flex'>
          <Box mr='16px'>
            <Avatar src={user?.imgUrl}>
              {user && getLastWord(user.firstName).charAt(0)}
            </Avatar>
          </Box>

          <Box width='100%'>
            <Input
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              className={classes.input}
              placeholder='Bình luẩn công khai...'
              multiline
              fullWidth
            />

            {show && (
              <Box
                mt='8px'
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
              >
                <Box mr='7px'>
                  <Button
                    onClick={handleHide}
                    className={classes.btnText}
                    disableElevation
                    disableRipple
                  >
                    Hủy
                  </Button>
                </Box>

                <Button
                  onClick={handleClick}
                  disabled={value ? false : true}
                  className={classes.btnPrimary}
                  color='primary'
                  variant='contained'
                  disableElevation
                  disableRipple
                >
                  Bình luận
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}