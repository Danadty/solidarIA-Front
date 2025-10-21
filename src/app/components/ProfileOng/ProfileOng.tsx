import React from 'react';
import './ProfileOng.css';
import AboutMore from "@/app/components/ProfileOng/AboutMore/AboutMore";


// (Tus tipos 'Ong' y 'ProfileOngProps' permanecen iguales)
type Ong = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
};

type ProfileOngProps = {
  ProfileOngPrueba: Ong[];
};

const ProfileOng: React.FC<ProfileOngProps> = ({ ProfileOngPrueba }) => {
  return (
    <>
      {ProfileOngPrueba
        // 1. Filtra el array para quedarte solo con el objeto deseado.
        .filter(ong => ong.id === 3)
        
        // 2. El .map() ahora se ejecutará sobre un array con un único elemento.
        .map(ong => (
          <section key={ong.id} className='container-ong'>
            <div className='content-img-ong'>
              <img src={ong.logo_url} alt={`Logo de ${ong.name}`} className='logo-ong' />
            </div>
            <div className='content-info-ong'>
              <h2 className='title-ong'>{ong.name}</h2>
              <p className='description-ong'>{ong.description}</p>
              <div>
                <button type="button" className='button-aboutong'>
                  Saber más
                </button>
                <button type="button" className='button-donation'>
                  Donar
                </button>
              </div>
            </div>
          </section>
        ))
      }
      <section>
        <AboutMore />
      </section>
      <section>
        <h2>Ultimas actividades</h2>
        <div>
          <article>
            <img 
            src="https://argentina.techo.org/wp-content/uploads/sites/8/2021/10/Rectangle-36-1-731x1024.png" 
            alt="" />
            <h3>
              Proyecto un hogar para Pedro y sus hijos
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, ab similique consectetur adipisci hic veniam obcaecati optio, ad debitis dolor iure sit, cum voluptas eaque doloribus aut voluptates corporis maiores?
              Ipsum voluptatem accusantium dolores similique quos fugit sunt optio rerum fuga, itaque nostrum magnam soluta nemo dignissimos minus. Sequi distinctio possimus aliquid laborum eligendi tempore, adipisci inventore. Atque, expedita minima!
              Dolorem culpa hic tempora sunt saepe, officiis ab doloremque facere earum velit maiores eveniet pariatur. Reiciendis nostrum recusandae illum a, velit accusantium vitae, eligendi ipsam porro magni impedit. Nisi, repellat.
            </p>
          </article>
          <article>

          </article>
        </div>
      </section>
    </>
  );
};

export default ProfileOng;