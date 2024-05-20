import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { range } from 'lodash';
import Link from 'next/link';

function CompleteSlot({completeSlot}) {
    // const [satisfaction, setSatisfaction] = useState(null);
    // const [notes, setNotes] = useState(null);
    const [formData, setFormData] = useState({satisfaction: 0, notes: ""})
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const handleSubmit = e => {
        e.preventDefault();
        completeSlot(formData);
    }

    return (<form onSubmit={handleSubmit}>
        <h3>Complete Slot</h3>
        <label>Satisfaction: <select name="satisfaction" value={formData.satisfaction} onChange={handleChange}>
            {range(1, 6).map(e => <option key={e} value={e}>{e}</option>)}
            </select></label>
        <br/>
        <label>Notes:<textarea name="notes" value={formData.notes} onChange={handleChange}></textarea></label>
        <br/>
        <button>Complete</button>
    </form>);
}

export default function CoachSlot() {
    // const router = useRouter();
    // Fetch the slot
    // After finishing update, go to slot index
    const [slot, setSlot] = useState({});
    const router = useRouter();

    const completeSlot = async ({satisfaction, notes}) => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots/${router.query.slotId}/complete`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({satisfaction, notes})
        });
        const data = await resp.json();
        if (resp.status === 200) {
            setSlot(data);
        } else {
            alert(JSON.stringify(data.error));
        }
    };

    useEffect(() => {
        async function fetchSlot() {
            if (!router.isReady) return;
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${router.query.coachId}/slots/${router.query.slotId}`);
            const data = await resp.json();
            setSlot(data);
        }
        fetchSlot();
    }, [router.isReady]);

    return (<main>
        <h3>Session Info</h3>
        <div>Start time: {slot.start_time}</div>
        <div>Coach ID: {slot.coach_id}</div>
        <div>Student ID: {slot.student_id}</div>
        <div>Student name: {slot.student?.name}</div>
        <div>Student phone: {slot.student?.phone}</div>
        <div>Satisfaction: {slot.satisfaction}</div>
        <div>Notes: {slot.notes}</div>
        {slot.status === 'taken' && <CompleteSlot completeSlot={completeSlot}/>}
        <br/>
        <Link href={`/coaches/${router.query.coachId}/slots/past`}>Back to past sessions</Link>
    </main>);
}