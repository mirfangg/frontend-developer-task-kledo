import { useState } from "react";
import Breadcrumb from "./components/Breadcrumb";
import Sidebar from "./components/Sidebar";
import { IconArrowDown } from "./components/Icons";
import { provinceList, getRegencies, getDistricts } from "./data/region";

interface RegionBlockItemProps {
  sublabel: string;
  name: string;
  animClass: string;
  fontSize: string;
}

const RegionBlockItem: React.FC<RegionBlockItemProps> = ({
  sublabel,
  name,
  animClass,
  fontSize,
}) => (
  <div className={`text-center ${animClass}`}>
    <p className="text-[10px] font-bold tracking-[0.2em] text-[#7ab3d8] uppercase pb-2.5">
      {sublabel}
    </p>
    <p
      className="font-display font-black text-[#0d1c2e] leading-[1.03] m-0"
      style={{ fontSize }}
    >
      {name}
    </p>
  </div>
);

export default function FilterPage() {
  const [province, setProvince] = useState<string>("Bali");
  const [regency, setRegency] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const regencies: string[] = getRegencies(province);
  const districts: string[] = getDistricts(province, regency);

  const handleProvinceChange = (val: string): void => {
    setProvince(val);
    setRegency("");
    setDistrict("");
  };

  const handleRegencyChange = (val: string): void => {
    setRegency(val);
    setDistrict("");
  };

  const handleResetFilter = (): void => {
    setRegency("");
    setDistrict("");
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#f3f6f9]">
        {/* ── Sidebar ── */}
        <Sidebar
          province={province}
          regency={regency}
          district={district}
          provinceList={provinceList}
          regencies={regencies}
          districts={districts}
          onProvinceChange={handleProvinceChange}
          onRegencyChange={handleRegencyChange}
          onDistrictChange={setDistrict}
          onReset={handleResetFilter}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Breadcrumb */}
          <Breadcrumb
            province={province}
            regency={regency}
            district={district}
          />

          {/* Main content */}
          <main className="flex-1 flex flex-col items-center justify-center px-12 py-16">
            <div className="flex flex-col items-center gap-y-8">
              {/* Province */}
              <RegionBlockItem
                sublabel="Provinsi"
                name={province}
                animClass="au-0"
                fontSize="clamp(40px, 5.8vw, 72px)"
              />

              {/* Regency */}
              {regency && (
                <>
                  <div className="my-7 au-f">
                    <IconArrowDown />
                  </div>
                  <RegionBlockItem
                    sublabel="Kota / Kabupaten"
                    name={regency}
                    animClass="au-1"
                    fontSize="clamp(34px, 4.8vw, 60px)"
                  />
                </>
              )}

              {/* District */}
              {district && (
                <>
                  <div className="my-7 au-f">
                    <IconArrowDown />
                  </div>
                  <RegionBlockItem
                    sublabel="Kecamatan"
                    name={district}
                    animClass="au-2"
                    fontSize="clamp(28px, 3.8vw, 50px)"
                  />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
