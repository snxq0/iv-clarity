import { supabase } from "../lib/supabaseClient";

export function useRepairs() {

  const getRepairs = async () => {
    return await supabase
      .from("repairs")
      .select("*")
      .order("updated_at", { ascending: false });
  };

  const getRepairById = async (id) => {
    return await supabase
      .from("repairs")
      .select("*")
      .eq("id", id)
      .single();
  };

  const getRepairByPublicId = async (public_id) => {
    return await supabase
      .from("repairs")
      .select("device, status, updated_at, estimated_completion")
      .eq("public_id", public_id)
      .single();
  };

  const createRepair = async (repair) => {
    return await supabase
      .from("repairs")
      .insert(repair);
  };

  const updateRepair = async (id, status, estimated_completion) => {
    // 1️⃣ Обновляем основную запись
    const { error } = await supabase
      .from("repairs")
      .update({
        status,
        estimated_completion,
        updated_at: new Date()
      })
      .eq("id", id);

    if (error) return { error };

    // 2️⃣ Добавляем запись в историю
    await supabase
      .from("repair_history")
      .insert({
        repair_id: id,
        status
      });

    
    return { error: null };
  };

  const getHistory = async (repair_id) => {
    return await supabase
      .from("repair_history")
      .select("*")
      .eq("repair_id", repair_id)
      .order("created_at", { ascending: false });
  };

  return {
    getRepairs,
    getRepairById,
    getRepairByPublicId,
    createRepair,
    updateRepair,
    getHistory
  };
}