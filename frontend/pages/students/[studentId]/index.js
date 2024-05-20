import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [student, setStudent] = useState({});
    useEffect(() => {
        if (!router.isReady) return;
        async function fetchStudent() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${router.query.studentId}`);
            const data = await resp.json();
            setStudent(data);
        }
        fetchStudent();
    }, [router.isReady]);
    return (<main>
        <h3>Hello, {student.name}!</h3>
        <Link href={`/students/${router.query.studentId}/slots`}>Upcomming sessions</Link>
        <br/>
        <Link href={`/students/${router.query.studentId}/coaches`}>Browse coaches</Link>
        <br/>
        <Link href="/">Home</Link>
    </main>);
}
