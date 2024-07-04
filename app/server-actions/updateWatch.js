"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
export async function updateWatch(formData) {
  const id = formData.get("id");

  const brand = formData.get("brand");
  const when_todo = formData.get("when_todo");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error(
      "User is Not authenticated within Update Watch server action"
    );
    return;
  }
  const { data, error } = await supabase
    .from("watches")
    .update({ brand, when_todo })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error Updating data", error);
    return;
  }
  revalidatePath("/watch-list");
  return { message: "Success" };
}
