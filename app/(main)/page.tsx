import { PostSection } from "@/app/(main)/_components/post-section";

export default function HomePage() {
	return (
		<div className="mx-auto max-w-3xl p-4">
			<h1 className="mb-6 text-2xl font-bold">Submission</h1>
			<PostSection />
		</div>
	);
}
