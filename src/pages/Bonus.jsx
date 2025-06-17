import { axios } from "@pipedream/platform";

export default defineComponent({
  props: {
    notion: {
      type: "app",
      app: "notion",
    },
  },
  async run({ steps, $ }) {

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    console.log("Esperando 1 minuto para evitar duplicaciones...");
    await delay(60000);  // 🔥 Disley para evotar duplicados, antes de cualquier otra operación

    // Obtener los datos del contacto
    const full_name = steps.trigger.event.body?.full_name || "Sin nombre";
    const email = steps.trigger.event.body?.email || null;
    const phone = steps.trigger.event.body?.phone || null;
    const tags = steps.trigger.event.body?.tags || "";
    const firstName = steps.trigger.event.body?.user?.firstName || "Sin nombre";
    const lastName = steps.trigger.event.body?.user?.lastName || "";
    const instagram = steps.trigger.event.body?.["Instagram o sitio web de tu negocio. (Si no tenés ningúno de los dos escribí NO TENGO)"] || "No completo";
    const originalDate = new Date(steps.trigger.event.body.calendar.startTime);
    const updatedDate = new Date(originalDate);
    updatedDate.setHours(originalDate.getHours() + 3);

    
    // Mapeo de Closers y sus IDs
    const closers = {
      Tu: "f67663b3-b033-4a66-b119-f3c069666caa",
      Sanchez: "13cd872b-594c-81a2-adbf-0002854c4356",
      Alegre: "87876e86-58f2-4b10-8b0a-67b15c55d59b",
      Gaitan: "13cd872b-594c-81e6-9132-000280ded969",
      Randazzo: "14cd872b-594c-81fd-b1b9-0002cf942368",
      Nicolini: "70be794b-9974-4707-aee8-09789b765757"
    };

    if (lastName === "Herrera") {
      console.log("No se crea nada si el apellido es Herrera.");
      return { message: "No se crea nada porque el apellido es Herrera." };
    }
    if (lastName === "Gallardo") {
      console.log("No se crea nada si el apellido es Gallardo.");
      return { message: "No se crea nada porque el apellido es Gallardo." };
    }
     if (lastName === "Chiapello") {
      console.log("No se crea nada si el apellido es Chiapello.");
      return { message: "No se crea nada porque el apellido es Chiapello." };
    }

      if (steps.trigger.event.body.calendar.calendarName === "Revisión de Avances con Mati") {
      console.log("No se crea nada Revisión de Avances con Mati .");
      return { message: "No se crea nada Revisión de Avances con Mati" };
    }
    

    
    
    // Función para asignar aleatoriamente entre Carlos Tu como Closer y Nicolini como Setter
    const assignRandomCloserOrSetter = () => {
      const options = [
        { id: closers["Tu"], role: "Closer" },
        { id: closers["Nicolini"], role: "Setter" },
      ];
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    };

    // Determinar si el cliente aplica
    const aplicaValue = tags.split(",").map((tag) => tag.trim()).includes("qualified") ? "Aplica" : "No aplica";

    // Inicializar las propiedades para Notion
    let closer = null;
    let setter = null;

 if (aplicaValue === "Aplica") {
  const lastName = steps.trigger.event.body.user?.lastName || "Sin apellido";
  if (closers[lastName]) {
    closer = { id: closers[lastName] };
    setter = undefined;
  } else {
    console.error(`Apellido ${lastName} no tiene un Closer asignado.`);
    closer = { id: closers["Tu"] }; // Asignar Carlos Tu como predeterminado
    setter = undefined;
  }
} else {
  const randomAssignment = assignRandomCloserOrSetter();
  if (randomAssignment) {
    if (randomAssignment.role === "Closer") {
      closer = { id: randomAssignment.id };
      setter = undefined;
    } else {
      setter = { id: randomAssignment.id };
      closer = undefined;
    }
  } else {
    console.error("Error en la asignación aleatoria.");
    closer = { id: closers["Tu"] }; // Predeterminado si falla la aleatoriedad
    setter = undefined;
  }
}





    // IDs de bases de datos
    const database_id = "14e482517a9581458d4bfefbcde4ea03";
    const metrics_id = "14e482517a9581f1ba44c86043cf23a0";
    const interacciones_database_id = "14e482517a9581cbbfa7e9fc3dd61bae";


    // Función para normalizar números de teléfono
const normalizePhoneNumber = (phone) => {
  return phone ? phone.replace(/[\+\-\(\)\s]/g, "") : "";
};

// Normaliza el número de teléfono del trigger
const normalizedPhone = normalizePhoneNumber(phone);
// Buscar dinámicamente la clave que contiene parte del texto de la pregunta
const inversionKey = Object.keys(steps.trigger.event.body).find(key =>
  key.includes("El Método Acelerador de Ganancias ofrece") &&
  key.includes("¿Estás dispuesto a invertir")
);

// Obtener el valor de esa clave, si existe
const textoInversion = inversionKey ? steps.trigger.event.body[inversionKey] : "Sin respuesta";

// Función para buscar cliente por número de teléfono o Instagram
const searchForClient = async () => {
  const maxAttempts = 2; // Limita los intentos
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const searchResponse = await axios($, {
      method: "post",
      url: `https://api.notion.com/v1/databases/${database_id}/query`,
      headers: {
        Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
        "Notion-Version": `2022-06-28`,
        "Content-Type": "application/json",
      },
      data: {
        filter: {
          or: [
            {
              property: "Telefono",
              phone_number: { is_not_empty: true }, // Traer datos con teléfono
            },
          ],
        },
      },
    });

    // Comparación manual: normaliza y revisa si coincide el teléfono o el Instagram
    const client = searchResponse.results.find(result => {
      const notionPhone = result.properties?.Telefono?.phone_number || "";

      // Compara teléfono normalizado y el Instagram
      return (
        normalizePhoneNumber(notionPhone) === normalizedPhone 
      );
    });

    if (client) {
      console.log("Cliente existente encontrado:", client.id);
      return client.id;
    }

    console.log(`Intento ${attempt + 1}: Cliente no encontrado.`);
    if (attempt < maxAttempts - 1) await delay(500); // Reducir el tiempo de espera
  }

  return null; // Cliente no encontrado
};
    
const updateClientFields = async (clientId, newPhone, closerId, setterId) => {
  try {
    const data = {
      properties: {
        ...(newPhone && {
          "Telefono": { phone_number: newPhone },
        }),
        ...(closerId
          ? { "Closer": { people: [{ id: closerId }] } }
          : { "Closer": { people: [] } }),
        ...(setterId
          ? { "Setter": { people: [{ id: setterId }] } }
          : { "Setter": { people: [] } }),
      },
    };

    const response = await axios($, {
      method: "patch",
      url: `https://api.notion.com/v1/pages/${clientId}`,
      headers: {
        Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      data,
    });

    console.log("Campos actualizados correctamente:", response.data);
  } catch (error) {
    console.error("Error al actualizar los campos del cliente:", error);
  }
};




    let client_id = await searchForClient();

if (client_id) {
  console.log("Cliente encontrado. Verificando si requiere actualización de teléfono...");

  const clientDetails = await axios($, {
    method: "get",
    url: `https://api.notion.com/v1/pages/${client_id}`,
    headers: {
      Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
      "Notion-Version": "2022-06-28",
    },
  });

  const existingPhone = clientDetails.data?.properties?.Telefono?.phone_number || null;

if (!existingPhone && phone) {
  console.log("Teléfono no encontrado. Actualizando con nuevo número...");
  await updateClientFields(client_id, phone, closer?.id, setter?.id); // Actualiza el teléfono
} else {
  console.log("El cliente ya tiene un teléfono registrado o no se envió un teléfono nuevo.");
}
}

    // Crear cliente si no existe
     if (!client_id && full_name && phone) {
  try {
    // Determinar el estado de verificación
        const origen = steps.trigger.event.body?.contact_source || ""; // Extrae el origen del evento

    
    
    const clientResponse = await axios($, {
          method: "post",
          url: `https://api.notion.com/v1/pages`,
          headers: {
            Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
            "Notion-Version": `2022-06-28`,
            "Content-Type": "application/json",
          },
          data: {
            parent: { database_id },
            properties: {
              "Nombre": {
                title: [
                  {
                    text: { content: full_name },
                  },
                ],
              },
              "Instagram": { 
              rich_text: [
                {
                  text: { content: instagram },
                },
              ],
            },
              ...(email && { "Mail": { email: email } }),
              ...(phone && { "Telefono": { phone_number: phone } }),
      
           
  ...(closer ? { "Closer": { people: [{ id: closer.id }] } } : { "Closer": { people: [] } }),
    ...(setter ? { "Setter": { people: [{ id: setter.id }] } } : { "Setter": { people: [] } }),
  
            },
          },
        });

        client_id = clientResponse.data?.id;

        if (!client_id) {
          console.log("Esperando para verificar el cliente nuevamente...");
          await delay(500); // Reducir el tiempo de espera
          client_id = await searchForClient();
        }

        if (!client_id) {
          console.error("No se pudo obtener el ID del cliente recién creado después del reintento.");
          return { error: "No se pudo obtener el ID del cliente recién creado después del reintento." };
        }

        console.log("Cliente creado exitosamente:", client_id);
      } catch (error) {
        console.error("Error al crear el cliente:", error);
        return { error: "Error al crear el cliente." };
      }
    } else if (!client_id) {
      console.log("No se tienen suficientes datos para crear un nuevo cliente.");
      return { error: "Faltan datos suficientes para crear un nuevo cliente." };
    }

    // Crear una interacción de agendamiento para este cliente
    try {
      const interactionSearchResponse = await axios($, {
        method: "post",
        url: `https://api.notion.com/v1/databases/${interacciones_database_id}/query`,
        headers: {
          Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
          "Notion-Version": `2022-06-28`,
          "Content-Type": "application/json",
        },
        data: {
          filter: {
            and: [
              { property: "Nombre cliente", relation: { contains: client_id } },
              { property: "Agendamiento", checkbox: { equals: true } },
            ],
          },
        },
      });

      if (interactionSearchResponse.results && interactionSearchResponse.results.length === 0) {
        const interactionResponse = await axios($, {
          method: "post",
          url: `https://api.notion.com/v1/pages`,
          headers: {
            Authorization: `Bearer ${this.notion.$auth.oauth_access_token}`,
            "Notion-Version": `2022-06-28`,
            "Content-Type": "application/json",
          },
          data: {
            parent: { database_id: interacciones_database_id },
            properties: {
              "Interaccion": {
                title: [
                  {
                    text: {
                      content: `Agendamiento de ${full_name || "Sin nombre"}`,
                    },
                  },
                ],
              },
              "Canal": {
                select: {
                  name: "GHL",
                },
              },
              "Tipo contacto": {
                select: {
                  name: "Generado por usuario",
                },
              },
               "Estado interaccion": {
                select: {
                  name: "Finalizada",
                },
              },
              "Nombre cliente": {
                relation: [{ id: client_id }],
              },
              ...(closer ? { "Closer Actual": { people: [{ id: closer.id }] } } : {}),
              ...(setter ? { "Setter": { people: [{ id: setter.id }] } } : {}),
              "Agendamiento": {
                checkbox: true,
              },
           
              ...(aplicaValue === "Aplica" && steps.trigger.event.body?.calendar?.startTime && {
                "Proximo contacto Closer / Setter": {
                date: { start: updatedDate.toISOString() },
                },
              }),
             ...(steps.trigger.event.body?.contact_source
            ? {
                "Origen": {
                  select: {
                    name: steps.trigger.event.body.contact_source,
                  },
                },
              }
            : steps.trigger.event.body?.calendar?.calendarName
            ? {
                "Origen": {
                  select: {
                    name: steps.trigger.event.body.calendar.calendarName,
                  },
                },
              }
            : {}),

              "Respuesta": {
                select: {
                  name: "Respondio",
                },
              },
              "Call?":{
                rich_text: [
          {
            text: {
              content:  steps.trigger.event.body["(5) Un miembro de nuestro equipo se pondrá en contacto con vos por WhatsApp, te comprometés a responder los mensajes? (Si no respondés los mensajes, la llamada se cancelará automaticamente)"] || "Sin información",
            },
          },
        ],

               
              },
              
              "Producto de interes": {
                multi_select: [
                  {
                    name: steps.trigger.event.body?.["Producto de interés"] || "MEG",
                  },
                ],
              },
                    "Sistema Facturacion": {
        rich_text: [
          {
            text: {
              content: steps.trigger.event.body["(3) ¿Contás con sistema de gestión donde visualices tus ventas? (Excel también cuenta)"] || "Sin información",
            },
          },
        ],
      },
      "Modelo de negocio": {
        rich_text: [
          {
            text: {
              content: steps.trigger.event.body["(2) ¿Cuál es tu modelo de negocio? "] || "Sin información",
            },
          },
        ],
      },
      "Observaciones": {
        rich_text: [
          {
            text: {
              content: steps.trigger.event.body["Contame brevemente sobre tu negocio y por qué decidís sumarte a esta llamada"] || "Sin observaciones",
            },
          },
        ],
      },
      "Facturacion promedio": {
        select: {
          name: steps.trigger.event.body["¿Cuál es tu nivel de facturación mensual en dólares?"] || steps.trigger.event.body["¿Cuál es tu nivel de facturación promedio mensual en dólares?"] || "No especificado",
        },
      },
    "Inversion?": {
  rich_text: [
    {
      text: {
        content: steps.trigger.event.body["El Método Acelerador de Ganancias ofrece diferentes niveles de acompañamiento. ¿Estás dispuesto a invertir para profesionalizar tus números e incrementar tu rentabilidad?"] || steps.trigger.event.body["El Método Acelerador de Ganancias ofrece distintos niveles de acompañamiento. ¿Estás dispuesto a invertir para profesionalizar tus números e incrementar tu rentabilidad?"],
      },
    },
  ],
},

              "Aplica?": {
                select: {
                  name: aplicaValue,
                },
              },
            },
          },
        });

        console.log("Interacción creada y relacionada con el cliente:", interactionResponse.data);
      } else {
        console.log("Ya existe una interacción de agendamiento para este cliente.");
      }

      return {
        cliente: "Cliente procesado correctamente.",
      };
    } catch (error) {
      console.error("Error en la creación de interacción:", error);
      return { error: error.message };
    }
  },

  
});
