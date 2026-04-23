import { createClient } from "@/lib/supabase/server";
import DataSiswaClient from "./DataSiswaClient";

export default async function DataSiswaPage() {
  const supabase = await createClient();

  const { data: siswaList } = await supabase
    .from("siswa")
    .select("*, ortu:profiles!siswa_ortu_id_fkey(id, full_name, phone)")
    .order("nama");

  // All orang tua profiles (for linking)
  const { data: ortuList } = await supabase
    .from("profiles")
    .select("id, full_name, phone")
    .eq("role", "ortu")
    .order("full_name");

  return <DataSiswaClient siswaList={siswaList ?? []} ortuList={ortuList ?? []} />;
}
