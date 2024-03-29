import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import translateData from '@/utils/translateData';

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
				const user = await getUser(authID);
				if(!user) {
					console.log('no user found')
					return null;
				};
				
				return {
						id: authID,
						name: user?.NAME,
						role: user?.WEBGROUPNAME
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			
			if(user) {
				token.role = user.role,
				token.id = user.id,
				token.name = user.name
			}

			return token;
		},
		async session({ session, token }) {
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



async function getUser(clientID) {
	try {
		const response = await fetch(`https://dglocal.oncloud.gr/s1services/JS/Production/calls.getUser`, {
			method: 'POST',
			body: JSON.stringify({
				clientID: clientID
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const buffer = await translateData(response);
		return buffer[0];
	} catch (e) {
		return null;
	}
}