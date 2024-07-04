import { addWatch } from "../server-actions/addWatch";
export default function WatchForm() {
  return (
    <form action={addWatch} className="space-y-6">
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Movie/Series Name
        </label>
        <input
          type="text"
          name="brand"
          id="brand"
          required
          className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="when_todo"
          className="block text-sm font-medium text-gray-700"
        >
          When to Watch
        </label>
        <input
          type="date"
          id="when_todo"
          name="when_todo"
          required
          className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-300"
      >
        Add Watch
      </button>
    </form>
  );
}
