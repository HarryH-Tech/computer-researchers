import User from './user-schema';
import jwt from 'jsonwebtoken';

// REGISTER
export const register = async (req: any, res: any) => {
  console.log(req.body);

  const { email } = req.body.formDetails;
  await User.findOne({ email }, (err: any, user: any) => {
    if (user) {
      return res.json({
        errorType: 'duplicate email',
        message: `Account with email: ${email} already exists.`,
        success: false,
      });
    } else {
      const newUser = new User(req.body.formDetails);

      newUser.save((error: any, user: any) => {
        if (error) {
          return res.status(400).json({
            error,
            message:
              'Sorry there was a problem creating the account, please try again. ',
            success: false,
          });
        } else {
          res.json({
            user,
            message: 'Account created 😀',
            success: true,
          });
        }
      });
    }
  });
};

// LOGIN
export const attemptLogin = async (req: any, res: any) => {
  const { email } = req.body.loginUserDetails;
  await User.findOne({ email }, (err: any, user: any) => {
    if (!user) {
      return res.json({
        error: 'User with that email does not exist.',
      });
    }

    if (err) {
      return res.json({ error: err.message });
    }

    //If User found ensure email and password match
    if (!user.authenticate(req.body.loginUserDetails.password)) {
      return res.json({
        error: 'Wrong email/password combination.',
      });
    } else {
      //Create a sign in token with user id and secret
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET!
      );
      res.cookie('t', token);
      return res.json({ token, user });
    }
  });
};

// LOGOUT
export const signOut = (req: any, res: any) => {
  res.clearCookie('t');
  res.json({ message: 'Signout Successful' });
};
