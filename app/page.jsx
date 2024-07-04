import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to Watch List
        </h1>
        <p className="text-white mb-6">
          Your personal space to curate and manage a wishlist of your favourite
          watches. Sign in to create, view, edit, and delete watches from your
          wishlist.
        </p>
        <AuthForm />
      </div>
    </div>
  );
}
