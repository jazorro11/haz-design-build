import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_DEFAULT_PAGE_TITLE } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://hazarquitectura.com';
const DEFAULT_DESCRIPTION =
  'Más de 30 años integrando arquitectura y ejecución para entregar obras sólidas y funcionales. Diseño + Ejecución bajo un solo techo.';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_DEFAULT_PAGE_TITLE;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
