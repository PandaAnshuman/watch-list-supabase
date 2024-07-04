"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <div className="w-full">
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo="http://localhost:3000/auth/callback"
        appearance={{
          theme: "dark",
          classNames: {
            container: "space-y-4",
            label: "block text-sm font-medium text-gray-700",
            button:
              "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full",
            input:
              "w-full p-3 bg-gray-100 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
            message: "text-red-500 text-sm",
          },
        }}
      />
    </div>
  );
}
