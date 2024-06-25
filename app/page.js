import GoogleMap from "./components/GoogleMap";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 background relative'>
			<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
				<p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
					<code className='font-mono font-bold'>TOP LEFT</code>
				</p>
				<div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
					<a
						className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
						href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'>
						TOP RIGHT
					</a>
				</div>
			</div>

			<div className='relative flex flex-row place-items-center'>
				<div className='w-1/2 h-full bg-gray-200'>Left</div>
				<div className='w-1/2 h-full bg-gray-400'>
					<GoogleMap />
				</div>
			</div>

			<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center'>
				<a
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						BOTTOM 1{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						BOTTOM SUBHEADER
					</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						BOTTOM 2{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						BOTTOM SUBHEADER
					</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						BOTTOM 3{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						BOTTOM SUBHEADER
					</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						BOTTOM 4{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
						BOTTOM SUBHEADER
					</p>
				</a>
			</div>
		</main>
	);
}
