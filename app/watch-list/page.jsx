import { cookies } from "next/headers";
import EditWatch from "../components/EditWatch";
import WatchForm from "../components/WatchForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteWatch } from "../server-actions/deleteWatch";

export default async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  const { data: watches, error } = await supabase
    .from("watches")
    .select("*")
    .eq("user_id", user.id)
    .order("when_todo", { ascending: true });

  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Watch List</h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </form>
        </div>
        <WatchForm />
        <div className="mt-6">
          {watches.length === 0 ? (
            <p className="text-center text-gray-500">
              No watches in your list. Add some!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {watches.map((watch) => (
                <div
                  key={watch.id}
                  className="bg-white shadow-md rounded-lg p-4 border"
                >
                  <h2 className="text-2xl font-semibold text-gray-700">
                    {watch.brand}
                  </h2>
                  <p className="text-gray-600">
                    When To Do: {new Date(watch.when_todo).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <form
                      action={deleteWatch}
                      method="post"
                      className="flex-grow"
                    >
                      <input type="hidden" name="id" value={watch.id} />
                      <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </form>
                    <EditWatch watch={watch} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
