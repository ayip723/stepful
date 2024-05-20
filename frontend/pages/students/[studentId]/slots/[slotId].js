import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

export default function StudentSlot() {
    const [slot, setSlot] = useState(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchSlot() {
            if (!router.isReady) return;
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slots/${router.query.slotId}`);
            const data = await resp.json();
            setSlot(data);
        }
        fetchSlot();
    }, [router.isReady]);
    
    const take = async (e) => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slots/${router.query.slotId}/take`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({student_id: router.query.studentId})
        });
        if (resp.status === 200) {
            router.push(`/students/${router.query.studentId}/slots/`);
        } else {
            alert(JSON.stringify(data.error));
        }
    }

    return (<main>
        {slot && (<div>
            <div>
                Coach: <Link href={`/students/${router.query.studentId}/coaches/${slot.coach_id}`}>{slot.coach.name}</Link>
                <br/>
                Start time: {slot.start_time}
                <br/>
                <button onClick={take}>Take</button>
                <br/>
                <Link href={`/students/${router.query.studentId}/coaches/${slot.coach_id}`}>Back to coach</Link>
            </div>
        </div>)}
    </main>);
}