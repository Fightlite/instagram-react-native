import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { SignedInStack, SignedOutStack } from './navigation'

const AuthNavigation = () => {
    const [ currentUser, setCurrentUser ] = useState(null)

    useEffect(() => {
        // add Firebase listeners for signin/signout
        const unsubscribe = auth.onAuthStateChanged(user => user ? setCurrentUser(user) : setCurrentUser(null))

        return unsubscribe
    }, [])

    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    )
}

export default AuthNavigation
