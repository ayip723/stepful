import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function StudentSlots() {
    const [slots, setSlots] = useState([]);
    const router = useRouter();
    useEffect(() => {
        async function fetchSlots() {
            if (!router.isReady) return;
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${router.query.studentId}/slots/upcoming`);
            const data = await resp.json();
            setSlots(data);
        }
        fetchSlots();
    }, [router.isReady]);
    return (<main>
        <h3>My Upcoming Sessions</h3>
        <ul>
            {slots.map(e => <li key={e.id}><div>Time: {e.start_time}<br/>Coach: {e.coach.name}<br/>Phone: {e.coach.phone}</div></li>)}
        </ul>
        <Link href={`/students/${router.query.studentId}`}>Back to student home</Link>

    </main>);
}
