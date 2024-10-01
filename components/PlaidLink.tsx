import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        };
        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push("/");
    }, [user]);

    const config: PlaidLinkOptions = {
        onSuccess,
        token,
    };

    const { open, exit, ready } = usePlaidLink(config);

    return (
        <>
            {variant === "primary" ? (
                    <Button
                        onClick={() => open()}
                        disabled={!ready}
                        className="plaidlink-primary"
                    >
                        Connect bank
                    </Button>
                ) : variant === "ghost" ? (
                    <Button className="">
                        Connect bank
                    </Button> 
                ) : (
                    <Button className="">
                        Connect bank
                    </Button>
                )
            }
        </>
    )
}

export default PlaidLink