import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';


export const authOptions = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { password, username } = credentials;
				const clientID = await softoneLogin(password, username)
				if (!clientID) return null;
				const authID = await softoneAuthenticate(clientID);
				if (!authID) return null;
				return {
						id: authID,
						name: 'giannis',
						role: 'test user'
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log('user')
			console.log(user)
			if(user) {
				token.role = user.role,
				token.id = user.id,
				token.name = user.name
			}

			return token;
		},
		async session({ session, token }) {
			console.log('token')
			console.log(token)
			session.user = {
				id: token.id,
				name: token.name,
				role: token.role,
			}
			return session;
		},
	},
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




async function softoneLogin(password, username) {
	try {
		const { data } = await axios.post(`${process.env.SOFT_URL}`, {
			SERVICE: "Login",
			USERNAME: username.trim(),
			PASSWORD: password.trim(),
			APPID: "1001"

		})

		return data.clientID;
	} catch (e) {
		return null;
	}
}

async function softoneAuthenticate(clientID) {
	try {
		const { data } = await axios.post(`${process.env.SOFT_URL}`, {
			service: "authenticate",
			clientID: clientID,
			COMPANY: "1001",
			BRANCH: "1000",
			MODULE: "0",
			REFID: "262"
		})
		return data.clientID;
	} catch (e) {
		return null;
	}


}