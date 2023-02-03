import { registerEnumType } from '@nestjs/graphql';

// TODO: Implementar enum como GraphQL Enum Type
export enum ValidRoles {
  administrador = 'Aministrador',
  agente = 'Agente',
  ejecutivo = 'Ejecutivo',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
