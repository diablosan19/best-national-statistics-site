// data.js — every figure the portal shows, in one place.
// National statistics for Indonesia: headline series, population structure,
// the 38 provinces, prices and trade. Years are named beside each series.

export const HEADLINE = [
  { id: 'population', label: 'Population', value: 283.5, decimals: 1, suffix: ' million', year: 'Mid-year 2024', note: 'Growth 0.82% on 2023' },
  { id: 'gdp', label: 'Gross domestic product', value: 1.40, decimals: 2, prefix: 'US$', suffix: ' trillion', year: '2024', note: 'Rp 22,139 trillion at current prices' },
  { id: 'growth', label: 'GDP growth', value: 5.03, decimals: 2, suffix: '%', year: '2024', note: 'Fifth straight year near five per cent' },
  { id: 'gdppc', label: 'GDP per capita', value: 4919, decimals: 0, prefix: 'US$', year: '2024', note: 'Rp 78.4 million per person' },
  { id: 'inflation', label: 'Inflation, year on year', value: 2.86, decimals: 2, suffix: '%', year: 'October 2025', note: 'Inside the 2.5 ± 1% target band' },
  { id: 'poverty', label: 'Poverty rate', value: 8.47, decimals: 2, suffix: '%', year: 'March 2025', note: '23.85 million people below the line' },
  { id: 'unemployment', label: 'Open unemployment', value: 4.76, decimals: 2, suffix: '%', year: 'February 2025', note: '7.28 million of a 153.0 million labour force' },
  { id: 'lifeexp', label: 'Life expectancy at birth', value: 72.4, decimals: 1, suffix: ' years', year: '2024', note: 'Up from 71.9 years in 2020' },
  { id: 'hdi', label: 'Human development index', value: 74.20, decimals: 2, year: '2024', note: 'High human development category' },
  { id: 'gini', label: 'Gini ratio of expenditure', value: 0.375, decimals: 3, year: 'March 2025', note: 'Down from 0.379 a year earlier' },
  { id: 'exports', label: 'Exports of goods', value: 264.7, decimals: 1, prefix: 'US$', suffix: ' bn', year: '2024', note: 'Non-oil and gas: US$248.1 bn' },
  { id: 'urban', label: 'Urban population share', value: 58.6, decimals: 1, suffix: '%', year: '2024', note: 'Java holds 55.9% of all residents' },
];

export const GDP_GROWTH = [
  ['2015', 4.88], ['2016', 5.03], ['2017', 5.07], ['2018', 5.17], ['2019', 5.02],
  ['2020', -2.07], ['2021', 3.70], ['2022', 5.31], ['2023', 5.05], ['2024', 5.03],
];

export const GDP_LEVEL = [
  ['2020', 15434], ['2021', 16977], ['2022', 19588], ['2023', 20892], ['2024', 22139],
];

export const SECTORS = [
  // name, share of GDP 2024 (%), real growth 2024 (%)
  ['Manufacturing', 19.2, 4.4],
  ['Wholesale and retail trade', 13.4, 4.9],
  ['Agriculture, forestry and fishing', 13.0, 0.7],
  ['Construction', 10.9, 7.0],
  ['Mining and quarrying', 9.7, 4.9],
  ['Transportation and warehousing', 6.6, 8.7],
  ['Information and communication', 4.3, 6.8],
  ['Financial and insurance services', 4.3, 4.9],
  ['Public administration and defence', 3.7, 0.6],
  ['Education services', 3.3, 2.9],
  ['Accommodation and food services', 2.8, 10.4],
  ['Real estate', 2.6, 2.3],
  ['Health and social services', 2.1, 5.4],
  ['Business services', 1.9, 6.1],
  ['Other services', 2.2, 9.8],
];

export const PYRAMID = [
  // age group, male % of population, female % of population (2024)
  ['0–4', 4.1, 3.9], ['5–9', 4.2, 4.0], ['10–14', 4.3, 4.1], ['15–19', 4.4, 4.2],
  ['20–24', 4.5, 4.3], ['25–29', 4.4, 4.3], ['30–34', 4.2, 4.1], ['35–39', 3.9, 3.8],
  ['40–44', 3.5, 3.5], ['45–49', 3.1, 3.1], ['50–54', 2.6, 2.8], ['55–59', 2.1, 2.3],
  ['60–64', 1.7, 1.9], ['65–69', 1.3, 1.5], ['70–74', 0.9, 1.1], ['75–79', 0.5, 0.7],
  ['80+', 0.4, 0.7],
];

