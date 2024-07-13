import db from '$lib/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import type { Link } from '../../types/links';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	let alias = params.alias;

	// query firebase
	const querySnapshot = query(collection(db, 'links'), where('alias', '==', alias));
	const querySnapshotData = await getDocs(querySnapshot);

	if (querySnapshotData.size === 0) {
		// redirect to rick roll if no link found
		const rickRollData = await getDoc(doc(db, 'rickrolls', alias));
		await setDoc(
			doc(db, 'rickrolls', alias),
			rickRollData.exists()
				? {
						clicks: rickRollData.data().clicks + 1
					}
				: { clicks: 1 }
		);
		redirect(302, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
	} else {
		// get data
		let linkData = querySnapshotData.docs[0].data() as Link;

		// add 1 to view count
		linkData.views++;
		await setDoc(doc(db, 'links', linkData.uuid), linkData);

		// redirect
		redirect(302, linkData.url);
	}
}
