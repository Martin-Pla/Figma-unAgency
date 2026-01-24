const fs = require('fs');
const path = require('path');

// Leer y parsear los datos de Projects.jsx
function extractProjectsData() {
  const projectsPath = path.join(__dirname, '../src/components/Projects.jsx');
  const content = fs.readFileSync(projectsPath, 'utf8');
  
  // Extraer el array de projects usando regex
  const projectsMatch = content.match(/const projects = \[([\s\S]*?)\];/);
  if (!projectsMatch) return [];
  
  const projectsStr = projectsMatch[1];
  const projects = [];
  
  // Parsear cada proyecto (método simple pero efectivo)
  const projectMatches = projectsStr.matchAll(/{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?subtitle:\s*(?:"([^"]+)"|null),[\s\S]*?category:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)"/g);
  
  for (const match of projectMatches) {
    if (match[1] && !match[1].includes('hidden')) {
      projects.push({
        id: match[1],
        title: match[2],
        subtitle: match[3] || null,
        category: match[4],
        description: match[5].replace(/\\n/g, ' ').substring(0, 200)
      });
    }
  }
  
  return projects.slice(0, 10); // Limitar a 10 proyectos principales
}

// Leer y parsear los datos de Services.jsx
function extractServicesData() {
  const servicesPath = path.join(__dirname, '../src/components/Services.jsx');
  const content = fs.readFileSync(servicesPath, 'utf8');
  
  const servicesMatch = content.match(/const services = \[([\s\S]*?)\];/);
  if (!servicesMatch) return [];
  
  const servicesStr = servicesMatch[1];
  const services = [];
  
  const serviceMatches = servicesStr.matchAll(/{\s*category:\s*"([^"]+)",\s*description:\s*"([^"]+)",[\s\S]*?services:\s*\[([\s\S]*?)\]\s*}/g);
  
  for (const match of serviceMatches) {
    const serviceItems = match[3].match(/"([^"]+)"/g) || [];
    services.push({
      category: match[1],
      description: match[2].replace(/\\n/g, ' '),
      services: serviceItems.map(s => s.replace(/"/g, ''))
    });
  }
  
  return services;
}

function generateProjectsHTML(projects) {
  if (!projects || projects.length === 0) return '';
  
  return projects.map(project => `
    <article class="seo-project-item" itemscope itemtype="https://schema.org/CreativeWork">
      <h3 itemprop="name">${escapeHtml(project.title)}${project.subtitle ? ` - ${escapeHtml(project.subtitle)}` : ''}</h3>
      <p itemprop="description">${escapeHtml(project.description)}</p>
      <span itemprop="genre">${escapeHtml(project.category)}</span>
    </article>
  `).join('\n');
}

function generateServicesHTML(services) {
  if (!services || services.length === 0) return '';
  
  return services.map(service => `
    <section class="seo-service-item" itemscope itemtype="https://schema.org/Service">
      <h2 itemprop="name">${escapeHtml(service.category)}</h2>
      <p itemprop="description">${escapeHtml(service.description)}</p>
      <ul>
        ${service.services.map(s => `<li itemprop="serviceType">${escapeHtml(s)}</li>`).join('\n')}
      </ul>
    </section>
  `).join('\n');
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateStaticHTML() {
  const buildPath = path.join(__dirname, '../build');
  const publicPath = path.join(__dirname, '../public');
  
  // Intentar leer desde build primero, luego public
  let indexPath;
  if (fs.existsSync(buildPath) && fs.existsSync(path.join(buildPath, 'index.html'))) {
    indexPath = path.join(buildPath, 'index.html');
  } else if (fs.existsSync(path.join(publicPath, 'index.html'))) {
    indexPath = path.join(publicPath, 'index.html');
  } else {
    console.error('❌ index.html no encontrado. Ejecuta "npm run build" primero.');
    process.exit(1);
  }
  
  console.log('📖 Extrayendo datos de proyectos y servicios...');
  const projects = extractProjectsData();
  const services = extractServicesData();
  
  console.log(`✅ Encontrados ${projects.length} proyectos y ${services.length} servicios`);
  
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Insertar contenido SEO antes del cierre de </body>
  const seoContent = `
    <!-- SEO Content - Pre-rendered for search engines (No JavaScript Required) -->
    <noscript>
      <div id="seo-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
        <h1>The unAgency | Product Design & Brand Architecture: US - MX</h1>
        
        <section id="seo-projects" itemscope itemtype="https://schema.org/ItemList">
          <h2>Our Projects</h2>
          ${generateProjectsHTML(projects)}
        </section>
        
        <section id="seo-services" itemscope itemtype="https://schema.org/Service">
          <h2>Our Services</h2>
          ${generateServicesHTML(services)}
        </section>
        
        <section id="seo-about">
          <h2>About The unAgency</h2>
          <p>We are the glitch in the agency model. A collective of rogue creatives obsessed with the absolute. Traditional agencies sell time and bloated processes. We sell impact. We have surgically removed the account managers, the endless meetings, and the layers of middle-management that dilute vision.</p>
          <p>What remains is pure potency. Direct access to elite talent. Radical transparency. Relentless execution. We don't just build digital products; we engineer market dominance.</p>
        </section>
        
        <section id="seo-locations">
          <h2>Service Areas</h2>
          <p>Boutique Design & Strategy Hub serving key innovation centers: California (San Diego, LA), Las Vegas, Arizona, Mexico (CDMX, Guadalajara, Tijuana, Valle de Guadalupe - Baja California Wine Region), and strategic spirits industry hubs including Louisville (Kentucky), Nashville (Tennessee), Austin (Texas), Seattle (Washington), and Chicago (Illinois).</p>
        </section>
      </div>
    </noscript>
  `;
  
  // Insertar antes de </body> si no existe ya
  if (!html.includes('id="seo-content"')) {
    html = html.replace('</body>', seoContent + '\n</body>');
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('✅ HTML estático generado con contenido SEO en:', indexPath);
  } else {
    console.log('⚠️  El contenido SEO ya existe en el HTML. Saltando...');
  }
}

// Ejecutar
try {
  generateStaticHTML();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