export const POPULATION_FACTS = [
  ['Median age', '30.4 years'],
  ['Sex ratio', '102 men per 100 women'],
  ['Population density', '149 people per km²'],
  ['Share aged 0–14', '24.9%'],
  ['Share aged 65 and over', '7.1%'],
  ['Dependency ratio', '47.4 per 100 working-age'],
  ['Total fertility rate', '2.1 children per woman'],
  ['Infant mortality', '15.6 per 1,000 live births'],
  ['Households', '74.9 million, average size 3.8'],
  ['Largest city', 'Jakarta — 10.56 million residents'],
];

export const INFLATION_MONTHLY = [
  // month, headline y/y %, core y/y % — January 2023 to October 2025
  ['Jan 2023', 5.28, 3.27], ['Feb 2023', 5.47, 3.09], ['Mar 2023', 4.97, 2.94],
  ['Apr 2023', 4.33, 2.83], ['May 2023', 4.00, 2.66], ['Jun 2023', 3.52, 2.58],
  ['Jul 2023', 3.08, 2.43], ['Aug 2023', 3.27, 2.31], ['Sep 2023', 2.28, 2.15],
  ['Oct 2023', 2.56, 1.91], ['Nov 2023', 2.86, 1.87], ['Dec 2023', 2.61, 1.80],
  ['Jan 2024', 2.57, 1.88], ['Feb 2024', 2.75, 1.96], ['Mar 2024', 3.05, 1.95],
  ['Apr 2024', 3.00, 1.82], ['May 2024', 2.84, 1.93], ['Jun 2024', 2.51, 1.90],
  ['Jul 2024', 2.13, 1.95], ['Aug 2024', 2.12, 2.02], ['Sep 2024', 1.84, 2.09],
  ['Oct 2024', 1.71, 2.21], ['Nov 2024', 1.55, 2.26], ['Dec 2024', 1.57, 2.26],
  ['Jan 2025', 0.76, 2.36], ['Feb 2025', -0.09, 2.48], ['Mar 2025', 1.03, 2.48],
  ['Apr 2025', 1.95, 2.31], ['May 2025', 1.60, 2.40], ['Jun 2025', 1.87, 2.37],
  ['Jul 2025', 2.37, 2.32], ['Aug 2025', 2.31, 2.17], ['Sep 2025', 2.65, 2.19],
  ['Oct 2025', 2.86, 2.24],
];

export const CPI_GROUPS = [
  // expenditure group, weight in the basket (%), inflation y/y October 2025 (%)
  ['Food, beverages and tobacco', 26.5, 4.14],
  ['Personal care and other services', 15.4, 6.83],
  ['Transport', 11.8, 1.12],
  ['Housing, water, electricity and fuels', 10.6, 0.94],
  ['Restaurants', 9.4, 2.21],
  ['Information, communication and financial services', 6.1, 0.38],
  ['Education', 5.7, 1.84],
  ['Clothing and footwear', 5.4, 1.16],
  ['Furnishings and household maintenance', 4.4, 0.82],
  ['Health', 2.4, 1.93],
  ['Recreation, sport and culture', 2.3, 1.47],
];

