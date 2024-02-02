'use client';

function Error({ error }: { error: Error }) {
  return (
    <main className="error">
      <h1>An error occured !</h1>
      <p>{error.message}</p>
    </main>
  );
}

export default Error;
