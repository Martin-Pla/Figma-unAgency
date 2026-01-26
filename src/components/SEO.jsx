import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "The unAgency & Co. | Global Brand Development & Strategy",
  description = "The unAgency is a global brand development, innovation, strategy, and advertising agency. We transform visions into high-value assets and cult brands.",
  keywords = "product design, brand architecture, NPD, new product development, branding boutique, strategic innovation, diseño de producto, branding, agencia creativa, spirits branding, tequila branding, bourbon branding, wine branding, California, Mexico, Guadalajara, San Diego, Tijuana",
  image = "https://www.theunagencyco.com/assets/favicon-unagency.png",
  url = "https://www.theunagencyco.com/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish, English" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_MX, en_US" />
      <meta property="og:site_name" content="The unAgency" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
