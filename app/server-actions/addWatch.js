"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
export async function addWatch(formData) {
  const brand = formData.get("brand");
  const when_todo = formData.get("when_todo");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is Not authenticated withing addWatch server action");
    return;
  }
  const { data, error } = await supabase
    .from("watches")
    .insert([{ brand, when_todo, user_id: user.id }]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }
  revalidatePath("/watch-list");
  return { message: "Success" };
}
