import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

export function useIncidentSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("incident.created", () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.info("Yeni incident oluşturuldu.");
    });

    socket.on("incident.updated", () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.info("Incident güncellendi.");
    });

    socket.on("incident.deleted", () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.info("Incident silindi.");
    });

    return () => {
      socket.off("connect");
      socket.off("incident.created");
      socket.off("incident.updated");
      socket.off("incident.deleted");
      socket.disconnect();
    };
  }, [queryClient]);
}