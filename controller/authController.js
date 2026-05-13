import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js'
import links from '../data/links.js'

async function user(req, res) {
	const { username, password, firstname, lastname } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			username: username,
			password: hashedPassword,
			firstname: firstname,
			lastname: lastname,
		},
	});
	res.redirect('/');
}

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
}

async function logout(req, res, next) {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/')
	})
}




export { user, login, logout };
