"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
export async function deleteWatch(formData) {
  const watchId = formData.get("id");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error(
      "User is Not authenticated within Delete Watch server action"
    );
    return;
  }
  const { error } = await supabase
    .from("watches")
    .delete()
    .match({ id: watchId, user_id: user.id });

  if (error) {
    console.error("Error Deleting data", error);
    return;
  }
  revalidatePath("/watch-list");
  return { message: "Success" };
}
