import React from "react";
import Combobox from "./Combobox";
import { IconGlobe, IconBuilding, IconPin, IconReset } from "./Icons";

interface SidebarProps {
  province: string;
  regency: string;
  district: string;
  provinceList: string[];
  regencies: string[];
  districts: string[];
  onProvinceChange: (val: string) => void;
  onRegencyChange: (val: string) => void;
  onDistrictChange: (val: string) => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  province,
  regency,
  district,
  provinceList,
  regencies,
  districts,
  onProvinceChange,
  onRegencyChange,
  onDistrictChange,
  onReset,
}) => {
  return (
    <aside className="w-60.5 min-h-screen bg-white border-r border-slate-100 flex flex-col px-5 py-7 shrink-0">
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 pb-10">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
          <IconGlobe size={15} color="#fff" />
        </div>
        <span className="font-bold text-[14.5px] text-slate-900 tracking-tight leading-tight">
          Frontend Assessment
        </span>
      </div>

      {/* Section heading */}
      <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase pb-5">
        Filter Wilayah
      </p>

      {/* Comboboxes */}
      <Combobox
        label="Provinsi"
        name="province"
        value={province}
        options={provinceList}
        onChange={onProvinceChange}
        placeholder="Pilih Provinsi"
        icon={<IconGlobe size={15} />}
      />

      <Combobox
        label="Kota/Kabupaten"
        name="regency"
        value={regency}
        options={regencies}
        onChange={onRegencyChange}
        placeholder="Pilih Kota/Kab"
        disabled={!province}
        icon={<IconBuilding size={15} />}
      />

      <Combobox
        label="Kecamatan"
        name="district"
        value={district}
        options={districts}
        onChange={onDistrictChange}
        placeholder="Pilih Kecamatan"
        disabled={!regency}
        icon={<IconPin size={15} />}
      />

      {/* Reset button */}
      <div className="pt-6">
        <button
          onClick={onReset}
          className="pt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-[11px] font-bold tracking-widest text-slate-500 uppercase transition-all duration-150 hover:border-blue-300 hover:text-blue-500 cursor-pointer"
        >
          <IconReset />
          Reset
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
