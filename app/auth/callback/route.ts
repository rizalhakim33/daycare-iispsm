import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
      const role = profile?.role ?? "ortu";
      return NextResponse.redirect(`${origin}/${role === "guru" ? "guru" : "ortu"}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
