import { Link } from 'react-router-dom'

export default function ProfileList({ items }) {
  return (
    <ul className="flex flex-col items-center gap-4">
      {items?.map((item) => (
        <li key={item.login} className="w-full max-w-sm">
          <Link
            to={`/profile/${item.login}`}
            className="flex items-center gap-4 rounded-lg border border-slate-500 bg-slate-200 p-4 shadow-sm transition-colors hover:bg-slate-300"
          >
            <img
              src={item.avatar_url}
              alt={`Avatar de ${item.login}`}
              className="h-14 w-14 rounded-full"
              loading="lazy"
            />
            <span className="text-lg font-semibold text-slate-900">
              {item.login}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
