import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sorted_by_start_time } from '/lib/common';

export default function pastSlots() {
    const router = useRouter();
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        async function fetchSlots() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots/past`)
            const data = await resp.json()
            setSlots(sorted_by_start_time(data))
        }
        fetchSlots()
    }, [router.isReady]);
    return (<main>
        <h3>Past sessions</h3>
        <ul>
            {slots.map(e => <li key={e.id}>Start time: {e.start_time}<br/>Status: {e.status}<br/>Student name: {e.student?.name}<br/>Student phone: {e.student?.phone}<br/><Link href={`/coaches/${router.query.coachId}/slots/${e.id}`}>View</Link></li>)}
        </ul>
        <Link href={`/coaches/${router.query.coachId}`}>Back to coach home</Link>
    </main>);
}