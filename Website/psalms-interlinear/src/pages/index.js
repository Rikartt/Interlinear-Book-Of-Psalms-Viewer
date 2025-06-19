import Link from 'next/link';

export default function Home() {
  const psalms = Array.from({length: 150}, (_, i) => i + 1)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book of Psalms</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {psalms.map((n) => (
          <li key={n}>
            <Link href={`/psalms/${n}`}>
              <div className="block border p-2 rounded hover:bg-gray-100">
                Psalm {n}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}