export type RegionData = Record<string, Record<string, string[]>>;

export const RegionData: RegionData = {
  "Kepulauan Riau": {
    "Kota Batam": ["Batam Kota", "Batu Ampar", "Belakang Padang"],
    "Kota Tanjung Pinang": [
      "Bukit Bestari",
      "Tanjung Pinang Barat",
      "Tanjung Pinang Kota",
    ],
  },

  "DKI Jakarta": {
    "Jakarta Selatan": ["Kebayoran Baru", "Kebayoran Lama", "Cilandak"],
    "Jakarta Barat": ["Kebon Jeruk", "Tamansari", "Grogol Petamburan"],
  },

  Bali: {
    "Kota Denpasar": ["Denpasar Selatan", "Denpasar Barat", "Denpasar Utara"],
    Badung: ["Kuta", "Kuta Selatan", "Kuta Utara"],
  },
};

export const provinceList: string[] = Object.keys(RegionData).sort();

export const getRegencies = (province: string): string[] =>
  province ? Object.keys(RegionData[province] ?? {}).sort() : [];

export const getDistricts = (province: string, regency: string): string[] =>
  province && regency
    ? [...(RegionData[province]?.[regency] ?? [])].sort()
    : [];
