import { provinceList, getRegencies, getDistricts } from "./data/region";

export async function regionLoader({ request }: any) {
  const url = new URL(request.url);
  const province = url.searchParams.get("province") || "";
  const regency = url.searchParams.get("regency") || "";
  const district = url.searchParams.get("district") || "";

  const regencies = province ? getRegencies(province) : [];
  const districts = province && regency ? getDistricts(province, regency) : [];

  // Validate that stored values still exist in data
  const validRegency = regencies.includes(regency) ? regency : "";
  const validDistrict = districts.includes(district) ? district : "";

  return {
    provinceList,
    province,
    regency: validRegency,
    district: validDistrict,
    regencies,
    districts: validRegency ? getDistricts(province, validRegency) : [],
  };
}
