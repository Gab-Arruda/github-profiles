import { useParams } from 'react-router-dom';

export default function Profile() {
  const { username } = useParams();

  return (
    <main className="px-6 py-6">
      <div>
        <h1>Profile: {username}</h1>
      </div>
    </main>
  );
}
