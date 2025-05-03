-- Voeg Ilford als merk toe
INSERT INTO brands (name, logo_url, website, description)
VALUES (
  'Ilford',
  'https://www.ilfordphoto.com/wp-content/uploads/2017/03/ilford-logo.png',
  'https://www.ilfordphoto.com',
  'Ilford Photo is een Britse fabrikant van fotografische materialen, bekend om hun zwart-wit films en ontwikkelaars.'
);

-- Voeg de eerste producten toe
INSERT INTO products (
  brand_id,
  name,
  format,
  iso,
  exposures,
  ean,
  description,
  status,
  image_url
)
SELECT 
  id as brand_id,
  'HP5 Plus',
  '35mm',
  400,
  36,
  '0019498574573',
  'Ilford HP5 Plus is een klassieke zwart-wit film met een ISO van 400. Perfect voor alledaagse fotografie met uitstekende schaduwdetails en een breed belichtingsbereik.',
  'active',
  'https://fotofilmfabriek.nl/wp-content/uploads/2023/01/ilford-hp5-plus-35mm-36exp.jpg'
FROM brands
WHERE name = 'Ilford';

INSERT INTO products (
  brand_id,
  name,
  format,
  iso,
  exposures,
  ean,
  description,
  status,
  image_url
)
SELECT 
  id as brand_id,
  'HP5 Plus',
  '120',
  400,
  12,
  '0019498629013',
  'Ilford HP5 Plus in 120 formaat. Dezelfde geweldige kwaliteit als de 35mm versie, maar in het grotere middenformaat voor nog meer detail.',
  'active',
  'https://fotofilmfabriek.nl/wp-content/uploads/2023/01/ilford-hp5-plus-120-12exp.jpg'
FROM brands
WHERE name = 'Ilford';

-- Voeg wat webshops toe
INSERT INTO stores (name, country, currency, type, website, logo_url)
VALUES 
  ('Foto Film Fabriek', 'nl', 'EUR', 'online', 'https://fotofilmfabriek.nl', 'https://fotofilmfabriek.nl/wp-content/uploads/2023/01/fff-logo.png'),
  ('CameraNU', 'nl', 'EUR', 'both', 'https://www.cameranu.nl', 'https://www.cameranu.nl/static/version1709121234/frontend/CameraNU/default/nl_NL/images/logo.svg'),
  ('Foto Konijnenberg', 'nl', 'EUR', 'both', 'https://www.fotokonijnenberg.nl', 'https://www.fotokonijnenberg.nl/skin/frontend/default/konijnenberg/images/logo.png');

-- Voeg product URLs toe
INSERT INTO product_urls (product_id, store_id, url, last_price, last_stock_status)
SELECT 
  p.id as product_id,
  s.id as store_id,
  CASE 
    WHEN p.format = '35mm' THEN 'https://fotofilmfabriek.nl/product/ilford-hp5-plus-kleinbeeldfilm/'
    ELSE 'https://fotofilmfabriek.nl/product/ilford-hp5-plus-middenformaatfilm/'
  END as url,
  CASE 
    WHEN p.format = '35mm' THEN 9.95
    ELSE 8.95
  END as last_price,
  true as last_stock_status
FROM products p
CROSS JOIN stores s
WHERE s.name = 'Foto Film Fabriek';

-- Voeg wat prijsgeschiedenis toe
INSERT INTO prices (product_url_id, price, in_stock, currency)
SELECT 
  pu.id as product_url_id,
  pu.last_price as price,
  pu.last_stock_status as in_stock,
  'EUR' as currency
FROM product_urls pu
JOIN stores s ON pu.store_id = s.id
WHERE s.name = 'Foto Film Fabriek'; 