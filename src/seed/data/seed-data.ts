export const SEED_TIPO_EMPRESAS = [
  {
    tipo: 'Interna',
  },
  {
    tipo: 'Externa',
  },
];

export const SEED_ROLES = [
  {
    rol: 'Administrador',
    tiporol: 'Interna'
  },
  {
    rol: 'Agente',
    tiporol: 'Interna'
  },
  {
    rol: 'Ejecutivo',
    tiporol: 'Externa'
  },
];

export const SEED_SUCURSALES = [
  {
    sucursal: 'La Paz',
  },
  {
    sucursal: 'El Alto',
  },
  {
    sucursal: 'Beni',
  },
  {
    sucursal: 'Cochabamba',
  },
  {
    sucursal: 'Chuquisaca',
  },
  {
    sucursal: 'Oruro',
  },
  {
    sucursal: 'Pando',
  },
  {
    sucursal: 'Potosí',
  },
  {
    sucursal: 'Tarija',
  },
  {
    sucursal: 'Santa Cruz',
  },
];

export let SEED_EMPRESAS = [
  {
    razon_social: 'LA VITALICIA SEGUROS Y REASEGUROS DE VIDA S.A.',
    nit_empresa: '1020687029',
    direccion_empresa: 'CALLE 6 DE AGOSTO NRO. 2860 ZONA/BARRIO: SAN JORGE',
    pagina_web_empresa: 'https://lavitalicia.bo/',
    telefono_empresa: '2 2157800',
    linea_gratuita: '800-10-4142',
    correo_empresa: 'parandia@grupobisa.com',
    celular_empresa: null,
    tipo_empresas_id: 1
  },
];

export const SEED_USUARIOS = [
  {
    ap_paterno: null,
    ap_materno: null,
    ap_casado: null,
    nombres: "Admin VITALICIA",
    numero_carnet: "VITALICIA",
    extesion: "LP",
    correo: "admin@admin.com",
    password: "VITALICIAAdmin1/",
    estado: true,
    celular: "VITALICIA",
    telefono: "VITALICIA",
    nit_usuario: "VITALICIA",
    direccion_usuario: "VITALICIA",
    pagina_web_usuario: "VITALICIA.com.bo",
    rolId: 1,
    sucursalId: 1,
    empresasId: 1
  },
];
