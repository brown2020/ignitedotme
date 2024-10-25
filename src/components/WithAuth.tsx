"use client";

import { Spinner } from '@/app/admin/components/ui/Spinner';
import { Context } from '@/app/context/Context';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
        const { user } = Context();
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (user) {
                setIsAuthorized(user.is_admin);
                setIsLoading(false);

                if (!user.is_admin) {
                    router.push('/admin/unauthorized');
                }
            } else {
                setIsLoading(false);
                router.push('/admin/unauthorized');
            }
        }, [user, router]);

        if (isLoading) {
            return (
                <div className="absolute left-1/2 top-1/2">
                    <Spinner className="h-10 w-10" size={1.5} />
                </div>
            );
        }

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };

    return AuthenticatedComponent;
};

export default WithAuth;
