import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { range } from 'lodash';
import { sorted_by_start_time } from '/lib/common';

export default function Page() {
    const [slots, setSlots] = useState([]);
    const router = useRouter()

    useEffect(() => {
        async function fetchSlots() {
            if (!router.isReady) return;
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots/upcoming`);
            const data = await resp.json();
            setSlots(sorted_by_start_time(data));
        }
        fetchSlots();
    }, [router.isReady]);

    const [formData, setFormData] = useState({date: new Date().toLocaleDateString('en-CA'), time: `10:00`})
    const handleSubmit = async e => {
        e.preventDefault();
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({start_time: `${formData.date}T${formData.time}:00.000z`}),
        });
        const data = await resp.json();
        if (resp.status === 200) {
            setSlots(sorted_by_start_time([...slots, data]))
        } else {
            alert(JSON.stringify(data.error));
        }
    };
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    return (<main>
        <h3>My Sessions</h3>
        <ul>
            {slots.map(e => <li key={e.id}>Start time: {e.start_time}<br/>Status: {e.status === 'taken' ? 'Taken' : 'Open'}<br/>Student name: {e.student?.name}<br/>Student phone: {e.student?.phone}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
            <h3>New Session</h3>
            <label>Date: <input type="date" name="date" value={formData.date} onChange={handleChange}/></label>
            <br/>
            <label>Time: <select name="time" value={formData.time} onChange={handleChange}>
                {range(10, 20, 2).map(e => <option key={e} value={`${e}:00`}>{`${e}:00`}</option>)}
                </select></label>
            <br/>
            <button>Create</button>
        </form>
        <br/>
        <Link href={`/coaches/${router.query.coachId}`}>Back to coach home</Link>
    </main>);
}