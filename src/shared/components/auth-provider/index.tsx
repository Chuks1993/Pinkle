import React, { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUserQuery, useTokenAuthMutation } from 'generated'
import { useQueryClient } from 'react-query'
import { UserCredentials } from 'shared/types'

const authContext = createContext(null)
function setRedirect(redirect: string) {
	window.sessionStorage.setItem(process.env.REDIRECT_KEY, redirect)
}

function getRedirect(): string | null {
	return window.sessionStorage.getItem(process.env.REDIRECT_KEY)
}

function clearRedirect() {
	return window.sessionStorage.getItem(process.env.REDIRECT_KEY)
}
function AuthProvider({ children }) {
	const queryClient = useQueryClient()
	const {
		data: { me } = {},
		isLoading,
		isError,
		isSuccess,
	} = useCurrentUserQuery(null, { retry: false })
	const { push, query } = useRouter()
	const { mutate } = useTokenAuthMutation()

	const login = (userLoginData: UserCredentials) => {
		mutate(userLoginData, {
			onSettled: () => localStorage.removeItem(process.env.ACCESS_TOKEN),
			onSuccess: ({ tokenAuth }) => {
				localStorage.setItem(process.env.ACCESS_TOKEN, tokenAuth.token)
				queryClient.invalidateQueries('Me')
				if (typeof query.next === 'string') {
					push(query.next)
				} else {
					// worked
					push('/')
				}
			},
			onError: () => {
				push('/login')
			},
		})
	}

	const logout = () => {
		localStorage.removeItem(process.env.ACCESS_TOKEN)
		push('/login')
	}

	return (
		<authContext.Provider
			value={{
				login,
				logout,
				isError,
				isSuccess,
				user: me,
				isLoading,
				setRedirect,
				getRedirect,
				clearRedirect,
			}}
		>
			{children}
		</authContext.Provider>
	)
}

const useAuth = () => {
	const context = useContext(authContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
export { useAuth, AuthProvider }

// TODO
// https://github.com/ivandotv/nextjs-client-signin-logic
// https://mahieyin-rahmun.medium.com/how-to-configure-social-authentication-in-a-next-js-next-auth-django-rest-framework-application-cb4c82be137
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#refresh_token_login
