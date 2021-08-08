import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../../app/api/auth-provider'

export function AuthGuard({ children }: { children: JSX.Element }) {
	const { isError, user, isLoading, setRedirect } = useAuth()
	const router = useRouter()
	useEffect(() => {
		if (!isLoading) {
			//auth is initialized and there is no user
			if (!user) {
				// remember the page that user tried to access
				// router.replace('/login?next=' + router.pathname)
				setRedirect(router.route)
				router.push('/login')
			}
		}
	}, [isLoading, router, user, setRedirect])

	/* show loading indicator while the auth provider is still initializing */
	if (isLoading) {
		return <h1>Application Loading</h1>
	}

	// if auth initialized with a valid user show protected page
	if (!isLoading && user) {
		return <>{children}</>
	}

	/* otherwise don't return anything, will do a redirect from useEffect */
	return null
}
