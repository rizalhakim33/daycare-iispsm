import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (user) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  
  const role = profile?.role;

  // Kalau role kosong, paksa logout
  if (!role) {
    return NextResponse.redirect(new URL("/login?error=no_role", request.url));
  }

  // Redirect dari root
  if (pathname === "/") {
    if (role === "guru") return NextResponse.redirect(new URL("/guru/dashboard", request.url));
    if (role === "ortu") return NextResponse.redirect(new URL("/ortu/dashboard", request.url));
  }

  // Sudah login tapi ke /login
  if (pathname === "/login") {
    if (role === "guru") return NextResponse.redirect(new URL("/guru/dashboard", request.url));
    if (role === "ortu") return NextResponse.redirect(new URL("/ortu/dashboard", request.url));
  }

  // Guru mencoba akses halaman ortu
  if (pathname.startsWith("/ortu") && role === "guru") {
    return NextResponse.redirect(new URL("/guru/dashboard", request.url));
  }

  // Ortu mencoba akses halaman guru
  if (pathname.startsWith("/guru") && role === "ortu") {
    return NextResponse.redirect(new URL("/ortu/dashboard", request.url));
  }
}

return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
