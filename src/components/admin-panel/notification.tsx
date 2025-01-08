"use client";
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { pvtLaraEcho } from '@/lib/echo.config';
import { User } from '@/types';
import { useSession } from 'next-auth/react';

export default function Notification({ user }: { user: User | null }) {
    const session = useSession();
    const token = session.data?.token;
    const id = user?.id;

    useEffect(() => {
        if (token && id) {
            console.log(token, id);
            // Ensure pvtLaraEcho is a function that returns an Echo instance with authentication
            const channel = pvtLaraEcho({ token }).channel(`notifications.${id}`);

            // Listen for events
            channel.listen('NotificationSent', (e: any) => {
                console.log("Event data:", e.data);
                toast.success(`Event received: ${e.data}`);
            });

            // Cleanup the listener when the component unmounts
            return () => {
                channel.stopListening('NotificationSent');
            };
        }
    }, [token, id]);  // Added token and id as dependencies to re-run when either changes

    return (
        <div>
            <h1>Notification</h1>
            <p>This is a notification component</p>
        </div>
    );
}
