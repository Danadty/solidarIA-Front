import styles from "./Contact.module.css";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className={styles.container}>
      {/* Header principal */}
      <section className={styles.header}>
        <Image
          src="/hands2.png" // Cambiá por tu logo en /public
          alt="Logo SolidarIA"
          width={100}
          height={100}
          className={styles.logo}
        />
        <div>
          <h1 className={styles.title}>SolidarIA</h1>
          <p className={styles.subtitle}>Fundación de Innovación y Ayuda Comunitaria</p>
          <div className={styles.buttons}>
            <a href="/donar" className={styles.primaryBtn}>Donar ahora</a>
            <a href="/voluntariado" className={styles.secondaryBtn}>Ser voluntario</a>
          </div>
        </div>
      </section>

      {/* Sección de información */}
      <section className={styles.infoGrid}>
        <div className={styles.card}>
          <h2>Quiénes Somos</h2>
          <p>
            Somos un equipo de cinco estudiantes
            comprometidos con el uso de la tecnología para generar impacto social.
            Nuestro objetivo es conectar innovación, solidaridad y oportunidades.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Misión</h2>
          <p>
            Promover la inclusión digital y la ayuda comunitaria mediante herramientas tecnológicas
            accesibles y sostenibles.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Visión</h2>
          <p>
            Convertirnos en una red solidaria de impacto global,
            apoyando causas sociales a través de la tecnología.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Valores</h2>
          <ul>
            <li>Empatía</li>
            <li>Compromiso</li>
            <li>Transparencia</li>
            <li>Colaboración</li>
          </ul>
        </div>
      </section>

      {/* Sección de integrantes */}
      <section className={styles.team}>
        <h2>Nuestro Equipo</h2>
        <div className={styles.teamGrid}>
          {[
            { name: "Nelson Salto", role:"Frontend Developer" , img: "/cat1.jpeg", linkedin: "#" },
            { name: "Esteban Karaputny", role: "Backend Developer", img: "/cat2.jpeg", linkedin: "#" },
            { name: "Alan Quispe", role: "Frontend Developer", img: "/cat3.jpeg", linkedin: "#" },
            { name: "Dana Torres", role: "UX/UI Designer", img: "/cat4.jpeg", linkedin: "#" },
            { name: "Franco Torrico", role: "Full Stack Developer", img: "/cat5.jpeg", linkedin: "#" },
          ].map((member) => (
            <div key={member.name} className={styles.member}>
              <Image src={member.img} alt={member.name} width={120} height={120} className={styles.avatar} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className={styles.contact}>
        <h2>Contacto</h2>
        <p>📧 contacto@solidaria.org</p>
        <p>📍 Buenos Aires, Argentina</p>
        <div className={styles.socials}>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </section>
    </main>
  );
}
