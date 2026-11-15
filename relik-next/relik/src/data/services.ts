// Contenido inicial. FUTURO: mover a las tablas service_categories / services (ver supabase/migrations).
// Todo lo marcado demo:true es de demostración y debe confirmarlo el taller. Los precios son referenciales.
export type Category = { id: string; name: string; shortName: string; title: string; description: string };
export type Service = {
  id: string; categoryId: string; name: string; description: string;
  price: number | null; tasks: string[]; demo?: boolean; featured?: boolean;
};

export const categories: Category[] = [
  { id: "mant", name: "Mantenimiento", shortName: "Mantenimiento", title: "Mantenimiento Preventivo", description: "Conserva el rendimiento y prolonga la vida de tu vehículo." },
  { id: "diag", name: "Diagnóstico electrónico", shortName: "Diagnóstico", title: "Diagnóstico Electrónico", description: "Identificación precisa de fallas con equipos especializados." },
  { id: "motor", name: "Motor", shortName: "Motor", title: "Reparación de Motor", description: "Evaluación, reparación y mantenimiento integral." },
  { id: "caja", name: "Cajas y transmisiones", shortName: "Transmisión", title: "Cajas y Transmisiones", description: "Diagnóstico y reparación de cajas mecánicas y automáticas." },
  { id: "susp", name: "Suspensión y dirección", shortName: "Suspensión y Dirección", title: "Suspensión y Dirección", description: "Seguridad, estabilidad y confort en cada recorrido." },
  { id: "gas", name: "Sistemas de gas GNV/GLP", shortName: "Sistemas de Gas", title: "Sistemas de Gas (GNV/GLP)", description: "Instalación, mantenimiento y certificación de sistemas de gas." },
  { id: "elec", name: "Sistema eléctrico", shortName: "Eléctrico", title: "Sistema Eléctrico", description: "Revisión y reparación de sistemas eléctricos y electrónicos." },
  { id: "fren", name: "Sistema de frenos", shortName: "Frenos", title: "Sistema de Frenos", description: "Mantenimiento y reemplazo de componentes de frenado." },
  { id: "otros", name: "Otros servicios", shortName: "Otros", title: "Otros servicios", description: "Otros servicios automotrices." },
];

export const services: Service[] = [
  { id: "premium", categoryId: "mant", name: "Servicio Premium", price: 700, demo: true,
    description: "Mantenimiento integral que asegura el máximo rendimiento, seguridad y confiabilidad de tu vehículo.",
    tasks: ["Cambio de aceite viscosidad 5w30, 10w30, 20w50", "Cambio de filtro de aceite", "Cambio de arandela de cárter", "Cambio de filtro de aire de motor", "Escaneo con software según la marca", "Rellenado de shampoo limpiaparabrisas", "Rellenado de refrigerante", "Verificación y prueba hidrométrica de líquido de frenos", "Limpieza de discos, pastillas y zapatas de freno", "Y más revisiones según plan Premium"] },
  { id: "mayor", categoryId: "mant", name: "Mantenimiento Mayor", price: 450, demo: true,
    description: "Mantenimiento más completo, inspección de componentes y revisión de los principales sistemas del vehículo.",
    tasks: ["Cambio de aceite y filtros", "Rellenado de fluidos", "Revisión de frenos", "Inspección de suspensión", "Revisión de dirección", "Evaluación electrónica", "Revisión de fugas"] },
  { id: "express", categoryId: "mant", name: "Servicio Express", price: 180, demo: true,
    description: "Atención para mantenimientos y revisiones rápidas, según disponibilidad y evaluación del vehículo.",
    tasks: ["Cambio de aceite y filtros", "Cambio de filtro de aceite", "Cambio de arandelas", "Cambio de filtro de aire", "Escaneo con software de acuerdo a la marca"] },
  { id: "aceite", categoryId: "mant", name: "Cambio de Aceite", price: 120, demo: true,
    description: "Cambio de aceite con su filtro.", tasks: ["Cambio de aceite y filtros", "Cambio de filtro de aceite", "Cambio de arandelas"] },
  { id: "completo", categoryId: "mant", name: "Service Completo", price: 350, demo: true, featured: true,
    description: "Mantenimiento integral con revisión de los principales sistemas de tu vehículo.",
    tasks: ["Cambio de aceite y filtros", "Revisión de frenos", "Inspección de suspensión", "Diagnóstico electrónico", "Revisión de niveles y más"] },
];
