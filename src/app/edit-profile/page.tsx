"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./styleProfile.css";
import { get } from "http";
import { useRouter } from "next/navigation";
interface FoundationData {
  id: string;
  name: string;
  description: string;
  contact_phone: string;
  contact_email: string;
  logo_url?: string;
}

interface UserData {
  description: string;
  phone: string;
  address: string;
  photoUrl?: string;
}
interface Campaign {
  id: string;
  title: string;
  description: string;
  start_Date: string;
  end_Date: string;
  imageUrl?: string | null;
  foundationId?: string;
}
interface FoundationData {
  id: string;
  name: string;
  description: string;
  contact_phone: string;
  contact_email: string;
  logo_url?: string;
  campaigns?: Campaign[]; // 👈 agregamos esto
}
// --- Formulario Fundación ---
function FoundationEditForm() {
  const [data, setData] = useState<FoundationData | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [foundationId, setFoundationId] = useState<string | null>(null);

  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignFile, setCampaignFile] = useState<File | null>(null);
  const [loadingCampaign, setLoadingCampaign] = useState(false);

  const [foundationData, setFoundationData] = useState<FoundationData | null>(null);
  const [campaignsList, setCampaignsList] = useState<Campaign[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/me/foundation`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json.data.foundation);
        setFoundationId(json.data.foundation.id);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // El hook siempre se llama, pero dentro sí podemos condicionar
    if (!foundationId) return;

    fetchFoundationById(foundationId);
  }, [foundationId]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const payload: any = {
        name: data.name,
        description: data.description,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
      };

      // if (logoFile) {
      //   const formData = new FormData();
      //   formData.append("file", logoFile);

      //   const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/${foundationId}/upload-logo`, {
      //     method: "POST",
      //     headers: { Authorization: `Bearer ${token}` },
      //     body: formData,
      //   });
      //   const uploadData = await uploadRes.json();
      //   payload.logo_url = uploadData.url;
      // }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/${foundationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");
      alert("Perfil de fundación actualizado!");
    } catch (err: any) {
      alert(err.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  // --- Manejar subida de logo ---
  const handleLogoUpload = async () => {
    if (!logoFile || !data) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const formData = new FormData();
      formData.append("file", logoFile);

      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/${data.id}/upload-logo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Error al subir logo");
      alert("✅ Logo subido correctamente!");

      // 👇 Volvemos a pedir la info actualizada
      const updatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/me/foundation`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedData = await updatedRes.json();
      setData(updatedData.data.foundation);
      setLogoFile(null);
      // alert("Logo subido correctamente!"+  data.logo_url);

    } catch (err) {
      alert("Error al subir logo");
    }
  };
  if (!data) return <div className="loadingContainer">
                        <div className="spinner"></div>
                        <p>Cargando fundacion...</p>
                    </div>;


  const handleSubmitCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingCampaign(true);
    console.log("hola");
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) return alert("No estás autenticado");

      let foundationId = localStorage.getItem("foundationId");
      if (!foundationId) {
        foundationId = await fetchFoundationId(); // 👈 obtiene si no está guardado
      }
      console.log(foundationId);
      if (!foundationId) return alert("No se pudo obtener el ID de la fundación");

      // aca va la el /campaing
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaign`;
      console.log(url);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: campaignTitle,
          description: campaignDescription,
          startDate: new Date().toISOString(),
          endDate: "2025-12-15T00:00:00.000Z",
          foundationId,
        }),
      });

      const data = await response.json();
      console.log("data");
      if (!response.ok) throw new Error(data.message || "Error al crear campaña");

      const campaignId = data.data.campaign.id;
      setCampaignsList((prev) => [...prev, data.data.campaign]);
      if (campaignFile) await uploadCampaignImage(campaignId);


      alert("Campaña creada correctamente ✅");
    } catch (err) {
      console.error(err);
      alert("Error al subir la campaña ❌");
    } finally {
      setLoadingCampaign(false);
    }
  };
  const uploadCampaignImage = async (campaignId: string) => {
    const token = localStorage.getItem("token");
    if (!campaignFile) return;

    const formData = new FormData();
    formData.append("file", campaignFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaign/${campaignId}/update-portada`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Error al subir la imagen");
    }

    console.log("Imagen subida correctamente ✅");
  };



  const fetchFoundationId = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/me/foundation`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (json.data?.foundation?.id) {
        localStorage.setItem("foundationId", json.data.foundation.id); // opcional, para guardar
        return json.data.foundation.id;
      } else {
        throw new Error("No se encontró la fundación");
      }
    } catch (err) {
      console.error("Error al obtener foundationId:", err);
      return null;
    }
  };
  // Manejar eliminación de campaña
  const deleteCampaign = async (campaignId: string) => {
    if (!confirm("¿Seguro que querés borrar esta campaña?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaign/${campaignId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al borrar campaña");

      // Actualizamos el estado quitando la campaña borrada
      setCampaignsList((prev) => prev.filter((c) => c.id !== campaignId));
    } catch (err) {
      console.error(err);
      alert("Error al borrar campaña");
    }
  };


  const fetchFoundationById = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (json.success) {
        setFoundationData(json.data);
        setCampaignsList(json.data.campaigns || []);
      } else {
        throw new Error("No se pudo obtener la fundación");
      }
    } catch (err) {
      console.error("Error fetching foundation:", err);
    }
  };
  return (
    <div className="color">

      <div className="container">

        <form className="form" onSubmit={handleSubmit}>
          {/* --- Subida de logo independiente --- */}
          <section className="caja">

            <h2 className="title">Editar Fundación</h2>
          </section>

          {/* --- Logo --- */}
          <div className="logo-container">
            {data.logo_url && (
              <img key={data.logo_url} src={data.logo_url} alt="Logo Fundación" className="logo-preview" />
            )}
            <div className="logo-buttons">
              <button type="button" onClick={() => document.getElementById("logoInput")?.click()}>
                {logoFile ? "Cambiar logo" : "Subir logo"}
              </button>
              {logoFile && (
                <button type="button" onClick={handleLogoUpload}>Guardar logo</button>
              )}
            </div>
            <input
              type="file"
              id="logoInput"
              style={{ display: "none" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLogoFile(e.target.files?.[0] || null)}
            />
          </div>
          {/* <h2>Editar Fundación</h2> */}
          <input
            className="input"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            className="input"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Descripción"
          />
          <input
            className="input"
            value={data.contact_phone}
            onChange={(e) => setData({ ...data, contact_phone: e.target.value })}
            placeholder="Teléfono"
          />
          <input
            className="input"
            value={data.contact_email}
            onChange={(e) => setData({ ...data, contact_email: e.target.value })}
            placeholder="Email"
          />
          {/* <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setLogoFile(e.target.files?.[0] || null)} /> */}
          <button className="button" type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
        </form>


      </div>

      <div className="container">
        {/* --- Sección de Campaña --- */}
        <form className="form" onSubmit={handleSubmitCampaign} >

          <section className="caja">
            <h2 className="title">Nueva Campaña</h2>
          </section>
          <input
            className="input"
            type="text"
            placeholder="Título de la campaña"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Descripción de la campaña"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setCampaignFile(e.target.files?.[0] || null)}
          />

          <button className="button" type="submit" disabled={loadingCampaign}>
            {loading ? "Subiendo..." : "Subir campaña"}
          </button>
        </form>

      </div>
      <div className="campaigns-container ">
        <h2 className="campaigns-title">Mis Campañas</h2>

        {campaignsList.length === 0 ? (
          <p>No hay campañas.</p>
        ) : (
          <div className="campaigns-grid">
            {campaignsList.map((c) => (
              <div key={c.id} className="campaign-card">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.title} className="campaign-img" />
                ) : (
                  <div className="campaign-img placeholder">Sin imagen</div>
                )}
                <div className="campaign-info">
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                  <div className="campaign-actions">
                    <button className="delete-btn" onClick={() => deleteCampaign(c.id)}>
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div style={{ height: '8rem' }}></div> {/* espacio simulado de footer */}

    </div>
  );
}

// interface UserData {
//   description: string;
//   phone: string;
//   address: string;
// }

// --- Formulario Usuario ---
function UserProfileEditForm() {
  const [data, setData] = useState<UserData>({
    description: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setLoadingRole(false);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      // 🔹 Decodificar el token para obtener userId
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      const userId = decoded.id; // 👈 según tu backend, puede ser "sub" o "id"

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const profiles = json.data || [];

        // 🔹 Buscar el perfil que pertenece a este usuario
        const myProfile = profiles.find((p: any) => p.userId === userId);
        if (myProfile) {
          setUserProfileId(myProfile.id);
          setData({
            description: myProfile.description || "",
            phone: myProfile.phone || "",
            address: myProfile.address || "",
            photoUrl: myProfile.photoUrl || "",
          });
        } else {
          console.log("Usuario no tiene perfil creado aún");
          setData({ description: "", phone: "", address: "" });
        }
      } catch (err) {
        console.error("Error al obtener perfiles:", err);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 5000);
    // return () => clearInterval(interval);
  }, []);
  // 🧠 Subida de foto de perfil
  const handlePhotoUpload = async () => {
    if (!photoFile || !userProfileId) return alert("Seleccioná una imagen primero");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const formData = new FormData();
      formData.append("file", photoFile);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile/${userProfileId}/upload-photo`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!uploadRes.ok) throw new Error("Error al subir la foto");
      alert("✅ Foto subida correctamente");

      // Refrescar perfil para mostrar la nueva foto
      const updatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      const updatedProfile = updatedData.data.find((p: any) => p.id === userProfileId);
      if (updatedProfile) setData(updatedProfile);
      setPhotoFile(null);
    } catch (err) {
      console.error(err);
      alert("Error al subir la foto ❌");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data || !userProfileId) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile/${userProfileId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar perfil");
      alert("Perfil de usuario actualizado!");
    } catch (err: any) {
      alert(err.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };
  if (loadingRole) return <div className="loadingContainer">
                        <div className="spinner"></div>
                        <p>Cargando...</p>
                    </div>;

  if (!data) return <div className="loadingContainer">
                        <div className="spinner"></div>
                        <p>Cargando perfil de usuario...</p>
                    </div>;

  return (
    <div className="container">

    <form onSubmit={handleSubmit} className="form">
      <section className="caja">

      <h1>Editar Perfil de Usuario</h1>
      </section>
      {/* --- Imagen de perfil --- */}
        <div className="logo-container">
          {data.photoUrl && (
            <img
              src={data.photoUrl}
              alt="Foto de perfil"
              className="logo-preview"
            />
          )}
          <div className="logo-buttons">
            <button type="button" onClick={() => document.getElementById("photoInput")?.click()}>
              {photoFile ? "Cambiar foto" : "Subir foto"}
            </button>
            {photoFile && (
              <button type="button" onClick={handlePhotoUpload}>Guardar foto</button>
            )}
          </div>
          <input
            type="file"
            id="photoInput"
            style={{ display: "none" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhotoFile(e.target.files?.[0] || null)
            }
          />
        </div>

      <input
        className="input"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        placeholder="Descripción"
      />
      <input
        className="input"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        placeholder="Teléfono"
      />
      <input
        className="input"
        value={data.address}
        onChange={(e) => setData({ ...data, address: e.target.value })}
        placeholder="Dirección"
      />
      <button className="button" type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
    </form>
</div>
  );
}

// --- Página principal de Edit Profile ---
export default function EditProfilePage() {
  const [role, setRole] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);
  // const [foundationId, setFoundationId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  //   if (storedRole === "FOUNDATION") {
  //     const fetchFoundation = async () => {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;

  //       try {
  //         const res = await fetch(
  //           `${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/me/foundation`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const json = await res.json();
  //         if (json.data?.foundation?.id) {
  //           setFoundationId(json.data.foundation.id);
  //         }
  //       } catch (err) {
  //         console.error("Error fetching foundation:", err);
  //       }
  //     };
  //     fetchFoundation();
  //   }
  // }, []);

  if (!role) return <div className="loadingContainer">
                        <div className="spinner"></div>
                        <p>Cargando...</p>
                    </div>;

  // const handleViewPublicProfile = () => {
  //   if (!foundationId) return alert("No se encontró la fundación");
  //   router.push(`/foundation/${foundationId}`);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* {role === "FOUNDATION" && foundationId && (
          <button 
            onClick={handleViewPublicProfile}
            className="view-profile-button"
          >
            Ver mi perfil público
          </button>
        )} */}
      <div className="">
        {role === "FOUNDATION" ?
          <FoundationEditForm />
          :
          <UserProfileEditForm />
        }
      </div>

    </div>
  );
}



