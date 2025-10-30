import "./ProfileOng.css"; // Importamos el CSS puro
import PasarelaPagos from "../PasarelaPagos/PasarelaPagos";
import CampaignComponent from "./Campaign/Campaign";

interface Donation {
  id: string;
  donorName: string;
  amountDisplay: string;
  date: string;
}

interface Alliance {
  id: string;
  name: string;
  logoUrl: string;
}
// Props principales del componente
export interface OngProfileProps {
  // name: string;
  // coverImage: string;
  // profileImage: string;
  // description: string;
  // stats: {
  //   donors: number;
  //   volunteers: number;
  //   projects: number;
  // };
  // mission: string;
  // vision: string;
  // values: string[];
  // socialImpact: string;
  // latestProjects: Project[];
  // latestDonations: Donation[];
  // alliances: Alliance[];
  // location: string;
  // websiteUrl: string;
  // socialLinks: {
  //   instagram?: string;
  //   twitter?: string;
  //   facebook?: string;
  //   linkedin?: string;
  // };
  contact_email: string;
  contact_phone: string;
  profileImage: string;
  description: string;
  id: string;
  createdAt: string;
  logoPublicId: string;
  logo_url: string;
  name: string;
  updatedAt: string;
  userId: string;
}

const OngProfile: React.FC<OngProfileProps> = ({
  contact_email,
  contact_phone,
  profileImage,
  description,
  id,
  createdAt,
  logoPublicId,
  logo_url,
  name,
  updatedAt,
  userId,
}) => {
  // Helper para formatear números (ej: 1200 -> 1.2k)
  const formatStat = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div className="profile-container" key={id}>
      {/* --- 1. Encabezado (Portada y Perfil) --- */}
      <header className="profile-header">
        <div className="profile-header-content">
          <div className="profile-picture-wrapper">
            <img
              src={logo_url}
              alt={`Perfil de ${name}`}
              width={150}
              height={150}
              className="profile-picture-img"
            />
          </div>
          <h1 className="profile-name">{name}</h1>
          <div className="profile-cta-buttons">
            <button type="button" className="profile-button-primary">
              Donar ahora
            </button>
            <button type="button" className="profile-button-secondary">
              Ser voluntario
            </button>
          </div>
        </div>
      </header>

      {/* --- 2. Cuerpo Principal (Layout de 2 columnas) --- */}
      <main className="profile-main">
        {/* --- Columna Izquierda (Sidebar) --- */}
        <aside className="profile-sidebar">
          {/* Widget: Descripción */}
          <div className="profile-widget">
            <h2 className="widget-title">Quiénes Somos</h2>
            <p className="profile-description">{description}</p>
          </div>

          {/* Widget: Estadísticas */}
          <div className="profile-widget profile-stats">
            <div className="stat-item">
              <span className="stat-value">10</span>
              <span className="stat-label">Donantes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">20</span>
              <span className="stat-label">Voluntarios</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5</span>
              <span className="stat-label">Proyectos</span>
            </div>
          </div>

          {/* Widget: Alianzas */}
          {/* <div className="profile-widget">
            <h2 className="widget-title">Nuestras Alianzas</h2>
            <div className="profile-alliances">
              {alliances.map(alliance => (
                <div key={alliance.id} className="alliance-item">
                  <img src={alliance.logoUrl} alt={alliance.name} width={50} height={50} title={alliance.name} />
                </div>
              ))}
            </div>
          </div> */}

          {/* Widget: Contacto y Redes */}
          <div className="profile-widget">
            <h2 className="widget-title">Contacto</h2>
            <div className="profile-contact-info">
              <p>
                <strong>Ubicación:</strong> {/*location*/}
              </p>
              <p>
                <strong>Sitio Web:</strong>{" "}
                <a href="" target="_blank" rel="noopener noreferrer">
                  {/*websiteUrl*/}
                </a>
              </p>
              <p>
                <strong>Email:</strong> {contact_email}
              </p>
              <p>
                <strong>Teléfono:</strong> {contact_phone}
              </p>
            </div>
            {/* <div className="profile-socials">
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              
            </div> */}
          </div>
        </aside>

        {/* --- Columna Derecha (Contenido Principal) --- */}
        <section className="profile-content">
          {/* Sección: Misión, Visión y Valores */}
          <div className="profile-section profile-core-values">
            <div className="core-value-item">
              <h3>Misión</h3>
              <p>{/*mission*/}</p>
            </div>
            <div className="core-value-item">
              <h3>Visión</h3>
              <p>{/*vision*/}</p>
            </div>
            <div className="core-value-item">
              <h3>Valores</h3>
              <ul>
                {/*values.map((value, index) => <li key={index}>{value}</li>)*/}
              </ul>
            </div>
          </div>

          {/* Sección: Ranking de Donaciones */}
          <div className="profile-section">
            <h2 className="section-title">Últimas Donaciones</h2>
            <ol className="donations-ranking-list">
              {/*latestDonations.map(donation => (
                <li key={donation.id} className="donation-item">
                  <span className="donation-name">{donation.donorName}</span>
                  <span className="donation-details">
                    {donation.amountDisplay} - <span className="donation-date">{donation.date}</span>
                  </span>
                </li>
              ))*/}
                <li  className="donation-item">
                  <span className="donation-name">Esteban Karaputny</span>
                  <span className="donation-details">
                    Proyecto construcción - <span className="donation-date">$10000</span>
                  </span>
                </li>
                <li  className="donation-item">
                  <span className="donation-name">Dana Torres</span>
                  <span className="donation-details">
                    Proyecto construcción - <span className="donation-date">$5000</span>
                  </span>
                </li>
                <li  className="donation-item">
                  <span className="donation-name">Franco Torrico</span>
                  <span className="donation-details">
                    Proyecto construcción - <span className="donation-date">$5000</span>
                  </span>
                </li>
                <li  className="donation-item">
                  <span className="donation-name">Nelson Salto</span>
                  <span className="donation-details">
                    Proyecto construcción - <span className="donation-date">$15000</span>
                  </span>
                </li>
                <li  className="donation-item">
                  <span className="donation-name">Alan Quispe</span>
                  <span className="donation-details">
                    Proyecto construcción - <span className="donation-date">$5000</span>
                  </span>
                </li>
            </ol>
            
          </div>
          {/*Sección: donar*/}
          <PasarelaPagos 
              ongId={id} 
              ongName={name} 
              contact_email={contact_email} 
              contact_phone={contact_phone} 
            />
          {/* Sección: Impacto Social */}
          <div className="profile-section">
            <h2 className="section-title">Impacto Social</h2>
            <p>{/*socialImpact*/}</p>
          </div>

          {/* Sección: Últimos Proyectos */}
          <div className="profile-section">
            <h2 className="section-title">Últimos Proyectos</h2>
            <div className="profile-campaign-grid">
              {/* <!--CAMPAÑAS--> */
                <CampaignComponent ongId={id} />
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OngProfile;
