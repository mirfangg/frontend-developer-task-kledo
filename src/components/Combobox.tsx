import React, { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "./Icons";

export interface ComboboxProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder: string;
  disabled?: boolean;
  icon: React.ReactNode;
}

const Combobox: React.FC<ComboboxProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  icon,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = (): void => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (opt: string): void => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className="pb-5">
      <label
        htmlFor={name}
        className="block pb-1.5 text-[10px] font-bold tracking-[0.13em] text-slate-400 uppercase"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="sr-only"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={[
            "w-full flex items-center justify-between gap-2 px-3 py-2.25 rounded-xl text-[13.5px] border-[1.5px] bg-white transition-all duration-150",
            disabled
              ? "border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
              : open
                ? "border-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.18)] cursor-pointer"
                : "border-slate-200 hover:border-slate-300 cursor-pointer",
          ].join(" ")}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span
              className={open && !disabled ? "text-blue-400" : "text-slate-400"}
            >
              {icon}
            </span>
            <span
              className={`truncate font-medium ${value ? "text-slate-800" : "text-slate-400"}`}
            >
              {value || placeholder}
            </span>
          </span>
          <span className="text-slate-400 shrink-0">
            <IconChevronDown rotated={open} />
          </span>
        </button>

        {open && !disabled && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-y-auto py-1"
            style={{ maxHeight: 210 }}
          >
            {options.length === 0 ? (
              <li className="px-4 py-2.5 text-sm text-slate-400 italic">
                Tidak ada data
              </li>
            ) : (
              options.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={opt === value}
                  onClick={() => handleSelect(opt)}
                  className={[
                    "px-4 py-2.5 text-[13px] cursor-pointer transition-colors duration-100",
                    opt === value
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {opt}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Combobox;
