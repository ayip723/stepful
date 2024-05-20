import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const [slots, setSlots] = useState([]);
    const [coach, setCoach] = useState({});
    useEffect(() => {
        if (!router.isReady) return;
        async function fetchSlots() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots/available`)
            const data = await resp.json();
            setSlots(data)
        }
        async function fetchCoach() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}`)
            const data = await resp.json();
            setCoach(data)
        }
        fetchSlots();
        fetchCoach();
    }, [router.isReady])
    return (<main>
        <h3>Coach {coach.name}</h3>
        <ul>
            {slots.map(e => <li key={e.id}><Link href={`/students/${router.query.studentId}/slots/${e.id}`}>{e.start_time}</Link></li>)}
        </ul>
        </main>);
}
