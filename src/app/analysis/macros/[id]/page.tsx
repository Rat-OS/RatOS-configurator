'use client';
import { useRouter } from 'next/navigation';

export default function MacroPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	router.replace(`/analysis/macros/${params.id}/recordings`);
}
