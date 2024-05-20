import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const [coaches, setCoaches] = useState([]);
    useEffect(() => {
        async function fetchCoaches() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/`);
            const data = await resp.json();
            setCoaches(data);
        }
        fetchCoaches();
    }, [router.isReady]);
    return (<main>
        <h3>All Coaches</h3>
        <ul>
            {coaches.map(e => <li key={e.id}><Link href={`/students/${router.query.studentId}/coaches/${e.id}`}>{e.name}</Link></li>)}
        </ul>
        <Link href={`/students/${router.query.studentId}`}>Back to student home</Link>
    </main>);
}