export const PROVINCES = [
  // name, capital, island group, population (thousands, 2024), area (km²), HDI 2024, poverty % (Mar 2025)
  ['Aceh', 'Banda Aceh', 'Sumatra', 5550, 57956, 71.9, 13.9],
  ['North Sumatra', 'Medan', 'Sumatra', 15590, 72981, 73.4, 8.5],
  ['West Sumatra', 'Padang', 'Sumatra', 5840, 42013, 73.9, 5.9],
  ['Riau', 'Pekanbaru', 'Sumatra', 6730, 87024, 74.8, 6.7],
  ['Jambi', 'Jambi', 'Sumatra', 3720, 50058, 72.6, 7.4],
  ['South Sumatra', 'Palembang', 'Sumatra', 8840, 91592, 72.3, 10.4],
  ['Bengkulu', 'Bengkulu', 'Sumatra', 2110, 19919, 72.9, 13.5],
  ['Lampung', 'Bandar Lampung', 'Sumatra', 9420, 34624, 71.6, 10.6],
  ['Bangka Belitung Islands', 'Pangkal Pinang', 'Sumatra', 1530, 16424, 72.9, 5.1],
  ['Riau Islands', 'Tanjung Pinang', 'Sumatra', 2180, 8270, 78.5, 5.4],
  ['Jakarta', 'Jakarta', 'Java', 10560, 664, 83.6, 4.3],
  ['West Java', 'Bandung', 'Java', 49940, 35378, 73.8, 7.1],
  ['Central Java', 'Semarang', 'Java', 38280, 32801, 73.4, 9.6],
  ['Yogyakarta', 'Yogyakarta', 'Java', 3760, 3186, 80.6, 10.9],
  ['East Java', 'Surabaya', 'Java', 41810, 47800, 73.9, 9.8],
  ['Banten', 'Serang', 'Java', 12430, 9663, 73.1, 5.8],
  ['Bali', 'Denpasar', 'Bali and Nusa Tenggara', 4340, 5780, 76.4, 4.0],
  ['West Nusa Tenggara', 'Mataram', 'Bali and Nusa Tenggara', 5650, 18572, 69.8, 12.8],
  ['East Nusa Tenggara', 'Kupang', 'Bali and Nusa Tenggara', 5660, 47931, 66.4, 19.2],
  ['West Kalimantan', 'Pontianak', 'Kalimantan', 5870, 147307, 69.7, 6.9],
  ['Central Kalimantan', 'Palangka Raya', 'Kalimantan', 2810, 153564, 71.7, 5.2],
  ['South Kalimantan', 'Banjarmasin', 'Kalimantan', 4270, 38744, 71.9, 4.1],
  ['East Kalimantan', 'Samarinda', 'Kalimantan', 3960, 127347, 79.4, 5.7],
  ['North Kalimantan', 'Tanjung Selor', 'Kalimantan', 720, 75468, 73.9, 6.4],
  ['North Sulawesi', 'Manado', 'Sulawesi', 2750, 13892, 74.4, 7.3],
  ['Central Sulawesi', 'Palu', 'Sulawesi', 3120, 61841, 70.5, 11.5],
  ['South Sulawesi', 'Makassar', 'Sulawesi', 9460, 46717, 72.6, 8.2],
  ['Southeast Sulawesi', 'Kendari', 'Sulawesi', 2790, 38140, 71.9, 10.7],
  ['Gorontalo', 'Gorontalo', 'Sulawesi', 1240, 11257, 68.9, 14.8],
  ['West Sulawesi', 'Mamuju', 'Sulawesi', 1530, 16787, 67.8, 10.3],
  ['Maluku', 'Ambon', 'Maluku and Papua', 1950, 46914, 70.2, 15.6],
  ['North Maluku', 'Sofifi', 'Maluku and Papua', 1370, 31982, 69.6, 6.3],
  ['Southwest Papua', 'Sorong', 'Maluku and Papua', 620, 39167, 66.8, 17.9],
  ['West Papua', 'Manokwari', 'Maluku and Papua', 570, 60275, 66.1, 20.9],
  ['Papua', 'Jayapura', 'Maluku and Papua', 1100, 45350, 63.4, 17.5],
  ['South Papua', 'Merauke', 'Maluku and Papua', 540, 117833, 64.9, 18.4],
  ['Central Papua', 'Nabire', 'Maluku and Papua', 1350, 61073, 59.8, 28.6],
  ['Highland Papua', 'Wamena', 'Maluku and Papua', 1460, 51213, 54.6, 34.1],
];

export const RELEASES = [
  ['1 December 2025', 'Consumer price index', 'Inflation for November 2025, 90 cities'],
  ['1 December 2025', 'Foreign trade', 'Exports and imports, October 2025'],
  ['15 December 2025', 'Farmer exchange rate', 'Terms of trade for farmers, November 2025'],
  ['5 January 2026', 'Tourism and transport', 'Visitor arrivals and air passengers, November 2025'],
  ['2 February 2026', 'National accounts', 'GDP growth for the fourth quarter and full year 2025'],
  ['5 February 2026', 'Labour force', 'Employment and unemployment, November 2025 round'],
];

export const TRADE = [
  ['Exports, 2024', 'US$264.7 bn', 'Up 6.3% on 2023'],
  ['Imports, 2024', 'US$233.7 bn', 'Up 5.3% on 2023'],
  ['Trade balance, 2024', 'US$31.0 bn surplus', '56th straight monthly surplus in December'],
  ['Largest export', 'Coal — US$30.5 bn', 'Followed by palm oil and iron and steel'],
  ['Largest market', 'China — US$62.4 bn', 'Then the United States and Japan'],
  ['Oil and gas exports', 'US$16.6 bn', '6.3% of all exports'],
];
