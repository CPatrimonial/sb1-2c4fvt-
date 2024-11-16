"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContentSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentSearch({ value, onChange }: ContentSearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Pesquisar conteúdo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}