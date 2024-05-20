import Link from 'next/link';
import { useRouter } from 'next/router';
// Upcoming slots
// All slots
// New slot
export default function Coach() {
    const router = useRouter();
    return (<main>
        <h3>Hello Coach {router.query.coachId}!</h3>
        <Link href={`/coaches/${router.query.coachId}/slots`}>Upcoming slots</Link>
        <br/>
        <Link href={`/coaches/${router.query.coachId}/slots/past`}>Past slots</Link>
        <br/>
        <Link href="/">Home</Link>
        </main>);
}