import { Bell, Moon, Search, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-9">

      <p className="font-medium">{t("Welcome!")}</p>

      <div className="flex items-center gap-5">



        <Bell size={20} className="cursor-pointer" />
        <Moon size={20} className="cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Globe size={16} />
              {i18n.language.toUpperCase()}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('tr')}>
              Türkçe
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#002b66] text-white font-bold">
            AD
          </div>
          <span className="font-semibold">{t("Admin")}</span>
          <ChevronDown size={16} />
        </div>

      </div>
    </header>
  );
}